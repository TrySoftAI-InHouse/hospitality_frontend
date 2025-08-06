import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Minus, 
  Search, 
  Clock, 
  Leaf, 
  Flame,
  ShoppingCart,
  Filter
} from 'lucide-react';
import { MenuItem, FoodCategory, CartItem } from '../../types/food.types';
import { foodService } from '../../services/foodService';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FoodMenuProps {
  onCartUpdate: (items: CartItem[]) => void;
  cartItems: CartItem[];
}

export function FoodMenu({ onCartUpdate, cartItems }: FoodMenuProps) {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  useEffect(() => {
    loadMenuData();
  }, []);

  useEffect(() => {
    filterMenuItems();
  }, [menuItems, selectedCategory, searchQuery, dietaryFilter]);

  const loadMenuData = async () => {
    try {
      const [categoriesData, itemsData] = await Promise.all([
        foodService.getCategories(),
        foodService.getMenuItems()
      ]);
      setCategories(categoriesData);
      setMenuItems(itemsData);
    } catch (error) {
      console.error('Error loading menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMenuItems = () => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category.id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
      );
    }

    // Filter by dietary preferences
    if (dietaryFilter !== 'all') {
      switch (dietaryFilter) {
        case 'vegetarian':
          filtered = filtered.filter(item => item.isVegetarian);
          break;
        case 'vegan':
          filtered = filtered.filter(item => item.isVegan);
          break;
        case 'gluten-free':
          filtered = filtered.filter(item => item.isGlutenFree);
          break;
      }
    }

    setFilteredItems(filtered);
  };

  const getCartItemQuantity = (menuItem: MenuItem): number => {
    const cartItem = cartItems.find(item => item.menuItem.id === menuItem.id);
    return cartItem?.quantity || 0;
  };

  const updateCartItem = (menuItem: MenuItem, quantity: number) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(item => item.menuItem.id === menuItem.id);

    if (quantity === 0) {
      if (existingItemIndex > -1) {
        updatedCart.splice(existingItemIndex, 1);
      }
    } else {
      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].quantity = quantity;
      } else {
        updatedCart.push({ menuItem, quantity });
      }
    }

    onCartUpdate(updatedCart);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getDietaryBadges = (item: MenuItem) => {
    const badges = [];
    if (item.isVegetarian) badges.push({ label: 'Vegetarian', icon: <Leaf className="h-3 w-3" />, color: 'bg-green-100 text-green-800' });
    if (item.isVegan) badges.push({ label: 'Vegan', icon: <Leaf className="h-3 w-3" />, color: 'bg-green-100 text-green-800' });
    if (item.isGlutenFree) badges.push({ label: 'Gluten Free', icon: null, color: 'bg-blue-100 text-blue-800' });
    if (item.spiceLevel && item.spiceLevel !== 'Mild') {
      badges.push({ label: item.spiceLevel, icon: <Flame className="h-3 w-3" />, color: 'bg-red-100 text-red-800' });
    }
    return badges;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Cart */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          {getTotalCartItems() > 0 && (
            <Button className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({getTotalCartItems()})
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {getTotalCartItems()}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={dietaryFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDietaryFilter('all')}
              >
                All Items
              </Button>
              <Button
                variant={dietaryFilter === 'vegetarian' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDietaryFilter('vegetarian')}
              >
                <Leaf className="h-4 w-4 mr-1" />
                Vegetarian
              </Button>
              <Button
                variant={dietaryFilter === 'vegan' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDietaryFilter('vegan')}
              >
                <Leaf className="h-4 w-4 mr-1" />
                Vegan
              </Button>
              <Button
                variant={dietaryFilter === 'gluten-free' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDietaryFilter('gluten-free')}
              >
                Gluten Free
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.icon} {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={item.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {getDietaryBadges(item).map((badge, index) => (
                        <Badge key={index} className={`text-xs ${badge.color}`}>
                          {badge.icon}
                          {badge.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="text-lg font-bold">${item.price}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.preparationTime} min
                        </span>
                        {item.calories && (
                          <span>{item.calories} cal</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItem(item, Math.max(0, getCartItemQuantity(item) - 1))}
                            disabled={getCartItemQuantity(item) === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="w-8 text-center font-medium">
                            {getCartItemQuantity(item)}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItem(item, getCartItemQuantity(item) + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {getCartItemQuantity(item) === 0 && (
                          <Button
                            size="sm"
                            onClick={() => updateCartItem(item, 1)}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </div>

                      {item.allergens.length > 0 && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            <strong>Allergens:</strong> {item.allergens.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No items found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}