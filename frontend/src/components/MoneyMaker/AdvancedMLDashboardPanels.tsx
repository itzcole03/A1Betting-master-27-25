import React from 'react.ts';
import SafeChart from '@/ui/SafeChart.ts';
import { useShapData } from '@/hooks/useShapData.ts';
import { useSportsNews } from '@/hooks/useSportsNews.ts';
import { ShapValueDisplay } from '@/features/analytics/ShapValueDisplay.ts';

interface ModelPerformanceHistory {
  date: string;
  accuracy: number;
  f1: number;
}

interface AdvancedMLDashboardPanelsProps {
  eventId: string;
  modelId: string;
  modelPerformanceHistory: ModelPerformanceHistory[];
}

export const AdvancedMLDashboardPanels: React.FC<
  AdvancedMLDashboardPanelsProps;
> = ({ eventId, modelId, modelPerformanceHistory }) => {
  // SHAP Feature Importance;
  const {
    features: shapFeatures,
    loading: shapLoading,
    error: shapError,
  } = useShapData({ eventId, modelType: modelId });

  // Model Performance Chart;
  const perfChartData = {
    labels: modelPerformanceHistory.map((d) => d.date),
    datasets: [
      {
        label: "Accuracy",
        data: modelPerformanceHistory.map((d) => d.accuracy),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        yAxisID: "y",
      },
      {
        label: "F1 Score",
        data: modelPerformanceHistory.map((d) => d.f1),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        yAxisID: "y1",
      },
    ],
  };

  // Sports News;
  const { articles, loading: newsLoading, error: newsError } = useSportsNews();

  return (
    <div className="space-y-8" key={778766}>
      {/* Model Performance Over Time */}
      <div className="glass-premium p-4 rounded-xl" key={178448}>
        <h3 className="text-lg font-semibold mb-2" key={82841}>
          Model Performance Over Time;
        </h3>
        <div className="h-64" key={118048}>
          <SafeChart;
            type="line"
            data={perfChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: { mode: "index", intersect: false },
              stacked: false,
              plugins: { legend: { position: "top" } },
              scales: {
                y: {
                  type: "linear",
                  display: true,
                  position: "left",
                  min: 0,
                  max: 1,
                  title: { display: true, text: "Accuracy" },
                },
                y1: {
                  type: "linear",
                  display: true,
                  position: "right",
                  min: 0,
                  max: 1,
                  grid: { drawOnChartArea: false },
                  title: { display: true, text: "F1 Score" },
                },
              },
            }}
            loadingMessage="Loading performance data..."
          / key={735537}>
        </div>
      </div>

      {/* SHAP Feature Importance */}
      <div className="glass-premium p-4 rounded-xl" key={178448}>
        <h3 className="text-lg font-semibold mb-2" key={82841}>
          Feature Importance (SHAP)
        </h3>
        {shapLoading && <div key={241917}>Loading SHAP data...</div>}
        {shapError && <div className="text-error-500" key={561331}>Error: {shapError}</div>}
        {!shapLoading && !shapError && shapFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2" key={178341}>
            {shapFeatures.map((f) => (
              <ShapValueDisplay key={f.feature} feature={f} / key={102277}>
            ))}
          </div>
        )}
      </div>

      {/* Sports News Integration */}
      <div className="glass-premium p-4 rounded-xl" key={178448}>
        <h3 className="text-lg font-semibold mb-2" key={82841}>Latest Sports News</h3>
        {newsLoading && <div key={241917}>Loading news...</div>}
        {newsError && <div className="text-error-500" key={561331}>Error: {newsError}</div>}
        {!newsLoading && !newsError && articles.length > 0 && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700" key={259146}>
            {articles.slice(0, 5).map((article) => (
              <li key={article.id} className="py-2" key={933551}>
                <a;
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                 key={307457}>
                  {article.title}
                </a>
                <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
                  {new Date(article.publishedAt).toLocaleString()}
                </div>
                <div className="text-sm mt-1" key={974749}>{article.summary}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
