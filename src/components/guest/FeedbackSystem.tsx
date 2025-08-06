import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { 
  Star, 
  Send, 
  MessageSquare, 
  ThumbsUp, 
  Calendar,
  Filter,
  Search,
  Camera,
  Loader2,
  User,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { Feedback, FeedbackCategory } from '../../types/guest.types';
import { guestService } from '../../services/guestService';
import { authService } from '../../services/authService';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Progress } from '../ui/progress';

export function FeedbackSystem() {
  const [feedbackCategories, setFeedbackCategories] = useState<FeedbackCategory[]>([]);
  const [myFeedback, setMyFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Form state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadFeedbackData();
  }, []);

  const loadFeedbackData = async () => {
    if (!currentUser) return;

    try {
      const [categoriesData, feedbackData] = await Promise.all([
        guestService.getFeedbackCategories(),
        guestService.getGuestFeedback(currentUser.id)
      ]);
      
      setFeedbackCategories(categoriesData);
      setMyFeedback(feedbackData);
    } catch (error) {
      console.error('Error loading feedback data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !category || rating === 0 || !comment.trim()) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const selectedCategory = feedbackCategories.find(c => c.id === category);
      if (!selectedCategory) return;

      const feedbackData = {
        guestId: currentUser.id,
        rating,
        category: selectedCategory,
        title,
        comment,
        isAnonymous
      };

      await guestService.submitFeedback(feedbackData);
      
      // Reset form
      setRating(0);
      setCategory('');
      setTitle('');
      setComment('');
      setIsAnonymous(false);
      
      // Reload feedback
      await loadFeedbackData();
      
      setActiveTab('history');
      showToast('Thank you for your feedback! We appreciate your input.', 'success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showToast('Failed to submit feedback. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    // In a real app, you would use a toast library here
    alert(`${type.toUpperCase()}: ${message}`);
  };

  const renderStarRating = (currentRating: number, onRate?: (rating: number) => void, onHover?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <TooltipProvider key={starNumber}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Star
                  className={`h-6 w-6 cursor-pointer transition-all ${
                    starNumber <= (hoveredRating || currentRating)
                      ? 'fill-yellow-400 text-yellow-400 hover:scale-110'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                  onClick={() => onRate?.(starNumber)}
                  onMouseEnter={() => onHover?.(starNumber)}
                  onMouseLeave={() => onHover?.(0)}
                />
              </TooltipTrigger>
              <TooltipContent>
                {starNumber === 1 ? 'Poor' : 
                 starNumber === 2 ? 'Fair' : 
                 starNumber === 3 ? 'Good' : 
                 starNumber === 4 ? 'Very Good' : 'Excellent'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Reviewed': return 'default';
      case 'Resolved': return 'outline';
      default: return 'secondary';
    }
  };

  const getEmojiForRating = (rating: number) => {
    if (rating >= 4) return <Smile className="h-4 w-4" />;
    if (rating >= 3) return <Meh className="h-4 w-4" />;
    return <Frown className="h-4 w-4" />;
  };

  const filteredFeedback = myFeedback.filter(feedback => {
    const matchesSearch = feedback.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         feedback.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || feedback.category.id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const feedbackStats = {
    averageRating: myFeedback.length > 0 
      ? (myFeedback.reduce((sum, fb) => sum + fb.rating, 0) / myFeedback.length).toFixed(1)
      : '0.0',
    ratingDistribution: [1, 2, 3, 4, 5].map(star => ({
      star,
      count: myFeedback.filter(fb => fb.rating === star).length,
      percentage: myFeedback.length > 0 
        ? (myFeedback.filter(fb => fb.rating === star).length / myFeedback.length) * 100
        : 0
    }))
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
        </div>
        
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="history">My Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <Skeleton className="h-6 w-48" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Feedback & Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Share your experience and view your feedback history
          </p>
        </div>
        {activeTab === 'history' && myFeedback.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {feedbackCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">
            My Feedback {myFeedback.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {myFeedback.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <div className="space-y-2">
                  <Label>Overall Rating *</Label>
                  <div className="flex items-center gap-4">
                    {renderStarRating(rating, setRating, setHoveredRating)}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {rating > 0 && (
                          rating === 1 ? 'Poor' :
                          rating === 2 ? 'Fair' :
                          rating === 3 ? 'Good' :
                          rating === 4 ? 'Very Good' : 'Excellent'
                        )}
                      </span>
                      {rating > 0 && getEmojiForRating(rating)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback category" />
                    </SelectTrigger>
                    <SelectContent>
                      {feedbackCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            {cat.icon && React.createElement(cat.icon, { className: "h-4 w-4" })}
                            {cat.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your feedback"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Comments *</Label>
                  <Textarea
                    id="comment"
                    placeholder="Please share your detailed feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    className="min-h-[120px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 30 characters (currently {comment.length})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Submit anonymously
                  </Label>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <ThumbsUp className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Your opinion matters</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    We value your feedback and use it to improve our services. Thank you for taking the time to share your experience!
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={submitting || rating === 0 || !comment.trim() || comment.length < 30}
                    className="min-w-[180px]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {filteredFeedback.length > 0 ? (
            <>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Feedback</h3>
                    <p className="text-3xl font-bold">{myFeedback.length}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold">{feedbackStats.averageRating}</p>
                      <div className="flex">
                        {renderStarRating(Math.round(Number(feedbackStats.averageRating)))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Response Rate</h3>
                    <p className="text-3xl font-bold">
                      {myFeedback.filter(f => f.response).length}/{myFeedback.length}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-medium">Rating Distribution</h3>
                <div className="space-y-2">
                  {feedbackStats.ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-4">
                      <div className="flex items-center w-10">
                        <span className="w-5">{star}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <span className="text-sm text-muted-foreground w-10 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredFeedback.map((feedback) => (
                  <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{feedback.title || 'Feedback'}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              {feedback.category.icon && React.createElement(feedback.category.icon, { className: "h-3 w-3" })}
                              {feedback.category.name}
                            </span>
                            • 
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(feedback.createdDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={getStatusBadgeVariant(feedback.status)}>
                            {feedback.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStarRating(feedback.rating)}
                            {getEmojiForRating(feedback.rating)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{feedback.comment}</p>
                      
                      {feedback.response && (
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-blue-100 p-1 rounded-full">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <p className="text-sm font-medium">Hotel Response</p>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {new Date(feedback.response.responseDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-8">
                            {feedback.response.message}
                          </p>
                        </div>
                      )}

                      {feedback.isAnonymous && (
                        <Badge variant="outline" className="mt-3">
                          <User className="h-3 w-3 mr-1" />
                          Anonymous
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No feedback found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery || filterCategory 
                    ? "Try adjusting your search or filter criteria"
                    : "Share your experience to help us improve our services."}
                </p>
                <Button 
                  onClick={() => setActiveTab('submit')}
                  className="mt-4"
                >
                  Submit Your First Feedback
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}