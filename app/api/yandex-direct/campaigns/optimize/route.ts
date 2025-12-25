import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';
import { CampaignOptimizer } from '@/lib/yandex-direct/optimizer';
import { OptimizationReporter } from '@/lib/yandex-direct/reporter';

export async function POST(request: Request) {
  try {
    const accessToken = process.env.YANDEX_DIRECT_ACCESS_TOKEN;
    const login = process.env.YANDEX_DIRECT_LOGIN;

    if (!accessToken || !login) {
      return NextResponse.json(
        {
          error: 'Yandex Direct credentials not configured',
          required: ['YANDEX_DIRECT_ACCESS_TOKEN', 'YANDEX_DIRECT_LOGIN'],
        },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { campaignIds, days = 7 } = body;

    const client = new YandexDirectClient(accessToken, login);
    const optimizer = new CampaignOptimizer();

    // Получаем все кампании или только указанные
    const allCampaigns = await client.getCampaigns();
    const campaignsToOptimize = campaignIds
      ? allCampaigns.filter((c) => campaignIds.includes(c.Id))
      : allCampaigns.filter((c) => c.State === 'ON' && c.Status === 'ACCEPTED');

    if (campaignsToOptimize.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active campaigns found',
        campaignsAnalyzed: 0,
        optimizations: [],
      });
    }

    console.log(
      `[Yandex Direct Optimizer] Analyzing ${campaignsToOptimize.length} campaigns`
    );

    // Получаем статистику за период
    const dateTo = new Date().toISOString().split('T')[0];
    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const campaignIdsList = campaignsToOptimize.map((c) => c.Id);
    const statsMap = new Map<number, any>();

    try {
      const allStats = await client.getCampaignStats(
        campaignIdsList,
        dateFrom,
        dateTo
      );
      allStats.forEach((stat) => {
        statsMap.set(stat.campaignId, stat);
      });
    } catch (error) {
      console.warn('[Yandex Direct Optimizer] Failed to get stats:', error);
    }

    // Оптимизируем каждую кампанию
    const optimizations = await Promise.all(
      campaignsToOptimize.map(async (campaign) => {
        const stats = statsMap.get(campaign.Id);
        return optimizer.optimizeCampaign(campaign, stats);
      })
    );

    // Логируем результаты
    optimizations.forEach((opt) => {
      console.log(
        `[Yandex Direct Optimizer] Campaign "${opt.campaignName}" (ID: ${opt.campaignId}): Score ${opt.score}/100`
      );
      if (opt.recommendations.length > 0) {
        console.log(
          `[Yandex Direct Optimizer] Recommendations:`,
          opt.recommendations
        );
      }
      if (opt.suggestedChanges.length > 0) {
        console.log(
          `[Yandex Direct Optimizer] Suggested changes:`,
          opt.suggestedChanges
        );
      }
    });

    // Сохраняем отчет
    const reporter = new OptimizationReporter();
    const report = await reporter.saveReport(optimizations, dateFrom, dateTo);

    // Сохраняем результаты в лог
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          reportId: report.id,
          dateFrom,
          dateTo,
          campaignsAnalyzed: campaignsToOptimize.length,
          optimizations: optimizations.map((opt) => ({
            campaignId: opt.campaignId,
            campaignName: opt.campaignName,
            score: opt.score,
            recommendationsCount: opt.recommendations.length,
            changesCount: opt.suggestedChanges.length,
          })),
        },
        null,
        2
      )
    );

    return NextResponse.json({
      success: true,
      reportId: report.id,
      campaignsAnalyzed: campaignsToOptimize.length,
      dateFrom,
      dateTo,
      optimizations,
      summary: report.summary,
    });
  } catch (error) {
    console.error('[Yandex Direct Optimizer] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to optimize campaigns',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

