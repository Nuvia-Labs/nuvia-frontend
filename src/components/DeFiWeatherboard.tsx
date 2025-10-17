'use client';

import { Cloud, Sun, CloudRain, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';

interface YieldForecast {
  protocol: string;
  current_apy: number;
  forecast_7d: number[];
  trend: string;
  weather: string;
  confidence: number;
  slope: number;
}

interface Protocol {
  protocol: string;
  pulse_score: number;
  status: string;
  tvl: number;
  tvl_change_24h: number;
  net_flow: string;
  is_anomaly: boolean;
}

interface DeFiWeatherboardProps {
  forecasts: YieldForecast[];
  protocols: Protocol[];
}

type MarketSeason = 'stable' | 'volatile' | 'recovery' | 'storm';

export function DeFiWeatherboard({ forecasts, protocols }: DeFiWeatherboardProps) {
  // Calculate market sentiment based on trends and pulse scores
  const calculateMarketSeason = (): MarketSeason => {
    if (!forecasts.length || !protocols.length) return 'stable';

    const risingCount = forecasts.filter(f => f.trend.toLowerCase() === 'rising').length;
    const decliningCount = forecasts.filter(f => f.trend.toLowerCase() === 'declining').length;
    const avgConfidence = forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length;
    const avgPulseScore = protocols.reduce((sum, p) => sum + p.pulse_score, 0) / protocols.length;
    const strongProtocols = protocols.filter(p => p.status.toLowerCase() === 'strong').length;
    const positiveFlows = protocols.filter(p => p.tvl_change_24h > 0).length;

    // Stable Season: majority rising + high pulse scores + good confidence
    if (risingCount >= forecasts.length * 0.6 && avgPulseScore > 70 && avgConfidence > 0.7) {
      return 'stable';
    }

    // Recovery Phase: trends turning positive + inflows
    if (risingCount > decliningCount && positiveFlows >= protocols.length * 0.5 && avgPulseScore > 50) {
      return 'recovery';
    }

    // Volatile Storm: many declining + low confidence + anomalies
    if (decliningCount >= forecasts.length * 0.5 || avgConfidence < 0.5 || avgPulseScore < 40) {
      return 'volatile';
    }

    // Default to storm for extreme conditions
    if (avgPulseScore < 30) {
      return 'storm';
    }

    return 'stable';
  };

  const marketSeason = calculateMarketSeason();

  const getSeasonData = (season: MarketSeason) => {
    switch (season) {
      case 'stable':
        return {
          emoji: '☀️',
          title: 'Stable Season',
          description: 'Most protocols showing positive trends with strong liquidity health',
          advice: 'Good time for long-term yield strategies',
          color: 'text-green-600 bg-green-50 border-green-200',
          icon: Sun
        };
      case 'recovery':
        return {
          emoji: '🌈',
          title: 'Recovery Phase',
          description: 'Market showing signs of improvement with increasing inflows',
          advice: 'Consider gradual position building',
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          icon: Cloud
        };
      case 'volatile':
        return {
          emoji: '🌪️',
          title: 'Volatile Storm',
          description: 'High volatility with mixed signals across protocols',
          advice: 'Avoid long-term locks, stay flexible',
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          icon: CloudRain
        };
      case 'storm':
        return {
          emoji: '⛈️',
          title: 'Market Storm',
          description: 'Challenging conditions with low confidence and weak liquidity',
          advice: 'Consider defensive strategies and reduced exposure',
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: Zap
        };
      default:
        return {
          emoji: '🌤️',
          title: 'Mixed Conditions',
          description: 'Varied market conditions across protocols',
          advice: 'Monitor carefully and diversify strategies',
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          icon: Cloud
        };
    }
  };

  const seasonData = getSeasonData(marketSeason);
  const IconComponent = seasonData.icon;

  // Calculate key metrics
  const avgAPY = forecasts.reduce((sum, f) => sum + f.current_apy, 0) / forecasts.length;
  const totalTVL = protocols.reduce((sum, p) => sum + p.tvl, 0);
  const avgPulseScore = protocols.reduce((sum, p) => sum + p.pulse_score, 0) / protocols.length;
  const risingTrends = forecasts.filter(f => f.trend.toLowerCase() === 'rising').length;

  const formatTVL = (tvl: number) => {
    if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(1)}B`;
    if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(1)}M`;
    return `$${(tvl / 1e3).toFixed(1)}K`;
  };

  return (
    <Card className={`border ${seasonData.color} mb-4`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{seasonData.emoji}</span>
              <IconComponent size={20} className={seasonData.color.split(' ')[0]} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {seasonData.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                🌍 DeFi Market Weather
              </p>
            </div>
          </div>
          <Badge variant="outline" className={`${seasonData.color} animate-pulse`}>
            🔴 Live
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 font-medium">
          💡 {seasonData.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100 hover:shadow-md transition-all">
            <div className="text-xs text-gray-500 mb-1 font-semibold">💰 Avg APY</div>
            <div className="text-lg font-bold text-gray-900">
              {avgAPY.toFixed(2)}%
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100 hover:shadow-md transition-all">
            <div className="text-xs text-gray-500 mb-1 font-semibold">🏦 Total TVL</div>
            <div className="text-lg font-bold text-gray-900">
              {formatTVL(totalTVL)}
            </div>
          </div>
        </div>

        {/* Market Indicators */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-100 hover:shadow-md transition-all">
            <div className="text-xs text-gray-500 mb-1 font-semibold">❤️ Health Score</div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold text-gray-900">
                {avgPulseScore.toFixed(0)}
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    avgPulseScore > 70 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                    avgPulseScore > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${avgPulseScore}%` }}
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-3 border border-indigo-100 hover:shadow-md transition-all">
            <div className="text-xs text-gray-500 mb-1 font-semibold">📈 Rising Trends</div>
            <div className="text-sm font-bold text-gray-900 flex items-center">
              {risingTrends}/{forecasts.length}
              {risingTrends > forecasts.length / 2 && <span className="ml-1 text-green-500">🚀</span>}
            </div>
          </div>
        </div>

        {/* Strategy Advice */}
        <div className={`rounded-lg p-3 border ${seasonData.color} bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50`}>
          <div className="text-xs font-bold text-gray-700 mb-1 flex items-center">
            🧠 Market Advice 
            <span className="ml-1 text-purple-500">✨</span>
          </div>
          <p className="text-sm text-gray-700 font-medium">
            {seasonData.advice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}