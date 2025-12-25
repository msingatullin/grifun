import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';
import { CampaignOptimizer } from '@/lib/yandex-direct/optimizer';
import { OptimizationReporter } from '@/lib/yandex-direct/reporter';

/**
 * Автоматическая оптимизация кампаний
 * Этот endpoint можно вызывать по расписанию (cron) для регулярной оптимизации
 * 
 * Использование:
 * - POST /api/yandex-direct/auto-optimize - оптимизирует все активные кампании
 * - POST /api/yandex-direct/auto-optimize?days=14 - статистика за 14 дней
 * - POST /api/yandex-direct/auto-optimize?minScore=50 - только кампании с score < 50
 */
export async function POST(request: Request) {
  try {
    // Проверка секретного ключа для безопасности (опционально)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.AUTO_OPTIMIZE_SECRET;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const accessToken = process.env.YANDEX_DIRECT_ACCESS_TOKEN;
    const login = process.env.YANDEX_DIRECT_LOGIN;

    if (!accessToken || !login) {
      return NextResponse.json(
        {
          error: 'Yandex Direct credentials not configured',
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7', 10);
    const minScore = parseInt(searchParams.get('minScore') || '0', 10);

    const client = new YandexDirectClient(accessToken, login);
    const optimizer = new CampaignOptimizer();

    // Получаем активные кампании
    const allCampaigns = await client.getCampaigns();
    const activeCampaigns = allCampaigns.filter(
      (c) => c.State === 'ON' && c.Status === 'ACCEPTED'
    );

    if (activeCampaigns.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active campaigns to optimize',
        campaignsAnalyzed: 0,
      });
    }

    console.log(
      `[Auto Optimize] Starting optimization for ${activeCampaigns.length} campaigns`
    );

    // Получаем статистику
    const dateTo = new Date().toISOString().split('T')[0];
    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const campaignIds = activeCampaigns.map((c) => c.Id);
    const statsMap = new Map<number, any>();

    try {
      const allStats = await client.getCampaignStats(
        campaignIds,
        dateFrom,
        dateTo
      );
      allStats.forEach((stat) => {
        statsMap.set(stat.campaignId, stat);
      });
    } catch (error) {
      console.warn('[Auto Optimize] Failed to get stats:', error);
    }

    // Оптимизируем кампании
    const optimizations = await Promise.all(
      activeCampaigns.map(async (campaign) => {
        const stats = statsMap.get(campaign.Id);
        return optimizer.optimizeCampaign(campaign, stats);
      })
    );

    // Фильтруем по минимальному score (если указан)
    const filteredOptimizations = optimizations.filter(
      (opt) => opt.score < minScore || minScore === 0
    );

    // Логируем результаты
    const summary = {
      total: activeCampaigns.length,
      analyzed: filteredOptimizations.length,
      averageScore: filteredOptimizations.length > 0
        ? filteredOptimizations.reduce((sum, opt) => sum + opt.score, 0) /
          filteredOptimizations.length
        : 0,
      lowScore: filteredOptimizations.filter((opt) => opt.score < 50).length,
      highScore: filteredOptimizations.filter((opt) => opt.score >= 70).length,
    };

    console.log('[Auto Optimize] Summary:', summary);

    filteredOptimizations.forEach((opt) => {
      if (opt.score < 50) {
        console.warn(
          `[Auto Optimize] ⚠️ Low score campaign: "${opt.campaignName}" (${opt.score}/100)`
        );
        console.warn(`[Auto Optimize] Recommendations:`, opt.recommendations);
      }
    });

    // Сохраняем отчет
    const reporter = new OptimizationReporter();
    const report = await reporter.saveReport(filteredOptimizations, dateFrom, dateTo);

    // Сохраняем полный отчет в лог
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          reportId: report.id,
          type: 'auto_optimize',
          period: { dateFrom, dateTo, days },
          summary,
          optimizations: filteredOptimizations.map((opt) => ({
            campaignId: opt.campaignId,
            campaignName: opt.campaignName,
            score: opt.score,
            recommendations: opt.recommendations,
            suggestedChanges: opt.suggestedChanges,
          })),
        },
        null,
        2
      )
    );

    return NextResponse.json({
      success: true,
      reportId: report.id,
      timestamp: new Date().toISOString(),
      summary,
      period: { dateFrom, dateTo, days },
      optimizations: filteredOptimizations,
    });
  } catch (error) {
    console.error('[Auto Optimize] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to auto-optimize campaigns',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

