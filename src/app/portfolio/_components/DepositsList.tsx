"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { DepositItem } from "./types";

interface DepositsListProps {
  deposits: DepositItem[];
}

export const DepositsList = ({ deposits }: DepositsListProps) => {
  return (
    <div className="bg-white rounded-t-3xl pt-6 pb-6 min-h-96">
      <h2 className="text-sm font-medium text-gray-900 mb-4 px-4">My Deposits:</h2>

      <div className="space-y-4 px-4">
        {deposits.map((deposit, index) => (
          <motion.div
            key={deposit.id}
            className="border-b border-gray-100 py-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={deposit.logo}
                    alt={deposit.token}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{deposit.token}</h3>
                  <p className="text-xs text-gray-500">{deposit.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{deposit.amount}</p>
                <p className="text-xs text-gray-500">
                  ${deposit.valueUSD}{" "}
                  <span className="text-green-600">({deposit.gain})</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={deposit.protocolLogo}
                    alt={deposit.protocol}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    {deposit.amount} {deposit.token}
                  </p>
                  <p className="text-xs text-gray-500">{deposit.protocol} vault</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
