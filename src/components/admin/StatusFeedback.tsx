'use client'

import { useEffect } from 'react'
import { Alert, AlertDescription } from '../ui/alert'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Upload, 
  Cog, 
  Loader2,
  FileText,
  Volume2,
  Download
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface StatusFeedbackProps {
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error'
  message: string
}

const statusConfig = {
  idle: {
    icon: Clock,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    progress: 0
  },
  uploading: {
    icon: Upload,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    progress: 25
  },
  processing: {
    icon: Cog,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    progress: 75
  },
  complete: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    progress: 100
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    progress: 0
  }
}

const processingSteps = [
  { id: 'upload', label: 'Parsing PPTX…', icon: Upload },
  { id: 'parse', label: 'Content Parsing', icon: FileText },
  { id: 'ai', label: 'AI Processing', icon: Cog },
  { id: 'audio', label: 'Generating audio…', icon: Volume2 },
  { id: 'finalize', label: 'Finalizing', icon: Download }
]

export function StatusFeedback({ status, message }: StatusFeedbackProps) {
  const config = statusConfig[status]
  const IconComponent = config.icon

  // Show toast notifications for status changes - Updated styling per prompt
  useEffect(() => {
    if (status === 'complete' && message) {
      toast.success(message, {
        className: 'bg-green-50 text-green-600 text-sm border-green-200'
      })
    } else if (status === 'error' && message) {
      toast.error(message, {
        className: 'bg-red-50 text-red-600 text-sm border-red-200'
      })
    }
  }, [status, message])

  // Don't show anything when idle
  if (status === 'idle') {
    return null
  }

  const getCurrentStep = () => {
    switch (status) {
      case 'uploading':
        return 0
      case 'processing':
        return 2
      case 'complete':
        return 4
      case 'error':
        return -1
      default:
        return 0
    }
  }

  const currentStep = getCurrentStep()

  return (
    <section className="space-y-4" role="status" aria-live="polite">
      {/* Main Status Alert - Updated styling per prompt */}
      <Alert className={`${config.borderColor} ${config.bgColor} rounded-xl`}>
        <div className="flex items-center gap-3">
          {status === 'processing' ? (
            <Loader2 className={`h-5 w-5 ${config.color} animate-spin`} />
          ) : (
            <IconComponent className={`h-5 w-5 ${config.color}`} />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <AlertDescription className={`${config.color} text-sm m-0`}>
                {message || 'Processing...'}
              </AlertDescription>
              <Badge 
                variant="secondary" 
                className={`${config.color} bg-transparent border-current text-sm`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            
            {/* Progress Bar */}
            {status !== 'error' && (
              <div className="space-y-2">
                <Progress 
                  value={config.progress} 
                  className="h-2"
                />
                <p className="text-xs text-gray-600">
                  {config.progress}% complete
                </p>
              </div>
            )}
          </div>
        </div>
      </Alert>

      {/* Detailed Processing Steps */}
      {(status === 'processing' || status === 'complete') && (
        <div className="bg-white rounded-xl border p-4 shadow">
          <h3 className="text-sm text-gray-700 mb-4">Processing Steps</h3>
          <div className="space-y-3">
            {processingSteps.map((step, index) => {
              const isActive = index === currentStep
              const isComplete = index < currentStep || status === 'complete'
              const StepIcon = step.icon
              
              return (
                <div
                  key={step.id}
                  className={`
                    flex items-center gap-3 p-2 rounded-xl transition-colors
                    ${isActive ? 'bg-blue-50' : ''}
                    ${isComplete ? 'bg-green-50' : ''}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isComplete 
                      ? 'bg-green-100 text-green-600' 
                      : isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}>
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`
                      text-sm
                      ${isComplete 
                        ? 'text-green-700' 
                        : isActive 
                          ? 'text-blue-700' 
                          : 'text-gray-600'
                      }
                    `}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-xs text-blue-600">In progress...</p>
                    )}
                    {isComplete && (
                      <p className="text-xs text-green-600">Complete</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Error Details - Updated styling per prompt */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="text-sm text-red-700 mb-2">Error Details</h3>
          <p className="text-sm text-red-600 mb-3">{message}</p>
          <div className="text-xs text-red-500">
            <p>• Check that your file format is supported (PPTX or JSON)</p>
            <p>• Ensure file size is under 50MB</p>
            <p>• Verify JSON format if using manual input</p>
            <p>• Try refreshing the page and uploading again</p>
          </div>
        </div>
      )}
    </section>
  )
}