import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { 
  Gift, 
  Star,
  Crown, 
  TrendingUp, 
  Calendar, 
  Coins,
  Award,
  Zap,
  CheckCircle,
  Lock,
  Wifi,
  Clock,
  Hotel,
  Leaf as Spa,
  Utensils,
  Car,
  Loader2,
  ChevronRight,
  Sparkles,
  User,
  CreditCard,
  ShoppingBag,
  Coffee
} from 'lucide-react';
import { LoyaltyProgram, LoyaltyBenefit, LoyaltyTransaction } from '../../types/guest.types';
import { guestService } from '../../services/guestService';
import { authService } from '../../services/authService';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';

export function LoyaltyRewards() {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('benefits');

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadLoyaltyData();
  }, []);

  const loadLoyaltyData = async () => {
    if (!currentUser) return;

    try {
      const data = await guestService.getLoyaltyProgram(currentUser.id);
      setLoyaltyData(data);
    } catch (error) {
      console.error('Error loading loyalty data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemPoints = async (points: number, description: string) => {
    if (!currentUser || !loyaltyData) return;

    if (loyaltyData.currentPoints < points) {
      showToast('Insufficient points for this redemption', 'warning');
      return;
    }

    setRedeeming(description);
    try {
      await guestService.redeemPoints(currentUser.id, points, description);
      await loadLoyaltyData(); // Refresh data
      showToast(`Successfully redeemed ${points} points for ${description}!`, 'success');
    } catch (error) {
      console.error('Error redeeming points:', error);
      showToast('Failed to redeem points. Please try again.', 'error');
    } finally {
      setRedeeming(null);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    // In a real app, you would use a toast library here
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return <Award className="h-5 w-5 text-orange-600" />;
      case 'Silver': return <Star className="h-5 w-5 text-gray-400" />;
      case 'Gold': return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'Platinum': return <Zap className="h-5 w-5 text-purple-600" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'Silver': return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 'Platinum': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getTierCardColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'border-orange-200 bg-orange-50';
      case 'Silver': return 'border-gray-200 bg-gray-50';
      case 'Gold': return 'border-yellow-200 bg-yellow-50';
      case 'Platinum': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const calculateProgress = () => {
    if (!loyaltyData || !loyaltyData.nextTierPoints) return 100;
    const currentTierBase = loyaltyData.nextTierPoints - 1000; // Assume 1000 points between tiers
    const progress = ((loyaltyData.currentPoints - currentTierBase) / 1000) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const redemptionOptions = [
    { 
      points: 100, 
      title: 'Free WiFi Upgrade', 
      description: '24-hour premium WiFi access', 
      icon: <Wifi className="h-8 w-8 text-blue-500" />
    },
    { 
      points: 250, 
      title: 'Late Checkout', 
      description: 'Checkout until 2 PM', 
      icon: <Clock className="h-8 w-8 text-green-500" />
    },
    { 
      points: 500, 
      title: 'Room Upgrade', 
      description: 'Subject to availability', 
      icon: <Hotel className="h-8 w-8 text-indigo-500" />
    },
    { 
      points: 750, 
      title: 'Spa Credit', 
      description: '$50 spa service credit', 
      icon: <Spa className="h-8 w-8 text-pink-500" />
    },
    { 
      points: 1000, 
      title: 'Restaurant Credit', 
      description: '$75 dining credit', 
      icon: <Utensils className="h-8 w-8 text-red-500" />
    },
    { 
      points: 1500, 
      title: 'Airport Transfer', 
      description: 'Complimentary airport pickup/drop-off', 
      icon: <Car className="h-8 w-8 text-teal-500" />
    }
  ];

  const earningActivities = [
    { icon: <Hotel className="h-5 w-5" />, title: "Standard Room", points: "10 points/night" },
    { icon: <Hotel className="h-5 w-5" />, title: "Deluxe Room", points: "15 points/night" },
    { icon: <Hotel className="h-5 w-5" />, title: "Suite", points: "25 points/night" },
    { icon: <Hotel className="h-5 w-5" />, title: "Presidential Suite", points: "50 points/night" },
    { icon: <Utensils className="h-5 w-5" />, title: "Restaurant Dining", points: "1 pt/$5" },
    { icon: <Spa className="h-5 w-5" />, title: "Spa Services", points: "2 pts/$5" },
    { icon: <ShoppingBag className="h-5 w-5" />, title: "Gift Shop", points: "1 pt/$5" },
    { icon: <Coffee className="h-5 w-5" />, title: "Room Service", points: "1 pt/$5" },
    { icon: <User className="h-5 w-5" />, title: "Referral Bonus", points: "100 points" },
    { icon: <CreditCard className="h-5 w-5" />, title: "Special Promotions", points: "Varies" }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
        
        {/* Tier Status Card Skeleton */}
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="h-6 w-32 ml-auto" />
                <Skeleton className="h-4 w-24 ml-auto" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        </Card>
        
        {/* Tabs Skeleton */}
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="earn">Earn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (!loyaltyData) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Unable to load loyalty program data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Loyalty Rewards</h2>
          <p className="text-sm text-muted-foreground">
            Earn points and unlock exclusive benefits with every stay
          </p>
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1.5">
          <div className="flex items-center gap-2">
            {getTierIcon(loyaltyData.tier)}
            <span>{loyaltyData.tier} Member</span>
          </div>
        </Badge>
      </div>

      {/* Tier Status Card */}
      <Card className={`overflow-hidden border ${getTierCardColor(loyaltyData.tier)}`}>
        <div className={`${getTierColor(loyaltyData.tier)} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold">{loyaltyData.currentPoints}</h3>
              <p className="opacity-90">Available Points</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-xl font-semibold">
                {getTierIcon(loyaltyData.tier)}
                {loyaltyData.tier}
              </div>
              <p className="opacity-90 text-sm">Member Status</p>
            </div>
          </div>

          {loyaltyData.nextTierPoints && (
            <div className="mt-6">
              <div className="flex justify-between text-sm opacity-90 mb-2">
                <span>Progress to {loyaltyData.nextTier}</span>
                <span>{loyaltyData.nextTierPoints - loyaltyData.currentPoints} points to go</span>
              </div>
              <Progress 
                value={calculateProgress()} 
                className="bg-white/20 h-2" 
                indicatorClassName={`${loyaltyData.tier === 'Bronze' ? 'bg-orange-300' : 
                                   loyaltyData.tier === 'Silver' ? 'bg-gray-300' : 
                                   loyaltyData.tier === 'Gold' ? 'bg-yellow-300' : 'bg-purple-300'}`}
              />
            </div>
          )}
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="redeem" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Redeem
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="earn" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Earn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loyaltyData.benefits.map((benefit) => (
              <Card key={benefit.id} className={benefit.isActive ? '' : 'opacity-70'}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      benefit.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {benefit.isActive ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{benefit.name}</h4>
                        <Badge variant={benefit.isActive ? 'default' : 'secondary'} className="ml-2">
                          {benefit.tier}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redeem" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {redemptionOptions.map((option) => (
              <Card 
                key={option.title} 
                className={`transition-all hover:shadow-md ${
                  loyaltyData.currentPoints < option.points ? 'opacity-70 grayscale' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-muted rounded-full">
                        {option.icon}
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="font-medium text-lg">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-700">{option.points} points</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      disabled={loyaltyData.currentPoints < option.points || redeeming === option.title}
                      onClick={() => handleRedeemPoints(option.points, option.title)}
                      className="w-full mt-2"
                    >
                      {redeeming === option.title ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Redeem Now'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Point Activity</CardTitle>
              <CardDescription>
                Your point balance: <span className="font-medium">{loyaltyData.currentPoints} points</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loyaltyData.transactions.length > 0 ? (
                <div className="space-y-4">
                  {loyaltyData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'Earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'Earned' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <Gift className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          transaction.type === 'Earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'Earned' ? '+' : '-'}{transaction.points}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No transaction history</h3>
                  <p className="text-muted-foreground mb-4">
                    Start earning points by booking stays and using hotel services!
                  </p>
                  <Button onClick={() => setActiveTab('earn')}>
                    Ways to Earn Points
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earn" className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Double Points Weekend!</AlertTitle>
            <AlertDescription className="text-blue-700">
              Earn double points on all bookings this weekend. Valid for stays between Friday and Sunday.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5" />
                  Booking Points
                </CardTitle>
                <CardDescription>
                  Earn points for every night you stay with us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningActivities.slice(0, 4).map((activity, index) => (
                    <React.Fragment key={activity.title}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            {activity.icon}
                          </div>
                          <span>{activity.title}</span>
                        </div>
                        <span className="font-medium">{activity.points}</span>
                      </div>
                      {index < 3 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Service Points
                </CardTitle>
                <CardDescription>
                  Earn points for using our amenities and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningActivities.slice(4).map((activity, index) => (
                    <React.Fragment key={activity.title}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-full">
                            {activity.icon}
                          </div>
                          <span>{activity.title}</span>
                        </div>
                        <span className="font-medium">{activity.points}</span>
                      </div>
                      {index < earningActivities.slice(4).length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Tier Benefits Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Benefit</th>
                      <th className="text-center pb-2">Bronze</th>
                      <th className="text-center pb-2">Silver</th>
                      <th className="text-center pb-2">Gold</th>
                      <th className="text-center pb-2">Platinum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Welcome Drink', bronze: '✓', silver: '✓', gold: '✓', platinum: '✓' },
                      { name: 'Late Checkout', bronze: '✕', silver: '1 PM', gold: '2 PM', platinum: '4 PM' },
                      { name: 'Room Upgrade', bronze: '✕', silver: '✕', gold: '✓', platinum: 'Priority' },
                      { name: 'Free WiFi', bronze: 'Standard', silver: 'Premium', gold: 'Premium+', platinum: 'Premium+' },
                      { name: 'Points Bonus', bronze: '0%', silver: '10%', gold: '25%', platinum: '50%' },
                    ].map((row) => (
                      <tr key={row.name} className="border-b hover:bg-muted/50">
                        <td className="py-3">{row.name}</td>
                        <td className="text-center py-3">{row.bronze}</td>
                        <td className="text-center py-3">{row.silver}</td>
                        <td className="text-center py-3">{row.gold}</td>
                        <td className="text-center py-3">{row.platinum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}