import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';

interface CreateCampaignRequest {
  name: string;
  type?: 'TEXT_CAMPAIGN' | 'MOBILE_APP_CAMPAIGN' | 'DYNAMIC_TEXT_CAMPAIGN' | 'PERFORMANCE';
  startDate?: string;
  endDate?: string;
  dailyBudget?: number; // в рублях
  biddingStrategy?: 'MANUAL_CPC' | 'WB_MAXIMIZE_CONVERSION_RATE' | 'WB_MAXIMIZE_CONVERSION_COST';
}

export async function POST(request: Request) {
  try {
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

    const body: CreateCampaignRequest = await request.json();
    const { name, type, startDate, endDate, dailyBudget, biddingStrategy } = body;

    if (!name) {
      return NextResponse.json(
        {
          error: 'Campaign name is required',
        },
        { status: 400 }
      );
    }

    const client = new YandexDirectClient(accessToken, login);

    // Формируем данные для создания кампании
    const campaignData: any = {
      Name: name,
      Type: type || 'TEXT_CAMPAIGN',
    };

    if (startDate) {
      campaignData.StartDate = startDate;
    }

    if (endDate) {
      campaignData.EndDate = endDate;
    }

    if (dailyBudget) {
      const amountInKopecks = Math.round(dailyBudget * 100);
      if (amountInKopecks < 300) {
        return NextResponse.json(
          {
            error: 'Daily budget must be at least 3 rubles (300 kopecks)',
          },
          { status: 400 }
        );
      }
      if (amountInKopecks > 1000000000) {
        return NextResponse.json(
          {
            error: 'Daily budget must be at most 10,000,000 rubles',
          },
          { status: 400 }
        );
      }

      campaignData.DailyBudget = {
        Amount: amountInKopecks,
        Mode: 'DISTRIBUTED',
      };
    }

    // BiddingStrategy нельзя установить при создании кампании
    // Его нужно устанавливать отдельно после создания через updateCampaign
    // if (biddingStrategy) {
    //   campaignData.BiddingStrategy = {
    //     Search: {
    //       BiddingStrategyType: biddingStrategy,
    //     },
    //     Network: {
    //       BiddingStrategyType: biddingStrategy,
    //     },
    //   };
    // }

    const campaignId = await client.createCampaign(campaignData);

    // Логируем результат
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          type: 'create_campaign',
          campaignId,
          campaignName: name,
        },
        null,
        2
      )
    );

    return NextResponse.json({
      success: true,
      campaignId,
      message: `Campaign "${name}" created successfully`,
    });
  } catch (error) {
    console.error('[Create Campaign] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create campaign',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

