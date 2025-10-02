'use client';

export default function LearnPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Learn About DeFi Yield
        </h1>
        <p className="text-gray-600">
          Understand how yield farming works and start earning on your crypto assets
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            What is Yield Farming?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Yield farming is a way to earn rewards by lending your cryptocurrency assets to liquidity pools. 
            When you deposit assets, you earn a percentage return (APR) on your investment.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            How Does It Work?
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                1
              </span>
              <p>Deposit your crypto assets into yield farming pools</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                2
              </span>
              <p>Your assets are used to provide liquidity to DeFi protocols</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                3
              </span>
              <p>Earn rewards based on the APR (Annual Percentage Rate)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Why Choose Our Platform?
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">Simple one-click deposits</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">Transparent and competitive APR rates</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">Built for Farcaster users</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">Real-time tracking of your yields</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            ⚠️ Important Notice
          </h2>
          <p className="text-sm text-gray-700">
            This is a demo application for educational purposes. Do not deposit real funds. 
            All transactions are simulated for demonstration only.
          </p>
        </div>
      </div>
    </div>
  );
}