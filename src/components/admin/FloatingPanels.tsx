'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { 
  Code, 
  Terminal, 
  FileText, 
  X, 
  Minimize2, 
  Maximize2,
  Play,
  Copy,
  Download,
  RefreshCw
} from 'lucide-react'

const mockCode = `# Generated AI Agent Code
from ai_platform import Agent, LLM

class PlannerAgent(Agent):
    def __init__(self):
        self.llm = LLM("gpt-4")
        self.name = "Project Planner"
    
    def execute(self, input_data):
        prompt = f"""
        Analyze the following project requirements:
        {input_data}
        
        Create a modular breakdown with:
        1. Core components
        2. Dependencies 
        3. Implementation order
        """
        return self.llm.generate(prompt)
    
    def validate(self, output):
        return len(output.components) > 0

# Auto-generated on ${new Date().toLocaleString()}
`

const mockLogs = [
  { id: 1, timestamp: '14:32:15', level: 'INFO', message: 'PlannerAgent initialized successfully' },
  { id: 2, timestamp: '14:32:16', level: 'INFO', message: 'Loading project requirements...' },
  { id: 3, timestamp: '14:32:18', level: 'SUCCESS', message: 'Generated 5 core components' },
  { id: 4, timestamp: '14:32:19', level: 'INFO', message: 'CoderAgent started code generation' },
  { id: 5, timestamp: '14:32:22', level: 'WARNING', message: 'API rate limit approaching (78/100)' },
  { id: 6, timestamp: '14:32:25', level: 'INFO', message: 'TesterAgent validating outputs...' },
  { id: 7, timestamp: '14:32:28', level: 'SUCCESS', message: 'All tests passed ✓' }
]

export function FloatingPanels() {
  const [panels, setPanels] = useState({
    code: { visible: true, minimized: false, position: { x: 50, y: 100 } },
    console: { visible: true, minimized: false, position: { x: 400, y: 300 } },
    logs: { visible: true, minimized: false, position: { x: 750, y: 150 } }
  })

  const togglePanel = (panelId: keyof typeof panels) => {
    setPanels(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        visible: !prev[panelId].visible
      }
    }))
  }

  const minimizePanel = (panelId: keyof typeof panels) => {
    setPanels(prev => ({
      ...prev,
      [panelId]: {
        ...prev[panelId],
        minimized: !prev[panelId].minimized
      }
    }))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-600'
      case 'WARNING':
        return 'text-orange-600'
      case 'SUCCESS':
        return 'text-green-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <>
      {/* Panel Toggle Buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant={panels.code.visible ? "default" : "outline"}
          size="sm"
          onClick={() => togglePanel('code')}
          className="gap-2"
        >
          <Code className="w-4 h-4" />
          Code
        </Button>
        <Button
          variant={panels.console.visible ? "default" : "outline"}
          size="sm"
          onClick={() => togglePanel('console')}
          className="gap-2"
        >
          <Terminal className="w-4 h-4" />
          Console
        </Button>
        <Button
          variant={panels.logs.visible ? "default" : "outline"}
          size="sm"
          onClick={() => togglePanel('logs')}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Logs
        </Button>
      </div>

      {/* Code Panel */}
      {panels.code.visible && (
        <Card 
          className="fixed z-40 w-96 shadow-xl"
          style={{ 
            left: panels.code.position.x, 
            top: panels.code.position.y 
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <h3 className="text-sm">Generated Code</h3>
                <Badge variant="secondary" className="text-xs">Python</Badge>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => minimizePanel('code')}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => togglePanel('code')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {!panels.code.minimized && (
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="w-3 h-3" />
                    Run
                  </Button>
                </div>
                <ScrollArea className="h-64 w-full">
                  <pre className="text-xs font-mono p-3 bg-zinc-900 text-zinc-100 rounded overflow-x-auto">
                    <code>{mockCode}</code>
                  </pre>
                </ScrollArea>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Console Panel */}
      {panels.console.visible && (
        <Card 
          className="fixed z-40 w-80 shadow-xl"
          style={{ 
            left: panels.console.position.x, 
            top: panels.console.position.y 
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <h3 className="text-sm">Console</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => minimizePanel('console')}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => togglePanel('console')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {!panels.console.minimized && (
            <CardContent className="pt-0">
              <div className="space-y-2">
                <ScrollArea className="h-48 w-full">
                  <div className="bg-black text-green-400 font-mono text-xs p-3 rounded">
                    <div>AI Platform Console v1.0</div>
                    <div>Type 'help' for available commands</div>
                    <div>&gt; agents list</div>
                    <div className="text-gray-300">  - PlannerAgent: ACTIVE</div>
                    <div className="text-gray-300">  - CoderAgent: IDLE</div>
                    <div className="text-gray-300">  - TesterAgent: ACTIVE</div>
                    <div>&gt; simulation start</div>
                    <div className="text-yellow-400">Starting simulation with 3 agents...</div>
                    <div>&gt; <span className="animate-pulse">_</span></div>
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="w-3 h-3" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Logs Panel */}
      {panels.logs.visible && (
        <Card 
          className="fixed z-40 w-96 shadow-xl"
          style={{ 
            left: panels.logs.position.x, 
            top: panels.logs.position.y 
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <h3 className="text-sm">System Logs</h3>
                <Badge variant="outline" className="text-xs">Real-time</Badge>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => minimizePanel('logs')}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => togglePanel('logs')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {!panels.logs.minimized && (
            <CardContent className="pt-0">
              <ScrollArea className="h-64 w-full">
                <div className="space-y-1 font-mono text-xs">
                  {mockLogs.map((log) => (
                    <div key={log.id} className="flex gap-2 p-1 hover:bg-zinc-50 rounded">
                      <span className="text-gray-500 w-16">{log.timestamp}</span>
                      <span className={`w-16 ${getLevelColor(log.level)}`}>
                        [{log.level}]
                      </span>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}