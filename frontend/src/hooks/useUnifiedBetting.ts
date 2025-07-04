import { BettingContext, BettingDecision } from '@/core/UnifiedBettingSystem.ts';
import { UnifiedBettingSystem } from '@/core/UnifiedBettingSystem.ts';
import { useState, useEffect, useCallback } from 'react.ts';



interface UseUnifiedBettingOptions {
  playerId?: string;
  metric?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onNewOpportunity?: (decision: BettingDecision) => void;
}

export function useUnifiedBetting({
  playerId,
  metric,
  autoRefresh = true,
  refreshInterval = 30000,
  onNewOpportunity;
}: UseUnifiedBettingOptions = {}) {
  const [decision, setDecision] = useState<BettingDecision | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyze = useCallback(async () => {
    if (!playerId || !metric) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const context: BettingContext = {
        playerId,
        metric,
        timestamp: Date.now(),
        marketState: 'active',
        correlationFactors: []
      };

      setDecision(newDecision);

      if (onNewOpportunity && newDecision.confidence > 0.8) {
        onNewOpportunity(newDecision);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Analysis failed'));
    } finally {
      setIsAnalyzing(false);
    }
  }, [playerId, metric, bettingSystem, onNewOpportunity]);

  useEffect(() => {
    analyze();

    if (autoRefresh && playerId && metric) {

      return () => clearInterval(interval);
    }
  }, [analyze, autoRefresh, playerId, metric, refreshInterval]);

  return {
    decision,
    isAnalyzing,
    error,
    analyze;
  };
} 