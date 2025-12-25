import { NextResponse } from 'next/server';
import { OptimizationReporter } from '@/lib/yandex-direct/reporter';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('id');
    const latest = searchParams.get('latest') === 'true';
    const format = searchParams.get('format') || 'json';

    const reporter = new OptimizationReporter();

    if (reportId) {
      // Получить конкретный отчет
      const report = await reporter.getReport(reportId);
      if (!report) {
        return NextResponse.json(
          { error: 'Report not found' },
          { status: 404 }
        );
      }

      if (format === 'markdown') {
        const markdown = reporter.generateMarkdownReport(report);
        return new NextResponse(markdown, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
          },
        });
      }

      return NextResponse.json(report);
    }

    if (latest) {
      // Получить последний отчет
      const report = await reporter.getLatestReport();
      if (!report) {
        return NextResponse.json(
          { error: 'No reports found' },
          { status: 404 }
        );
      }

      if (format === 'markdown') {
        const markdown = reporter.generateMarkdownReport(report);
        return new NextResponse(markdown, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
          },
        });
      }

      return NextResponse.json(report);
    }

    // Получить все отчеты
    const reports = await reporter.getAllReports();
    return NextResponse.json({
      success: true,
      count: reports.length,
      reports: reports.map((r) => ({
        id: r.id,
        timestamp: r.timestamp,
        dateFrom: r.dateFrom,
        dateTo: r.dateTo,
        campaignsAnalyzed: r.campaignsAnalyzed,
        summary: r.summary,
      })),
    });
  } catch (error) {
    console.error('[Reports API] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get reports',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}






