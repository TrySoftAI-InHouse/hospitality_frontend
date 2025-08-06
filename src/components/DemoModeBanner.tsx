// src/components/DemoModeBanner.tsx
import { Alert, AlertDescription } from './ui/alert';
import { Info } from 'lucide-react';

export function DemoModeBanner() {
  return (
    <Alert variant="default" className="bg-yellow-50 border-yellow-200">
      <Info className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        You are currently in demo mode. All data is simulated and changes won't be persisted.
      </AlertDescription>
    </Alert>
  );
}