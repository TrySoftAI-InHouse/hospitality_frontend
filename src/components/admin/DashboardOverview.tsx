'use client'

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Bed, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  MessageSquare,
  UtensilsCrossed,
  ClipboardList,
  ChevronRight
} from 'lucide-react';

const todaysMetrics = [
  {
    title: "Today's Revenue",
    value: "$24,580",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Room Occupancy",
    value: "78%",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Bed,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Active Guests",
    value: "156",
    change: "+8",
    changeType: "positive" as const,
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Staff On Duty",
    value: "24/28",
    change: "4 off",
    changeType: "neutral" as const,
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const roomStatus = {
  available: 44,
  occupied: 156,
  maintenance: 8,
  outOfOrder: 2,
  total: 210
};

const recentActivities = [
  {
    id: 1,
    type: "check-in",
    message: "Guest John Smith checked into Room 205",
    time: "2 minutes ago",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: 2,
    type: "maintenance",
    message: "Room 314 reported AC issue",
    time: "5 minutes ago",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    id: 3,
    type: "order",
    message: "Room service order for Room 108",
    time: "8 minutes ago",
    icon: UtensilsCrossed,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: 4,
    type: "housekeeping",
    message: "Housekeeping completed Room 201",
    time: "12 minutes ago",
    icon: ClipboardList,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    id: 5,
    type: "feedback",
    message: "5-star review received from Room 405",
    time: "15 minutes ago",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }
];

const upcomingTasks = [
  {
    id: 1,
    task: "VIP guest arrival - Presidential Suite",
    time: "3:30 PM",
    priority: "high",
    department: "Front Desk"
  },
  {
    id: 2,
    task: "Deep cleaning scheduled for Rooms 301-310",
    time: "4:00 PM",
    priority: "medium",
    department: "Housekeeping"
  },
  {
    id: 3,
    task: "Staff shift change",
    time: "6:00 PM",
    priority: "low",
    department: "HR"
  },
  {
    id: 4,
    task: "Restaurant inventory check",
    time: "7:00 PM",
    priority: "medium",
    department: "Restaurant"
  }
];

export function DashboardOverview() {
  const occupancyPercentage = (roomStatus.occupied / roomStatus.total) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Hotel Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at International Hotel today.
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {todaysMetrics.map((metric) => (
          <motion.div key={metric.title} variants={item}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-semibold">{metric.value}</span>
                      <Badge 
                        variant={metric.changeType === 'positive' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor} ${metric.color}`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-blue-600" />
                <span>Room Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Occupancy Rate</span>
                  <span className="text-sm font-medium">{Math.round(occupancyPercentage)}%</span>
                </div>
                <Progress value={occupancyPercentage} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="text-sm">Available</span>
                  </div>
                  <span className="text-sm font-medium">{roomStatus.available}</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm">Occupied</span>
                  </div>
                  <span className="text-sm font-medium">{roomStatus.occupied}</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    <span className="text-sm">Maintenance</span>
                  </div>
                  <span className="text-sm font-medium">{roomStatus.maintenance}</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-sm">Out of Order</span>
                  </div>
                  <span className="text-sm font-medium">{roomStatus.outOfOrder}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm font-medium">Total Rooms</span>
                  <span className="text-sm font-medium">{roomStatus.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${activity.bgColor} ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>Upcoming Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    whileHover={{ x: 5 }}
                    className="space-y-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium flex-1">{task.task}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ml-2 ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="font-medium">{task.department}</span>
                      <span>{task.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}