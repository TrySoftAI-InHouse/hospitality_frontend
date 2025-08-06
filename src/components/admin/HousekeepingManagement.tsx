'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  Settings,
  Package,
  Wrench,
  Star,
  Filter,
  PlayCircle,
  PauseCircle
} from 'lucide-react'

interface HousekeepingTask {
  id: string
  roomNumber: string
  taskType: 'cleaning' | 'maintenance' | 'inspection' | 'deep-clean'
  assignedTo: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimatedDuration: number // in minutes
  actualDuration?: number
  startTime?: Date
  completedTime?: Date
  notes?: string
  checklist: ChecklistItem[]
  issues: Issue[]
}

interface ChecklistItem {
  id: string
  description: string
  completed: boolean
  required: boolean
}

interface Issue {
  id: string
  description: string
  type: 'maintenance' | 'cleanliness' | 'inventory' | 'guest-request'
  severity: 'low' | 'medium' | 'high' | 'critical'
  reportedBy: string
  reportedAt: Date
  status: 'open' | 'in-progress' | 'resolved'
  assignedTo?: string
  resolution?: string
}

interface InventoryItem {
  id: string
  name: string
  category: 'cleaning-supplies' | 'amenities' | 'linens' | 'equipment'
  currentStock: number
  minStock: number
  unit: string
  cost: number
  supplier: string
  lastRestocked: Date
}

const mockTasks: HousekeepingTask[] = [
  {
    id: 'HK001',
    roomNumber: '205',
    taskType: 'cleaning',
    assignedTo: 'Maria Housekeeping',
    status: 'completed',
    priority: 'medium',
    estimatedDuration: 45,
    actualDuration: 42,
    startTime: new Date('2024-01-15 09:00'),
    completedTime: new Date('2024-01-15 09:42'),
    checklist: [
      { id: 'C1', description: 'Make bed', completed: true, required: true },
      { id: 'C2', description: 'Clean bathroom', completed: true, required: true },
      { id: 'C3', description: 'Vacuum carpet', completed: true, required: true },
      { id: 'C4', description: 'Restock amenities', completed: true, required: true },
      { id: 'C5', description: 'Check minibar', completed: true, required: false }
    ],
    issues: []
  },
  {
    id: 'HK002',
    roomNumber: '314',
    taskType: 'maintenance',
    assignedTo: 'Tom Maintenance',
    status: 'in-progress',
    priority: 'high',
    estimatedDuration: 90,
    startTime: new Date('2024-01-15 10:30'),
    notes: 'AC unit making strange noise',
    checklist: [
      { id: 'M1', description: 'Check AC unit', completed: true, required: true },
      { id: 'M2', description: 'Replace air filter', completed: false, required: true },
      { id: 'M3', description: 'Test temperature control', completed: false, required: true }
    ],
    issues: [
      {
        id: 'I1',
        description: 'AC unit making noise',
        type: 'maintenance',
        severity: 'high',
        reportedBy: 'Guest',
        reportedAt: new Date('2024-01-15 08:00'),
        status: 'in-progress',
        assignedTo: 'Tom Maintenance'
      }
    ]
  },
  {
    id: 'HK003',
    roomNumber: '108',
    taskType: 'deep-clean',
    assignedTo: 'Anna Housekeeping',
    status: 'pending',
    priority: 'low',
    estimatedDuration: 120,
    checklist: [
      { id: 'D1', description: 'Deep clean carpets', completed: false, required: true },
      { id: 'D2', description: 'Clean windows', completed: false, required: true },
      { id: 'D3', description: 'Sanitize surfaces', completed: false, required: true },
      { id: 'D4', description: 'Check all fixtures', completed: false, required: true }
    ],
    issues: []
  }
]

const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Toilet Paper',
    category: 'amenities',
    currentStock: 45,
    minStock: 20,
    unit: 'rolls',
    cost: 1.25,
    supplier: 'Hotel Supply Co',
    lastRestocked: new Date('2024-01-10')
  },
  {
    id: 'INV002',
    name: 'All-Purpose Cleaner',
    category: 'cleaning-supplies',
    currentStock: 8,
    minStock: 15,
    unit: 'bottles',
    cost: 4.50,
    supplier: 'CleanCorp',
    lastRestocked: new Date('2024-01-08')
  },
  {
    id: 'INV003',
    name: 'Bed Sheets (Queen)',
    category: 'linens',
    currentStock: 25,
    minStock: 10,
    unit: 'sets',
    cost: 35.00,
    supplier: 'Linen Plus',
    lastRestocked: new Date('2024-01-12')
  }
]

export function HousekeepingManagement() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(mockTasks)
  const [inventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [activeTab, setActiveTab] = useState('tasks')
  const [selectedTask, setSelectedTask] = useState<HousekeepingTask | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'cleaning':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'inspection':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'deep-clean':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'cleaning':
        return <ClipboardList className="w-4 h-4" />
      case 'maintenance':
        return <Wrench className="w-4 h-4" />
      case 'inspection':
        return <Search className="w-4 h-4" />
      case 'deep-clean':
        return <Star className="w-4 h-4" />
      default:
        return <ClipboardList className="w-4 h-4" />
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.roomNumber.includes(searchTerm) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesAssignee = filterAssignee === 'all' || task.assignedTo === filterAssignee
    
    return matchesSearch && matchesStatus && matchesAssignee
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    blocked: tasks.filter(t => t.status === 'blocked').length
  }

  const completionRate = (taskStats.completed / taskStats.total) * 100

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock)

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus as any, completedTime: newStatus === 'completed' ? new Date() : undefined }
        : task
    ))
  }

  const toggleChecklistItem = (taskId: string, checklistItemId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            checklist: task.checklist.map(item =>
              item.id === checklistItemId
                ? { ...item, completed: !item.completed }
                : item
            )
          }
        : task
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Housekeeping Management</h1>
          <p className="text-muted-foreground">
            Manage cleaning schedules, maintenance tasks, and inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Package className="w-4 h-4" />
            Inventory
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ClipboardList className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{taskStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">{taskStats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PlayCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{taskStats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{taskStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl">{lowStockItems.length}</div>
            <div className="text-sm text-muted-foreground">Low Stock</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-green-600">{completionRate.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by room number, assignee, or task ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectItem value="Maria Housekeeping">Maria Housekeeping</SelectItem>
                    <SelectItem value="Anna Housekeeping">Anna Housekeeping</SelectItem>
                    <SelectItem value="Tom Maintenance">Tom Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            {getTaskTypeIcon(task.taskType)}
                          </div>
                          <div>
                            <h3 className="flex items-center gap-2">
                              Room {task.roomNumber}
                              <Badge className={getTaskTypeColor(task.taskType)}>
                                {task.taskType}
                              </Badge>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Task ID: {task.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {task.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                              className="gap-2"
                            >
                              <PlayCircle className="w-4 h-4" />
                              Start
                            </Button>
                          )}
                          {task.status === 'in-progress' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateTaskStatus(task.id, 'completed')}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Complete
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Task Details - Room {task.roomNumber}</DialogTitle>
                              </DialogHeader>
                              {selectedTask && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="text-sm text-muted-foreground">Assigned To</div>
                                      <div>{selectedTask.assignedTo}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-muted-foreground">Duration</div>
                                      <div>{selectedTask.estimatedDuration} minutes</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-2">Checklist</div>
                                    <div className="space-y-2">
                                      {selectedTask.checklist.map((item) => (
                                        <div key={item.id} className="flex items-center gap-2">
                                          <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={() => toggleChecklistItem(selectedTask.id, item.id)}
                                            className="w-4 h-4"
                                          />
                                          <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                                            {item.description}
                                          </span>
                                          {item.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {selectedTask.issues.length > 0 && (
                                    <div>
                                      <div className="text-sm text-muted-foreground mb-2">Issues</div>
                                      <div className="space-y-2">
                                        {selectedTask.issues.map((issue) => (
                                          <div key={issue.id} className="bg-muted/50 p-3 rounded">
                                            <div className="flex items-center gap-2">
                                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                                              <span className="text-sm">{issue.description}</span>
                                              <Badge variant="outline" className="text-xs">
                                                {issue.severity}
                                              </Badge>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {selectedTask.notes && (
                                    <div>
                                      <div className="text-sm text-muted-foreground mb-2">Notes</div>
                                      <div className="bg-muted/50 p-3 rounded">
                                        {selectedTask.notes}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {/* Task Info */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Assigned To:</span>
                          </div>
                          <div>{task.assignedTo}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Duration:</span>
                          </div>
                          <div>{task.estimatedDuration} minutes</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Progress:</span>
                          </div>
                          <div>
                            {task.checklist.filter(item => item.completed).length} / {task.checklist.length} items
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Issues:</span>
                          </div>
                          <div>{task.issues.length}</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {Math.round((task.checklist.filter(item => item.completed).length / task.checklist.length) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(task.checklist.filter(item => item.completed).length / task.checklist.length) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <Card key={item.id} className={item.currentStock <= item.minStock ? 'border-red-200' : ''}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>{item.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Stock:</span>
                        <span className={item.currentStock <= item.minStock ? 'text-red-600' : ''}>
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Min Stock:</span>
                        <span>{item.minStock} {item.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost:</span>
                        <span>${item.cost}</span>
                      </div>
                    </div>

                    {item.currentStock <= item.minStock && (
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <div className="flex items-center gap-2 text-red-800 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          Low Stock Alert
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Reorder
                      </Button>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <p>Issue tracking and resolution system would be implemented here</p>
                <p className="text-sm">Features: Issue reporting, assignment, resolution tracking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Housekeeping Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <ClipboardList className="w-12 h-12 mx-auto mb-4" />
                <p>Housekeeping analytics and reporting would be implemented here</p>
                <p className="text-sm">Features: Performance metrics, efficiency reports, cost analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}