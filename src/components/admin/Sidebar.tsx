'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { 
  FolderOpen, 
  Plus, 
  Bot, 
  Play, 
  Settings, 
  Code, 
  Database,
  Zap,
  Brain,
  TestTube,
  History,
  Trash2,
  Edit
} from 'lucide-react'

const mockProjects = [
  { id: 1, name: "SMTP Orchestrator", status: "active", agents: 5, lastRun: "2 min ago" },
  { id: 2, name: "Data Pipeline", status: "idle", agents: 3, lastRun: "1 hour ago" },
  { id: 3, name: "ML Training", status: "running", agents: 8, lastRun: "Just now" }
]

const agentTypes = [
  { id: 'planner', name: 'Planner LLM', icon: Brain, description: 'Defines project components and architecture' },
  { id: 'coder', name: 'Coder LLM', icon: Code, description: 'Generates and optimizes code' },
  { id: 'tester', name: 'Tester LLM', icon: TestTube, description: 'Validates and tests functionality' },
  { id: 'validator', name: 'Validator', icon: Database, description: 'Email and data validation' },
  { id: 'orchestrator', name: 'Orchestrator', icon: Settings, description: 'Manages workflow execution' },
  { id: 'monitor', name: 'Monitor', icon: Zap, description: 'Real-time system monitoring' }
]

export function Sidebar() {
  const [activeTab, setActiveTab] = useState('projects')

  const handleDragStart = (e: React.DragEvent, agentType: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(agentType))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <aside className="w-80 bg-white border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Platform
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Visual workflow designer
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 m-4 mb-2">
          <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
          <TabsTrigger value="agents" className="text-xs">Agents</TabsTrigger>
          <TabsTrigger value="simulation" className="text-xs">Simulation</TabsTrigger>
        </TabsList>

        <div className="flex-1 px-4">
          <TabsContent value="projects" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3>Projects</h3>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-3">
                {mockProjects.map((project) => (
                  <Card key={project.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm truncate">{project.name}</h4>
                        <Badge 
                          variant={project.status === 'active' ? 'default' : project.status === 'running' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{project.agents} agents</span>
                        <span>{project.lastRun}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="agents" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3>AI Agents</h3>
              <Badge variant="outline">Drag to Canvas</Badge>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-3">
                {agentTypes.map((agent) => (
                  <Card 
                    key={agent.id} 
                    className="p-3 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                    draggable
                    onDragStart={(e) => handleDragStart(e, agent)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                        <agent.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm truncate">{agent.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="simulation" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3>Simulation</h3>
              <Button size="sm" variant="outline" className="gap-2">
                <Play className="w-4 h-4" />
                Run
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                <Card className="p-3">
                  <h4 className="text-sm mb-2">Environment</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory:</span>
                      <span>2.1 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Agents:</span>
                      <span>12</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-3">
                  <h4 className="text-sm mb-2">Data Sources</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Random Data</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Sin Wave</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Events</span>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </aside>
  )
}