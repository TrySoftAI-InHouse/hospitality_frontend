// src/components/DemoModeBanner.tsx
import { Alert } from './ui/alert';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <Alert className="relative bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg px-3 py-2 shadow-xs">
            <div className="flex flex-row items-center justify-between gap-3 w-full">
              {/* Left side - Icon and text */}
              <div className="flex flex-row items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Info className="h-4 w-4 text-amber-600 shrink-0" />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-amber-50 border-amber-200 text-amber-900">
                    Demo mode uses simulated data
                  </TooltipContent>
                </Tooltip>

                <div className="flex flex-row items-center gap-2">
                  <span className="text-xs font-medium text-amber-900 whitespace-nowrap">
                    DEMO MODE
                  </span>
                  <div className="h-3 w-px bg-amber-200"></div>
                  <span className="text-xs text-amber-800">
                    Changes won't be saved
                  </span>
                </div>
              </div>

              {/* Right side - Dismiss button */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-amber-600 hover:bg-amber-100/50"
                  onClick={() => setIsVisible(false)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </motion.div>
            </div>

            {/* Animated underline */}
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}