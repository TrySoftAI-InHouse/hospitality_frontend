export interface InventoryItem {
  id: string
  name: string
  category: 'housekeeping' | 'food-beverage' | 'maintenance' | 'amenities' | 'office'
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: Date
  lastOrderQuantity: number
  location: string
  expiryDate?: Date
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired'
}

export interface PurchaseOrder {
  id: string
  supplier: string
  items: PurchaseOrderItem[]
  orderDate: Date
  expectedDelivery: Date
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  approvedBy?: string
}

export interface PurchaseOrderItem {
  itemId: string
  itemName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Supplier {
  id: string
  name: string
  category: string
  contactPerson: string
  phone: string
  email: string
  address: string
  rating: number
  totalOrders: number
  averageDeliveryTime: number
}