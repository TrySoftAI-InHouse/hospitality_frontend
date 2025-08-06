import { Utensils } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export function FoodOrderConfirmationPage() {
  const { completedOrder, clearCart } = useCart();
  const navigate = useNavigate();

  // Clear cart when this page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Utensils className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-green-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-green-600 mb-4">
          Your food order has been confirmed and is being prepared.
        </p>
        <div className="bg-white rounded-lg p-4 text-left max-w-md mx-auto">
          <p className="font-medium">Order Number:</p>
          <p className="text-lg text-blue-600 font-mono">{completedOrder?.orderNumber}</p>
          <p className="font-medium mt-2">Total Amount:</p>
          <p className="text-lg">${completedOrder?.totalAmount}</p>
          <p className="font-medium mt-2">Estimated Delivery:</p>
          <p>{completedOrder?.estimatedDeliveryTime ? new Date(completedOrder.estimatedDeliveryTime).toLocaleTimeString() : '25-35 minutes'}</p>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate('/food')}>
          Order More Food
        </Button>
      </div>
    </div>
  );
}