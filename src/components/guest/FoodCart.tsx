import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Minus, Trash2, ShoppingCart, Clock, MapPin } from 'lucide-react';
import { CartItem, FoodOrder } from '../../types/food.types';
import { foodService } from '../../services/foodService';
import { authService } from '../../services/authService';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FoodCartProps {
  cartItems: CartItem[];
  onCartUpdate: (items: CartItem[]) => void;
  onOrderSuccess: (order: FoodOrder) => void;
  onBack: () => void;
}

export function FoodCart({ cartItems, onCartUpdate, onOrderSuccess, onBack }: FoodCartProps) {
  const [orderType, setOrderType] = useState<'RoomService' | 'Restaurant' | 'Takeaway'>('RoomService');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentUser = authService.getCurrentUser();

  const updateCartItem = (index: number, quantity: number) => {
    const updatedCart = [...cartItems];
    if (quantity === 0) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity = quantity;
    }
    onCartUpdate(updatedCart);
  };

  const removeCartItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    onCartUpdate(updatedCart);
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0
    );
    const deliveryFee = orderType === 'RoomService' ? 5 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + deliveryFee + tax;

    return { subtotal, deliveryFee, tax, total };
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      setError('You must be logged in to place an order');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (orderType === 'RoomService' && !deliveryAddress) {
      setError('Please provide a room number for room service');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        guestId: currentUser.id,
        items: cartItems,
        orderType,
        deliveryAddress: orderType === 'RoomService' ? deliveryAddress : undefined,
        specialInstructions: specialInstructions || undefined
      };

      const order = await foodService.createOrder(orderData);
      onOrderSuccess(order);
      onCartUpdate([]); // Clear cart
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-4">
            Add some delicious items from our menu to get started.
          </p>
          <Button onClick={onBack}>
            Browse Menu
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Order ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 border rounded-lg">
              <ImageWithFallback
                src={item.menuItem.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'}
                alt={item.menuItem.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h4 className="font-medium">{item.menuItem.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${item.menuItem.price} each
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartItem(index, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center">{item.quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartItem(index, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCartItem(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orderType">Order Type</Label>
            <Select value={orderType} onValueChange={(value: any) => setOrderType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RoomService">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Room Service (+$5 delivery)
                  </div>
                </SelectItem>
                <SelectItem value="Restaurant">
                  Restaurant Pickup
                </SelectItem>
                <SelectItem value="Takeaway">
                  Takeaway
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {orderType === 'RoomService' && (
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                placeholder="e.g., 201"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any special requests or dietary notes..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            
            {totals.deliveryFee > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery Fee</span>
                <span>${totals.deliveryFee.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>
              <span>${totals.tax.toFixed(2)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery time: 25-35 minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Continue Shopping
        </Button>
        <Button 
          onClick={handlePlaceOrder} 
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Placing Order...' : `Place Order - $${totals.total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
}