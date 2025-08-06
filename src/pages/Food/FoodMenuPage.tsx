import { FoodMenu } from '../../components/guest/FoodMenu';
import { Button } from '../../components/ui/button';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
// ShoppingCart 
import { ShoppingCart } from 'lucide-react';
export function FoodMenuPage() {
  const { cartItems, setCartItems, getTotalCartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Restaurant Menu</h2>
        {getTotalCartItems() > 0 && (
          <Button onClick={() => navigate('/food/cart')}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Cart ({getTotalCartItems()})
          </Button>
        )}
      </div>
      <FoodMenu
        cartItems={cartItems}
        onCartUpdate={setCartItems}
      />
    </div>
  );
}