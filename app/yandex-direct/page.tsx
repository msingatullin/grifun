'use client';

import { useState, useEffect } from 'react';

interface OptimizationReport {
  id: string;
  timestamp: string;
  dateFrom: string;
  dateTo: string;
  campaignsAnalyzed: number;
  optimizations: Array<{
    campaignId: number;
    campaignName: string;
    score: number;
    summary: string;
    recommendations: string[];
    suggestedChanges: Array<{
      type: string;
      action: string;
      reason: string;
      priority: string;
    }>;
  }>;
  summary: {
    averageScore: number;
    lowScoreCount: number;
    highScoreCount: number;
    totalRecommendations: number;
    totalChanges: number;
  };
}

export default function YandexDirectReports() {
  const [report, setReport] = useState<OptimizationReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<string>('Не настроено');

  useEffect(() => {
    loadLatestReport();
    loadSchedule();
  }, []);

  const loadLatestReport = async () => {
    try {
      const response = await fetch('/api/yandex-direct/reports?latest=true');
      if (response.ok) {
        const data = await response.json();
        setReport(data);
      } else {
        setError('Отчеты не найдены');
      }
    } catch (err) {
      setError('Ошибка загрузки отчета');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSchedule = async () => {
    // Информация о расписании (можно расширить через API)
    setSchedule('Ежедневно в 9:00 (MSK)');
  };

  const runOptimization = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/yandex-direct/campaigns/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: 7 }),
      });

      if (response.ok) {
        const data = await response.json();
        // Перезагружаем отчет
        setTimeout(() => loadLatestReport(), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Ошибка оптимизации');
      }
    } catch (err) {
      setError('Ошибка выполнения оптимизации');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyChange = async (
    campaignId: number,
    changeType: string,
    action: string,
    value?: any
  ) => {
    if (!confirm(`Применить изменение: ${action}?`)) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/yandex-direct/apply-changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          changes: [
            {
              type: changeType,
              action,
              value,
            },
          ],
          confirm: true,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`✅ Изменение применено: ${data.results[0]?.message || 'Успешно'}`);
        // Перезагружаем отчет
        setTimeout(() => loadLatestReport(), 2000);
      } else {
        setError(data.message || 'Ошибка применения изменения');
      }
    } catch (err) {
      setError('Ошибка применения изменения');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 70) return '🟢';
    if (score >= 50) return '🟡';
    return '🔴';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (priority === 'medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            📊 Отчеты по оптимизации Яндекс.Директа
          </h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={runOptimization}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-indigo text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Оптимизация...' : '🔄 Запустить оптимизацию'}
            </button>
            <div className="text-gray-400">
              <strong>Расписание:</strong> {schedule}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {!report ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-4">Отчеты пока отсутствуют</p>
            <p>Запустите оптимизацию, чтобы создать первый отчет</p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="card p-6">
                <div className="text-sm text-gray-400 mb-2">Средний Score</div>
                <div className={`text-3xl font-bold ${getScoreColor(report.summary.averageScore)}`}>
                  {report.summary.averageScore.toFixed(1)}/100
                </div>
              </div>
              <div className="card p-6">
                <div className="text-sm text-gray-400 mb-2">Кампаний проанализировано</div>
                <div className="text-3xl font-bold text-white">
                  {report.campaignsAnalyzed}
                </div>
              </div>
              <div className="card p-6">
                <div className="text-sm text-gray-400 mb-2">Рекомендаций</div>
                <div className="text-3xl font-bold text-white">
                  {report.summary.totalRecommendations}
                </div>
              </div>
              <div className="card p-6">
                <div className="text-sm text-gray-400 mb-2">Предложенных изменений</div>
                <div className="text-3xl font-bold text-white">
                  {report.summary.totalChanges}
                </div>
              </div>
            </div>

            {/* Report Info */}
            <div className="card p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Дата создания</div>
                  <div className="text-white">
                    {new Date(report.timestamp).toLocaleString('ru-RU', {
                      timeZone: 'Europe/Moscow',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Период анализа</div>
                  <div className="text-white">
                    {report.dateFrom} - {report.dateTo}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">ID отчета</div>
                  <div className="text-white font-mono text-xs">{report.id}</div>
                </div>
              </div>
            </div>

            {/* Campaigns */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Детальный анализ кампаний
              </h2>

              {report.optimizations.map((opt) => (
                <div key={opt.campaignId} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {getScoreEmoji(opt.score)} {opt.campaignName}
                      </h3>
                      <div className="text-sm text-gray-400">
                        ID: {opt.campaignId}
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColor(opt.score)}`}>
                      {opt.score}/100
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">🤖 AI Анализ:</div>
                    <div className="text-white">{opt.summary}</div>
                  </div>

                  {opt.recommendations.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">💡 Рекомендации:</div>
                      <ul className="list-disc list-inside space-y-1 text-white">
                        {opt.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {opt.suggestedChanges.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">🔧 Предложенные изменения:</div>
                      <div className="space-y-2">
                        {opt.suggestedChanges.map((change, idx) => {
                          // Извлекаем значение из action для budget
                          let changeValue: any = undefined;
                          if (change.type === 'budget') {
                            const match = change.action.match(/(\d+)\s*руб/);
                            if (match) {
                              changeValue = parseInt(match[1], 10);
                            }
                          }

                          // Типы изменений, которые можно применить автоматически
                          const autoApplicableTypes = ['budget', 'keywords', 'negative', 'ad_text'];
                          const canApply = autoApplicableTypes.includes(change.type) && 
                            (change.type === 'budget' ? changeValue : true);

                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border ${getPriorityColor(change.priority)}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold mb-1">
                                    {change.type.toUpperCase()}: {change.action}
                                  </div>
                                  <div className="text-sm opacity-80 mb-1">
                                    <strong>Почему:</strong> {change.reason}
                                  </div>
                                  <div className="text-xs opacity-60">
                                    Приоритет: {change.priority}
                                  </div>
                                </div>
                                {canApply && (
                                  <button
                                    onClick={() =>
                                      applyChange(opt.campaignId, change.type, change.action, changeValue)
                                    }
                                    disabled={loading}
                                    className="ml-4 px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-semibold hover:bg-accent-indigo transition-colors disabled:opacity-50"
                                  >
                                    Применить
                                  </button>
                                )}
                              </div>
                              {!canApply && (
                                <div className="mt-2 text-xs text-gray-500 italic">
                                  ⚠️ Автоматическое применение для этого типа изменения требует ручной настройки
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

