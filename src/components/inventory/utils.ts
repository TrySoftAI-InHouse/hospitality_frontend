// import { InventoryItem } from './types'
import type { InventoryItem } from './types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'low-stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'out-of-stock':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'approved':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'housekeeping':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'food-beverage':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'maintenance':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'amenities':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'office':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getStockLevel = (item: InventoryItem) => {
  return (item.currentStock / item.maxStock) * 100
}

export const calculateInventoryStats = (inventory: InventoryItem[]) => {
  return {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0),
    expiringSoon: inventory.filter(item => {
      if (!item.expiryDate) return false
      const daysUntilExpiry = Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 7 && daysUntilExpiry > 0
    }).length
  }
}