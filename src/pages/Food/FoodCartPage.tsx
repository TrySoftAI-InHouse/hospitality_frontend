import { FoodCart } from '../../components/guest/FoodCart';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export function FoodCartPage() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Order</h2>
        <Button variant="outline" onClick={() => navigate('/food')}>
          Continue Shopping
        </Button>
      </div>
      <FoodCart
        cartItems={cartItems}
        onCartUpdate={setCartItems}
        onOrderSuccess={() => navigate('/food/confirmation')}
        onBack={() => navigate('/food')}
      />
    </div>
  );
}