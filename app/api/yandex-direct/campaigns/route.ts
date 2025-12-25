import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';

export async function GET() {
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

    const client = new YandexDirectClient(accessToken, login);
    const campaigns = await client.getCampaigns();

    const activeCampaigns = campaigns.filter(
      (c) => c.State === 'ON' && c.Status === 'ACCEPTED'
    );
    const pausedCampaigns = campaigns.filter((c) => c.State === 'OFF');
    const archivedCampaigns = campaigns.filter((c) => c.State === 'ARCHIVED');

    return NextResponse.json({
      success: true,
      campaigns,
      summary: {
        total: campaigns.length,
        active: activeCampaigns.length,
        paused: pausedCampaigns.length,
        archived: archivedCampaigns.length,
      },
    });
  } catch (error) {
    console.error('[Yandex Direct API] Get campaigns error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get campaigns',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}






