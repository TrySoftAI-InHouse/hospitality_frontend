'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ScrollArea } from '../ui/scroll-area'
import { 
  Calculator, 
  Plus, 
  Search, 
  DollarSign,
  CreditCard,
  FileText,
  Download,
  Mail,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  PieChart
} from 'lucide-react'

interface Invoice {
  id: string
  guestName: string
  roomNumber: string
  checkIn: Date
  checkOut: Date
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  totalAmount: number
  paidAmount: number
  dueDate: Date
  paymentMethod?: string
  items: InvoiceItem[]
  taxes: TaxItem[]
  discounts: DiscountItem[]
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  category: 'room' | 'food' | 'service' | 'amenity'
}

interface TaxItem {
  name: string
  rate: number
  amount: number
}

interface DiscountItem {
  name: string
  type: 'percentage' | 'fixed'
  value: number
  amount: number
}

interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: 'cash' | 'credit-card' | 'debit-card' | 'bank-transfer' | 'check'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  processedAt: Date
  notes?: string
}

interface FinancialReport {
  period: string
  revenue: number
  expenses: number
  profit: number
  taxes: number
  occupancyRate: number
  averageRate: number
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV001',
    guestName: 'John Smith',
    roomNumber: '205',
    checkIn: new Date('2024-01-15'),
    checkOut: new Date('2024-01-18'),
    status: 'paid',
    totalAmount: 892.50,
    paidAmount: 892.50,
    dueDate: new Date('2024-01-25'),
    paymentMethod: 'credit-card',
    items: [
      {
        id: '1',
        description: 'Room Charge (3 nights)',
        quantity: 3,
        unitPrice: 250.00,
        totalPrice: 750.00,
        category: 'room'
      },
      {
        id: '2',
        description: 'Room Service',
        quantity: 2,
        unitPrice: 45.00,
        totalPrice: 90.00,
        category: 'food'
      },
      {
        id: '3',
        description: 'Spa Service',
        quantity: 1,
        unitPrice: 120.00,
        totalPrice: 120.00,
        category: 'service'
      }
    ],
    taxes: [
      { name: 'Room Tax', rate: 0.08, amount: 60.00 },
      { name: 'Service Tax', rate: 0.05, amount: 32.50 }
    ],
    discounts: [
      { name: 'Loyalty Discount', type: 'percentage', value: 10, amount: 75.00 }
    ]
  },
  {
    id: 'INV002',
    guestName: 'Sarah Johnson',
    roomNumber: '314',
    checkIn: new Date('2024-01-14'),
    checkOut: new Date('2024-01-17'),
    status: 'overdue',
    totalAmount: 675.00,
    paidAmount: 0,
    dueDate: new Date('2024-01-24'),
    items: [
      {
        id: '1',
        description: 'Room Charge (3 nights)',
        quantity: 3,
        unitPrice: 200.00,
        totalPrice: 600.00,
        category: 'room'
      },
      {
        id: '2',
        description: 'Minibar',
        quantity: 1,
        unitPrice: 75.00,
        totalPrice: 75.00,
        category: 'amenity'
      }
    ],
    taxes: [
      { name: 'Room Tax', rate: 0.08, amount: 48.00 },
      { name: 'Service Tax', rate: 0.05, amount: 3.75 }
    ],
    discounts: []
  }
]

const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    invoiceId: 'INV001',
    amount: 892.50,
    method: 'credit-card',
    status: 'completed',
    transactionId: 'TXN123456789',
    processedAt: new Date('2024-01-18'),
    notes: 'Visa ending in 4567'
  },
  {
    id: 'PAY002',
    invoiceId: 'INV002',
    amount: 675.00,
    method: 'bank-transfer',
    status: 'pending',
    processedAt: new Date('2024-01-20'),
    notes: 'Wire transfer initiated'
  }
]

const mockReports: FinancialReport[] = [
  {
    period: 'January 2024',
    revenue: 125000,
    expenses: 85000,
    profit: 40000,
    taxes: 12500,
    occupancyRate: 78,
    averageRate: 225
  },
  {
    period: 'December 2023',
    revenue: 118000,
    expenses: 82000,
    profit: 36000,
    taxes: 11800,
    occupancyRate: 82,
    averageRate: 215
  }
]

export function BillingAccountingManagement() {
  const [invoices] = useState<Invoice[]>(mockInvoices)
  const [payments] = useState<Payment[]>(mockPayments)
  const [reports] = useState<FinancialReport[]>(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('invoices')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit-card':
      case 'debit-card':
        return <CreditCard className="w-4 h-4" />
      case 'cash':
        return <DollarSign className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.guestName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const invoiceStats = {
    total: invoices.length,
    draft: invoices.filter(inv => inv.status === 'draft').length,
    sent: invoices.filter(inv => inv.status === 'sent').length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    totalPaid: invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
  }

  const paymentStats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Billing & Accounting</h1>
          <p className="text-muted-foreground">
            Manage invoices, payments, and financial reporting
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{invoiceStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Invoices</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">{invoiceStats.paid}</div>
            <div className="text-sm text-muted-foreground">Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl">{invoiceStats.overdue}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl">{paymentStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">${(invoiceStats.totalRevenue/1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl">${(invoiceStats.totalPaid/1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">Collected</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by invoice ID or guest name..."
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Invoice List */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="flex items-center gap-3">
                            Invoice {invoice.id}
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {invoice.guestName} • Room {invoice.roomNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl">${invoice.totalAmount.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">
                            Due: {invoice.dueDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Check-in</div>
                          <div>{invoice.checkIn.toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Check-out</div>
                          <div>{invoice.checkOut.toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Paid Amount</div>
                          <div>${invoice.paidAmount.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Balance</div>
                          <div className={invoice.totalAmount - invoice.paidAmount > 0 ? 'text-red-600' : 'text-green-600'}>
                            ${(invoice.totalAmount - invoice.paidAmount).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Items:</div>
                        <div className="space-y-1">
                          {invoice.items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                              <span>{item.description}</span>
                              <span>${item.totalPrice.toFixed(2)}</span>
                            </div>
                          ))}
                          {invoice.items.length > 2 && (
                            <div className="text-sm text-muted-foreground">
                              +{invoice.items.length - 2} more items
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Mail className="w-4 h-4" />
                          Send
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {invoice.status !== 'paid' && (
                          <Button size="sm" className="gap-2">
                            <DollarSign className="w-4 h-4" />
                            Record Payment
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getPaymentMethodIcon(payment.method)}
                        </div>
                        <div>
                          <h4>Payment {payment.id}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getPaymentStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {payment.method.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">${payment.amount.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.processedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <div>Invoice: {payment.invoiceId}</div>
                      {payment.transactionId && <div>Transaction: {payment.transactionId}</div>}
                      {payment.notes && <div>Notes: {payment.notes}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Financial Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    {report.period}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                      <div className="text-2xl text-green-600">${report.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Expenses</div>
                      <div className="text-2xl text-red-600">${report.expenses.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Profit</div>
                      <div className="text-2xl text-blue-600">${report.profit.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Taxes</div>
                      <div className="text-2xl text-orange-600">${report.taxes.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                      <div className="text-lg">{report.occupancyRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Average Rate</div>
                      <div className="text-lg">${report.averageRate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <Calculator className="w-12 h-12 mx-auto mb-4" />
                <p>Billing configuration and settings would be implemented here</p>
                <p className="text-sm">Features: Tax rates, payment methods, invoice templates</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}