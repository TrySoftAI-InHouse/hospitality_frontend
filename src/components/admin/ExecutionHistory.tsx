'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { 
  History, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreHorizontal,
  Eye,
  RotateCcw,
  Download
} from 'lucide-react'

const mockExecutions = [
  {
    id: 1,
    name: "SMTP Validation Pipeline",
    status: "completed",
    startTime: "2024-01-15 14:32:15",
    duration: "2m 34s",
    agents: ["PlannerAgent", "ValidatorAgent", "MonitorAgent"],
    results: { validated: 1247, failed: 23, success_rate: 98.2 }
  },
  {
    id: 2,
    name: "ML Training Workflow",
    status: "running",
    startTime: "2024-01-15 14:45:22",
    duration: "12m 18s",
    agents: ["PlannerAgent", "CoderAgent", "TesterAgent"],
    results: { epoch: 15, accuracy: 89.4, loss: 0.034 }
  },
  {
    id: 3,
    name: "Data Processing",
    status: "failed",
    startTime: "2024-01-15 13:22:08",
    duration: "45s",
    agents: ["CoderAgent", "ValidatorAgent"],
    results: { error: "API rate limit exceeded", processed: 456 }
  },
  {
    id: 4,
    name: "Code Generation",
    status: "completed",
    startTime: "2024-01-15 12:15:33",
    duration: "4m 12s",
    agents: ["PlannerAgent", "CoderAgent", "TesterAgent", "OptimizerAgent"],
    results: { files_generated: 8, tests_passed: 24, coverage: 92 }
  }
]

export function ExecutionHistory() {
  const [selectedExecution, setSelectedExecution] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'running':
        return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'paused':
        return <Pause className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50'
      case 'running':
        return 'border-blue-200 bg-blue-50'
      case 'failed':
        return 'border-red-200 bg-red-50'
      case 'paused':
        return 'border-orange-200 bg-orange-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const renderResults = (results: any) => {
    return Object.entries(results).map(([key, value]) => (
      <div key={key} className="flex justify-between text-xs">
        <span className="capitalize text-muted-foreground">
          {key.replace('_', ' ')}:
        </span>
        <span className="font-medium">{value}</span>
      </div>
    ))
  }

  return (
    <Card className="w-80 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Execution History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {mockExecutions.map((execution) => (
              <Card 
                key={execution.id} 
                className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedExecution === execution.id ? 'ring-2 ring-primary' : ''
                } ${getStatusColor(execution.status)}`}
                onClick={() => setSelectedExecution(
                  selectedExecution === execution.id ? null : execution.id
                )}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <h4 className="text-sm truncate max-w-32">{execution.name}</h4>
                    </div>
                    <Badge 
                      variant={execution.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {execution.status}
                    </Badge>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Started:</span>
                      <span>{execution.startTime.split(' ')[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{execution.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Agents:</span>
                      <span>{execution.agents.length}</span>
                    </div>
                  </div>

                  {/* Agents */}
                  <div className="flex flex-wrap gap-1">
                    {execution.agents.slice(0, 3).map((agent, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {agent.replace('Agent', '')}
                      </Badge>
                    ))}
                    {execution.agents.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{execution.agents.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedExecution === execution.id && (
                    <div className="space-y-3 pt-2 border-t">
                      <div>
                        <h5 className="text-xs text-muted-foreground mb-2">Results:</h5>
                        <div className="space-y-1 bg-white p-2 rounded">
                          {renderResults(execution.results)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        {execution.status === 'completed' && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <RotateCcw className="w-3 h-3" />
                            Rerun
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="w-3 h-3" />
                          Export
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}