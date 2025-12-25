import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';

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
    const { campaignIds, dateFrom, dateTo } = body;

    if (!campaignIds || !Array.isArray(campaignIds) || campaignIds.length === 0) {
      return NextResponse.json(
        { error: 'campaignIds array is required' },
        { status: 400 }
      );
    }

    if (!dateFrom || !dateTo) {
      return NextResponse.json(
        { error: 'dateFrom and dateTo are required (YYYY-MM-DD format)' },
        { status: 400 }
      );
    }

    const client = new YandexDirectClient(accessToken, login);
    const stats = await client.getCampaignStats(campaignIds, dateFrom, dateTo);

    return NextResponse.json({
      success: true,
      stats,
      period: { dateFrom, dateTo },
      campaignsCount: stats.length,
    });
  } catch (error) {
    console.error('[Yandex Direct Stats] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get campaign statistics',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}






