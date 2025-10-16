'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import successAnimation from '../../public/Images/Logo/success-animation.json';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessNotification({ 
  isVisible, 
  onClose, 
  title = 'Success!',
  message = 'Your strategy has been executed successfully.'
}: SuccessNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Lottie
                    animationData={successAnimation}
                    loop={false}
                    className="w-full h-full"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {title}
                </h3>

                <p className="text-gray-600 text-sm mb-6">
                  {message}
                </p>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}