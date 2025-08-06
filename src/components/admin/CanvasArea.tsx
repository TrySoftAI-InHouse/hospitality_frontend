'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { 
  Settings, 
  Play, 
  Pause, 
  Trash2, 
  Link, 
  MoreHorizontal,
  Zap,
  AlertCircle
} from 'lucide-react'

interface DroppedAgent {
  id: string
  type: string
  name: string
  icon: any
  position: { x: number; y: number }
  status: 'idle' | 'running' | 'completed' | 'error'
  connections: string[]
}

export function CanvasArea() {
  const [droppedAgents, setDroppedAgents] = useState<DroppedAgent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    try {
      const agentData = JSON.parse(e.dataTransfer.getData('application/json'))
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newAgent: DroppedAgent = {
        id: `${agentData.id}-${Date.now()}`,
        type: agentData.id,
        name: agentData.name,
        icon: agentData.icon,
        position: { x: Math.max(0, x - 75), y: Math.max(0, y - 40) },
        status: 'idle',
        connections: []
      }

      setDroppedAgents(prev => [...prev, newAgent])
    } catch (error) {
      console.error('Failed to parse dropped data:', error)
    }
  }, [])

  const removeAgent = (agentId: string) => {
    setDroppedAgents(prev => prev.filter(agent => agent.id !== agentId))
    setSelectedAgent(null)
  }

  const runAgent = (agentId: string) => {
    setDroppedAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'running' }
          : agent
      )
    )

    // Simulate completion after 2 seconds
    setTimeout(() => {
      setDroppedAgents(prev => 
        prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, status: 'completed' }
            : agent
        )
      )
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getIconComponent = (iconName: string) => {
    // Simple icon mapping - in a real app you'd have a proper icon registry
    const iconMap: any = {
      Brain: () => <div className="w-4 h-4 bg-purple-500 rounded"></div>,
      Code: () => <div className="w-4 h-4 bg-blue-500 rounded"></div>,
      TestTube: () => <div className="w-4 h-4 bg-green-500 rounded"></div>,
      Database: () => <div className="w-4 h-4 bg-orange-500 rounded"></div>,
      Settings: () => <div className="w-4 h-4 bg-gray-500 rounded"></div>,
      Zap: () => <div className="w-4 h-4 bg-yellow-500 rounded"></div>
    }
    return iconMap[iconName] || (() => <div className="w-4 h-4 bg-gray-500 rounded"></div>)
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-50">
      {/* Canvas Header */}
      <div className="bg-white border-b border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            Workflow Canvas
          </h2>
          <p className="text-sm text-muted-foreground">
            Drag agents from the sidebar to design your AI workflow
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Play className="w-4 h-4" />
            Run All
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className={`
          flex-1 relative p-8 transition-colors
          ${isDragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setSelectedAgent(null)}
      >
        {droppedAgents.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-zinc-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-muted-foreground">Empty Canvas</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Drag AI agents from the sidebar to start building your workflow. 
                  Connect them to create complex automation pipelines.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Render Agents */}
            {droppedAgents.map((agent) => {
              const IconComponent = getIconComponent(agent.icon?.name || 'Settings')
              
              return (
                <div
                  key={agent.id}
                  className={`
                    absolute cursor-pointer transition-all duration-200
                    ${selectedAgent === agent.id ? 'z-20' : 'z-10'}
                  `}
                  style={{ 
                    left: agent.position.x, 
                    top: agent.position.y 
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedAgent(agent.id)
                  }}
                >
                  <Card className={`
                    w-40 hover:shadow-lg transition-shadow
                    ${selectedAgent === agent.id ? 'ring-2 ring-primary' : ''}
                  `}>
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <IconComponent />
                            </div>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40" align="end">
                              <div className="space-y-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="w-full justify-start gap-2"
                                  onClick={() => runAgent(agent.id)}
                                  disabled={agent.status === 'running'}
                                >
                                  <Play className="w-3 h-3" />
                                  Run
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="w-full justify-start gap-2"
                                >
                                  <Settings className="w-3 h-3" />
                                  Configure
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="w-full justify-start gap-2 text-red-600"
                                  onClick={() => removeAgent(agent.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <h4 className="text-sm truncate">{agent.name}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        )}

        {/* Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
    </div>
  )
}