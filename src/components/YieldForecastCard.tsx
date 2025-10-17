'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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

interface YieldForecastCardProps {
  forecast: YieldForecast;
  onSelect: (protocol: string) => void;
}

export function YieldForecastCard({ forecast, onSelect }: YieldForecastCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getWeatherEmoji = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'stable':
        return '☀️';
      case 'volatile':
        return '🌪️';
      case 'moderate':
        return '🌤️';
      case 'storm':
        return '⛈️';
      default:
        return '🌤️';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'rising':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'declining':
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'rising':
        return 'text-green-600';
      case 'declining':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStrategyAction = () => {
    if (forecast.trend.toLowerCase() === 'rising') {
      return {
        action: 'Auto-Deploy Strategy',
        description: `Deploy capital to ${forecast.protocol}`,
        color: 'bg-green-600 hover:bg-green-700'
      };
    } else if (forecast.trend.toLowerCase() === 'declining') {
      return {
        action: 'Rebalance to Safer Pool',
        description: 'Consider moving to stable yield',
        color: 'bg-yellow-600 hover:bg-yellow-700'
      };
    }
    return {
      action: 'Monitor Strategy',
      description: 'Watch for better opportunities',
      color: 'bg-gray-600 hover:bg-gray-700'
    };
  };

  const strategy = getStrategyAction();

  return (
    <Card className="mb-3 border border-gray-100 shadow-sm bg-gradient-to-br from-white via-red-50/30 to-red-100/20 cursor-pointer transition-all duration-200 hover:shadow-md"
          onClick={handleCardClick}>
      <CardContent className="p-3">
        {/* Compact Header */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-semibold text-gray-900">
                  {forecast.protocol}
                </h3>
                <span className="text-lg">{getWeatherEmoji(forecast.weather)}</span>
                {getTrendIcon(forecast.trend)}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getTrendColor(forecast.trend)}`}>
                    {forecast.current_apy.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Compact Info Row */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={`text-xs ${getTrendColor(forecast.trend)}`}>
                  {forecast.trend}
                </Badge>
                <div className="text-xs text-gray-600">
                  Weather: {forecast.weather}
                </div>
              </div>
              
              {/* Confidence Bar */}
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-500">Confidence</div>
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getConfidenceColor(forecast.confidence)} transition-all duration-300`}
                    style={{ width: `${forecast.confidence * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600">
                  {Math.round(forecast.confidence * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* 7-Day Forecast Mini Chart */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">7-Day Forecast</div>
              <div className="flex items-end space-x-1 h-12">
                {forecast.forecast_7d.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-red-300 rounded-t"
                    style={{
                      height: `${Math.max(10, (value / Math.max(...forecast.forecast_7d)) * 100)}%`,
                      opacity: 0.6 + (index * 0.1)
                    }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Range: {Math.min(...forecast.forecast_7d).toFixed(2)}% - {Math.max(...forecast.forecast_7d).toFixed(2)}%
              </div>
            </div>

            {/* Strategy Section */}
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <div className="text-sm font-medium text-gray-700 mb-2">Recommended Strategy</div>
              <div className="text-xs text-gray-600 mb-3">
                {strategy.description}
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(forecast.protocol);
                }}
                className={`w-full h-8 text-xs font-medium text-white ${strategy.color}`}
              >
                {strategy.action}
              </Button>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs text-gray-500">Slope</div>
                <div className={`text-sm font-semibold ${forecast.slope > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {forecast.slope > 0 ? '+' : ''}{forecast.slope.toFixed(3)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Trend</div>
                <div className={`text-sm font-semibold ${getTrendColor(forecast.trend)}`}>
                  {forecast.trend}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Weather</div>
                <div className="text-sm font-semibold text-gray-700">
                  {forecast.weather}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}