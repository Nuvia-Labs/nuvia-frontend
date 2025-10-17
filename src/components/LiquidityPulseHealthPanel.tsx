'use client';

import { AlertTriangle, Activity, Shield, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';

interface Protocol {
  protocol: string;
  pulse_score: number;
  status: string;
  tvl: number;
  tvl_change_24h: number;
  net_flow: string;
  is_anomaly: boolean;
  alert: string | null;
  timestamp: string;
}

interface VaultPulse {
  vault_pulse: number;
  status: string;
  timestamp: string;
}

interface LiquidityPulseHealthPanelProps {
  vaultPulse: VaultPulse;
  protocols: Protocol[];
}

export function LiquidityPulseHealthPanel({ vaultPulse, protocols }: LiquidityPulseHealthPanelProps) {
  const getStatusEmoji = (status: string) => {
    switch (status.toLowerCase()) {
      case 'strong':
        return '💚';
      case 'moderate':
        return '💛';
      case 'weak':
        return '💔';
      case 'critical':
        return '🩸';
      default:
        return '🔶';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'strong':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'weak':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTVL = (tvl: number) => {
    if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(1)}B`;
    if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(1)}M`;
    if (tvl >= 1e3) return `$${(tvl / 1e3).toFixed(1)}K`;
    return `$${tvl.toFixed(0)}`;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-3">
      {/* Global Vault Pulse */}
      <Card className={`border ${getStatusColor(vaultPulse.status)}`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity size={16} className="text-red-600" />
              <h3 className="text-sm font-semibold text-gray-900">System Health</h3>
            </div>
            <Badge variant="outline" className={`text-xs ${getStatusColor(vaultPulse.status)}`}>
              {getStatusEmoji(vaultPulse.status)} {vaultPulse.status} ({vaultPulse.vault_pulse}%)
            </Badge>
          </div>
          
          {vaultPulse.status.toLowerCase() === 'critical' && (
            <div className="mt-2 flex items-center space-x-1 text-xs text-red-600">
              <AlertTriangle size={12} />
              <span>Market conditions require caution</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Protocol Health Cards */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 px-1">Protocol Health</h4>
        {protocols.map((protocol, index) => (
          <Card key={index} className={`border border-gray-100 ${protocol.is_anomaly ? 'ring-1 ring-yellow-300' : ''}`}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {protocol.protocol}
                  </span>
                  <span className="text-sm">
                    {getStatusEmoji(protocol.status)}
                  </span>
                  {protocol.is_anomaly && (
                    <Badge variant="outline" className="text-xs text-yellow-600 bg-yellow-50 border-yellow-200">
                      Anomaly
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    Score: {protocol.pulse_score}
                  </div>
                  <div className={`text-xs ${getStatusColor(protocol.status)}`}>
                    {protocol.status}
                  </div>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-gray-500">TVL</div>
                  <div className="font-semibold text-gray-900">
                    {formatTVL(protocol.tvl)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">24h Change</div>
                  <div className={`font-semibold ${getChangeColor(protocol.tvl_change_24h)}`}>
                    {formatChange(protocol.tvl_change_24h)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Net Flow</div>
                  <div className="font-semibold text-gray-900">
                    {protocol.net_flow}
                  </div>
                </div>
              </div>

              {protocol.alert && (
                <div className="mt-2 flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  <AlertTriangle size={12} />
                  <span>{protocol.alert}</span>
                </div>
              )}

              {protocol.status.toLowerCase() === 'weak' && (
                <div className="mt-2 flex items-center space-x-1 text-xs text-red-600">
                  <TrendingDown size={12} />
                  <span>Consider exit or hold strategy</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}