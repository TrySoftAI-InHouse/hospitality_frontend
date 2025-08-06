// import { InventoryItem , PurchaseOrder, Supplier } from './types'
import type { InventoryItem, PurchaseOrder, Supplier } from './types';

export const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Toilet Paper',
    category: 'housekeeping',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'rolls',
    costPerUnit: 1.25,
    supplier: 'Hotel Supply Co',
    lastRestocked: new Date('2024-01-10'),
    lastOrderQuantity: 50,
    location: 'Storage Room A',
    status: 'in-stock'
  },
  {
    id: 'INV002',
    name: 'All-Purpose Cleaner',
    category: 'housekeeping',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: 'bottles',
    costPerUnit: 4.50,
    supplier: 'CleanCorp',
    lastRestocked: new Date('2024-01-08'),
    lastOrderQuantity: 25,
    location: 'Storage Room A',
    status: 'low-stock'
  },
  {
    id: 'INV003',
    name: 'Fresh Salmon',
    category: 'food-beverage',
    currentStock: 12,
    minStock: 5,
    maxStock: 30,
    unit: 'lbs',
    costPerUnit: 15.99,
    supplier: 'Fresh Fish Supply',
    lastRestocked: new Date('2024-01-14'),
    lastOrderQuantity: 20,
    location: 'Kitchen Freezer',
    expiryDate: new Date('2024-01-20'),
    status: 'in-stock'
  },
  {
    id: 'INV004',
    name: 'LED Light Bulbs',
    category: 'maintenance',
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    unit: 'pieces',
    costPerUnit: 8.99,
    supplier: 'Electrical Supply Inc',
    lastRestocked: new Date('2024-01-05'),
    lastOrderQuantity: 50,
    location: 'Maintenance Room',
    status: 'out-of-stock'
  }
]

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    supplier: 'Hotel Supply Co',
    items: [
      {
        itemId: 'INV001',
        itemName: 'Toilet Paper',
        quantity: 100,
        unitPrice: 1.25,
        totalPrice: 125.00
      }
    ],
    orderDate: new Date('2024-01-12'),
    expectedDelivery: new Date('2024-01-16'),
    status: 'shipped',
    totalAmount: 125.00,
    approvedBy: 'John Manager'
  },
  {
    id: 'PO002',
    supplier: 'CleanCorp',
    items: [
      {
        itemId: 'INV002',
        itemName: 'All-Purpose Cleaner',
        quantity: 30,
        unitPrice: 4.50,
        totalPrice: 135.00
      }
    ],
    orderDate: new Date('2024-01-14'),
    expectedDelivery: new Date('2024-01-18'),
    status: 'pending',
    totalAmount: 135.00
  }
]

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: 'Hotel Supply Co',
    category: 'Housekeeping',
    contactPerson: 'Mike Johnson',
    phone: '+1 (555) 123-4567',
    email: 'orders@hotelsupply.com',
    address: '123 Supply St, Maryland',
    rating: 4.5,
    totalOrders: 156,
    averageDeliveryTime: 3
  },
  {
    id: 'SUP002',
    name: 'CleanCorp',
    category: 'Cleaning Supplies',
    contactPerson: 'Sarah Williams',
    phone: '+1 (555) 234-5678',
    email: 'sales@cleancorp.com',
    address: '456 Clean Ave, Maryland',
    rating: 4.2,
    totalOrders: 89,
    averageDeliveryTime: 2
  }
]