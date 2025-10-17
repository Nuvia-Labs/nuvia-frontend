'use client';

import { useState } from 'react';
import { TrendingUp, Clock, Target, AlertCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';

interface StrategyRecommendation {
  fromProtocol: string;
  toProtocol: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'hourly';
  duration: number;
  expectedGain: number;
  confidenceTier: 'High' | 'Medium' | 'Low';
  reasoning: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface DynamicStrategyCardProps {
  strategy: StrategyRecommendation;
  onSelect: (strategy: StrategyRecommendation) => void;
  onDeselect?: () => void;
  isSelected?: boolean;
}

export function DynamicStrategyCard({ strategy, onSelect, onDeselect, isSelected = false }: DynamicStrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'hourly':
        return <Clock size={14} className="text-blue-500" />;
      case 'daily':
        return <Clock size={14} className="text-green-500" />;
      case 'weekly':
        return <Clock size={14} className="text-purple-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  const getConfidenceColor = (tier: string) => {
    switch (tier) {
      case 'High':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getProtocolLogo = (protocol: string) => {
    switch (protocol.toLowerCase()) {
      case 'aerodrome':
        return '/Images/Logo/aerodrome-logo.svg';
      case 'moonwell':
        return '/Images/Logo/moonwell-logo.png';
      case 'aave':
        return '/Images/Logo/aave-logo.png';
      case 'cbeth':
        return '/Images/Logo/cbeth-logo.png';
      case 'cbbtc':
        return '/Images/Logo/cbbtc-logo.webp';
      case 'usdc':
        return '/Images/Logo/usdc-logo.png';
      case 'ethena':
        return '/Images/Logo/ethena-logo.png';
      case 'etherfi':
        return '/Images/Logo/etherfi-logo.png';
      case 'morpho':
        return '/Images/Logo/morpho-logo.jpeg';
      default:
        return '/Images/Logo/usdc-logo.png'; // fallback to USDC
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      className={`mb-3 border-0 transition-all duration-200 hover:shadow-lg rounded-2xl ${
        isSelected 
          ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg' 
          : 'bg-white hover:shadow-md'
      }`}
    >
      <CardContent className="p-4">
        {/* Main Strategy Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Protocol Icons */}
            <div className="flex items-center space-x-2">
              {/* From Protocol Icon */}
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={getProtocolLogo(strategy.fromProtocol)}
                  alt={strategy.fromProtocol}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              
              {/* To Protocol Icon - overlapping */}
              <div className="relative w-8 h-8 flex-shrink-0 -ml-2">
                <Image
                  src={getProtocolLogo(strategy.toProtocol)}
                  alt={strategy.toProtocol}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              </div>
            </div>
            
            {/* Strategy Description */}
            <div>
              <div className={`text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {strategy.amount} USDC → {strategy.toProtocol} {strategy.frequency}
              </div>
            </div>
          </div>

          {/* Close/Select Button */}
          <div className="flex items-center space-x-2">
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeselect?.();
                }}
                className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Strategy Details Row */}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>Total Amount</div>
            <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {(strategy.amount * strategy.duration * (strategy.frequency === 'daily' ? 1 : strategy.frequency === 'weekly' ? 1/7 : 24)).toFixed(0)} USDC
            </div>
          </div>
          <div>
            <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>No. of days</div>
            <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {strategy.duration}
            </div>
          </div>
        </div>

        {/* Select Button for non-selected cards */}
        {!isSelected && (
          <div className="mt-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(strategy);
              }}
              className="w-full h-10 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Select
            </Button>
          </div>
        )}

      </CardContent>
    </Card>
  );
}