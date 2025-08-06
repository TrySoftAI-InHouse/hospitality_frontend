'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Phone, 
  Mail,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  UserPlus,
  ClipboardList,
  Award,
  DollarSign,
  TrendingUp
} from 'lucide-react'

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: 'manager' | 'receptionist' | 'housekeeping' | 'kitchen' | 'maintenance' | 'security'
  department: string
  status: 'active' | 'on-leave' | 'terminated'
  hireDate: Date
  salary: number
  performance: number
  shift: 'morning' | 'afternoon' | 'night' | 'rotating'
  skills: string[]
  certifications: string[]
  avatar?: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

interface Shift {
  id: string
  employeeId: string
  date: Date
  startTime: string
  endTime: string
  role: string
  status: 'scheduled' | 'completed' | 'missed' | 'sick'
  notes?: string
}

const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Manager',
    email: 'john.manager@hotel.com',
    phone: '+1 (555) 123-4567',
    role: 'manager',
    department: 'Operations',
    status: 'active',
    hireDate: new Date('2022-01-15'),
    salary: 65000,
    performance: 4.8,
    shift: 'morning',
    skills: ['Leadership', 'Customer Service', 'Operations Management'],
    certifications: ['Hotel Management Certificate', 'Food Safety'],
    emergencyContact: {
      name: 'Jane Manager',
      phone: '+1 (555) 123-4568',
      relationship: 'Spouse'
    }
  },
  {
    id: 'EMP002',
    name: 'Sarah Receptionist',
    email: 'sarah.r@hotel.com',
    phone: '+1 (555) 234-5678',
    role: 'receptionist',
    department: 'Front Desk',
    status: 'active',
    hireDate: new Date('2023-03-10'),
    salary: 35000,
    performance: 4.6,
    shift: 'morning',
    skills: ['Customer Service', 'PMS Systems', 'Languages'],
    certifications: ['Customer Service Excellence'],
    emergencyContact: {
      name: 'Mike Johnson',
      phone: '+1 (555) 234-5679',
      relationship: 'Father'
    }
  },
  {
    id: 'EMP003',
    name: 'Maria Housekeeping',
    email: 'maria.h@hotel.com',
    phone: '+1 (555) 345-6789',
    role: 'housekeeping',
    department: 'Housekeeping',
    status: 'active',
    hireDate: new Date('2023-06-01'),
    salary: 32000,
    performance: 4.9,
    shift: 'morning',
    skills: ['Room Cleaning', 'Laundry', 'Inventory Management'],
    certifications: ['Housekeeping Standards', 'Safety Training'],
    emergencyContact: {
      name: 'Carlos Martinez',
      phone: '+1 (555) 345-6790',
      relationship: 'Husband'
    }
  },
  {
    id: 'EMP004',
    name: 'Chef Williams',
    email: 'chef.w@hotel.com',
    phone: '+1 (555) 456-7890',
    role: 'kitchen',
    department: 'Kitchen',
    status: 'active',
    hireDate: new Date('2022-09-20'),
    salary: 45000,
    performance: 4.7,
    shift: 'afternoon',
    skills: ['Culinary Arts', 'Menu Planning', 'Food Safety'],
    certifications: ['Culinary Arts Degree', 'Food Handler Certificate'],
    emergencyContact: {
      name: 'Lisa Williams',
      phone: '+1 (555) 456-7891',
      relationship: 'Sister'
    }
  }
]

const mockShifts: Shift[] = [
  {
    id: 'SH001',
    employeeId: 'EMP001',
    date: new Date('2024-01-15'),
    startTime: '08:00',
    endTime: '17:00',
    role: 'Manager',
    status: 'scheduled'
  },
  {
    id: 'SH002',
    employeeId: 'EMP002',
    date: new Date('2024-01-15'),
    startTime: '07:00',
    endTime: '16:00',
    role: 'Receptionist',
    status: 'completed'
  },
  {
    id: 'SH003',
    employeeId: 'EMP003',
    date: new Date('2024-01-15'),
    startTime: '09:00',
    endTime: '18:00',
    role: 'Housekeeping',
    status: 'completed'
  }
]

export function StaffManagement() {
  const [employees] = useState<Employee[]>(mockEmployees)
  const [shifts] = useState<Shift[]>(mockShifts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('employees')

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'receptionist':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'housekeeping':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'kitchen':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'security':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'terminated':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'afternoon':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'night':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'rotating':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.phone.includes(searchTerm)
    
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const employeeStats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    onLeave: employees.filter(e => e.status === 'on-leave').length,
    avgPerformance: employees.reduce((sum, e) => sum + e.performance, 0) / employees.length,
    totalPayroll: employees.reduce((sum, e) => sum + e.salary, 0)
  }

  const departmentStats = employees.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Staff Management</h1>
          <p className="text-muted-foreground">
            Manage employees, schedules, and performance tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{employeeStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">{employeeStats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl">{employeeStats.onLeave}</div>
            <div className="text-sm text-muted-foreground">On Leave</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{employeeStats.avgPerformance.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avg Performance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">${(employeeStats.totalPayroll / 1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">Total Payroll</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search employees by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Front Desk">Front Desk</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employee List */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className={getRoleColor(employee.role)}>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3>{employee.name}</h3>
                            <Badge className={getRoleColor(employee.role)}>
                              {employee.role}
                            </Badge>
                            <Badge className={getStatusColor(employee.status)}>
                              {employee.status}
                            </Badge>
                            <Badge className={getShiftColor(employee.shift)}>
                              {employee.shift}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Department</div>
                              <div>{employee.department}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Contact</div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  <span className="text-xs">{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span className="text-xs">{employee.phone}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Performance</div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{employee.performance}/5.0</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Salary</div>
                              <div>${employee.salary.toLocaleString()}</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="text-muted-foreground text-sm">Skills:</div>
                              <div className="flex flex-wrap gap-1">
                                {employee.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground text-sm">Certifications:</div>
                              <div className="flex flex-wrap gap-1">
                                {employee.certifications.map((cert, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-green-50">
                                    <Award className="w-3 h-3 mr-1" />
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ClipboardList className="w-4 h-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Scheduling Tab */}
        <TabsContent value="scheduling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p>Schedule management interface would be implemented here</p>
                <p className="text-sm">Features: Drag & drop scheduling, shift swapping, time-off requests</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <p>Performance tracking and analytics would be implemented here</p>
                <p className="text-sm">Features: KPI tracking, performance reviews, goal setting</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <p>Payroll processing and management would be implemented here</p>
                <p className="text-sm">Features: Salary processing, tax calculations, pay stubs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}