import { CampaignOptimization } from './types';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export interface OptimizationReport {
  id: string;
  timestamp: string;
  dateFrom: string;
  dateTo: string;
  campaignsAnalyzed: number;
  optimizations: CampaignOptimization[];
  summary: {
    averageScore: number;
    lowScoreCount: number;
    highScoreCount: number;
    totalRecommendations: number;
    totalChanges: number;
  };
}

export class OptimizationReporter {
  private reportsDir: string;

  constructor() {
    this.reportsDir = path.join(process.cwd(), 'data', 'optimizations');
    this.ensureReportsDir();
  }

  private async ensureReportsDir() {
    if (!existsSync(this.reportsDir)) {
      await mkdir(this.reportsDir, { recursive: true });
    }
  }

  async saveReport(
    optimizations: CampaignOptimization[],
    dateFrom: string,
    dateTo: string
  ): Promise<OptimizationReport> {
    const reportId = `opt_${Date.now()}`;
    const timestamp = new Date().toISOString();

    const summary = {
      averageScore:
        optimizations.length > 0
          ? optimizations.reduce((sum, opt) => sum + opt.score, 0) /
            optimizations.length
          : 0,
      lowScoreCount: optimizations.filter((opt) => opt.score < 50).length,
      highScoreCount: optimizations.filter((opt) => opt.score >= 70).length,
      totalRecommendations: optimizations.reduce(
        (sum, opt) => sum + opt.recommendations.length,
        0
      ),
      totalChanges: optimizations.reduce(
        (sum, opt) => sum + opt.suggestedChanges.length,
        0
      ),
    };

    const report: OptimizationReport = {
      id: reportId,
      timestamp,
      dateFrom,
      dateTo,
      campaignsAnalyzed: optimizations.length,
      optimizations,
      summary,
    };

    const filePath = path.join(this.reportsDir, `${reportId}.json`);
    await writeFile(filePath, JSON.stringify(report, null, 2), 'utf-8');

    // Также сохраняем последний отчет
    const latestPath = path.join(this.reportsDir, 'latest.json');
    await writeFile(latestPath, JSON.stringify(report, null, 2), 'utf-8');

    console.log(`[Reporter] Report saved: ${filePath}`);

    return report;
  }

  async getReport(reportId: string): Promise<OptimizationReport | null> {
    try {
      const filePath = path.join(this.reportsDir, `${reportId}.json`);
      const content = await readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`[Reporter] Failed to read report ${reportId}:`, error);
      return null;
    }
  }

  async getLatestReport(): Promise<OptimizationReport | null> {
    try {
      const filePath = path.join(this.reportsDir, 'latest.json');
      if (!existsSync(filePath)) {
        return null;
      }
      const content = await readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('[Reporter] Failed to read latest report:', error);
      return null;
    }
  }

  async getAllReports(): Promise<OptimizationReport[]> {
    try {
      const { readdir } = await import('fs/promises');
      const files = await readdir(this.reportsDir);
      const reportFiles = files
        .filter((f) => f.endsWith('.json') && f !== 'latest.json')
        .sort()
        .reverse()
        .slice(0, 50); // Последние 50 отчетов

      const reports: OptimizationReport[] = [];
      for (const file of reportFiles) {
        const report = await this.getReport(file.replace('.json', ''));
        if (report) {
          reports.push(report);
        }
      }

      return reports.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('[Reporter] Failed to list reports:', error);
      return [];
    }
  }

  generateMarkdownReport(report: OptimizationReport): string {
    const date = new Date(report.timestamp).toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    });

    let markdown = `# 📊 Отчет об оптимизации кампаний Яндекс.Директа\n\n`;
    markdown += `**Дата создания:** ${date}\n`;
    markdown += `**Период анализа:** ${report.dateFrom} - ${report.dateTo}\n`;
    markdown += `**Кампаний проанализировано:** ${report.campaignsAnalyzed}\n\n`;

    markdown += `## 📈 Сводка\n\n`;
    markdown += `- **Средний score:** ${report.summary.averageScore.toFixed(1)}/100\n`;
    markdown += `- **Кампаний с низким score (<50):** ${report.summary.lowScoreCount}\n`;
    markdown += `- **Кампаний с высоким score (≥70):** ${report.summary.highScoreCount}\n`;
    markdown += `- **Всего рекомендаций:** ${report.summary.totalRecommendations}\n`;
    markdown += `- **Всего предложенных изменений:** ${report.summary.totalChanges}\n\n`;

    markdown += `## 🎯 Детальный анализ кампаний\n\n`;

    for (const opt of report.optimizations) {
      const scoreEmoji =
        opt.score >= 70 ? '🟢' : opt.score >= 50 ? '🟡' : '🔴';

      markdown += `### ${scoreEmoji} ${opt.campaignName} (ID: ${opt.campaignId})\n\n`;
      markdown += `**Оценка эффективности:** ${opt.score}/100\n\n`;
      markdown += `**Анализ AI:** ${opt.summary}\n\n`;

      if (opt.recommendations.length > 0) {
        markdown += `**Рекомендации:**\n`;
        opt.recommendations.forEach((rec, idx) => {
          markdown += `${idx + 1}. ${rec}\n`;
        });
        markdown += `\n`;
      }

      if (opt.suggestedChanges.length > 0) {
        markdown += `**Предложенные изменения:**\n\n`;
        opt.suggestedChanges.forEach((change, idx) => {
          const priorityEmoji =
            change.priority === 'high' ? '🔴' : change.priority === 'medium' ? '🟡' : '🟢';
          markdown += `${idx + 1}. ${priorityEmoji} **${change.type.toUpperCase()}** - ${change.action}\n`;
          markdown += `   *Причина:* ${change.reason}\n`;
          markdown += `   *Приоритет:* ${change.priority}\n\n`;
        });
      }

      markdown += `---\n\n`;
    }

    return markdown;
  }
}

