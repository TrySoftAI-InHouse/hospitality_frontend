import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
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
  Loader2,
  User,
  Smile,
  Frown,
  Meh,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { authService } from '../../services/authService'; // Add this import
import { guestService } from '../../services/guestService'
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

export function FeedbackSystem() {
  const [feedbackCategories, setFeedbackCategories] = useState<FeedbackCategory[]>([]);
  const [myFeedback, setMyFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);
  
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
      setLoading(true);
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
      showToast('Thank you for your feedback!', 'success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showToast('Failed to submit feedback', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFeedbackExpansion = (id: string) => {
    setExpandedFeedback(expandedFeedback === id ? null : id);
  };

  const renderStarRating = (currentRating: number, onRate?: (rating: number) => void, onHover?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <TooltipProvider key={starNumber}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => onRate?.(starNumber)}
                  onMouseEnter={() => onHover?.(starNumber)}
                  onMouseLeave={() => onHover?.(0)}
                >
                  <Star
                    className={`h-6 w-6 transition-all ${
                      starNumber <= (hoveredRating || currentRating)
                        ? 'fill-yellow-400 text-yellow-400 hover:scale-110'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reviewed':
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Reviewed
          </Badge>
        );
      case 'Resolved':
        return (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  const getEmojiForRating = (rating: number) => {
    if (rating >= 4) return <Smile className="h-5 w-5 text-green-500" />;
    if (rating >= 3) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const filteredFeedback = myFeedback.filter(feedback => {
    const matchesSearch = feedback.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         feedback.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || feedback.category.id === filterCategory;
    return matchesSearch && matchesCategory;
  });

const feedbackStats = {
  averageRating: myFeedback.length > 0 
    ? myFeedback.reduce((sum, fb) => sum + fb.rating, 0) / myFeedback.length
    : 0,
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
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
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
                  <Skeleton className="h-5 w-5 rounded-full" />
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
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Feedback Center</h1>
        <p className="text-sm text-muted-foreground">
          Share your experience and help us improve our services
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="submit" className="data-[state=active]:bg-background">
            <MessageSquare className="h-4 w-4 mr-2" />
            Submit Feedback
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-background">
            <div className="flex items-center gap-2">
              <span>My Feedback</span>
              {myFeedback.length > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5 py-0">
                  {myFeedback.length}
                </Badge>
              )}
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-6 pt-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    Overall Rating <span className="text-destructive">*</span>
                  </Label>
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

                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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

                <div className="space-y-3">
                  <Label>Title (Optional)</Label>
                  <Input
                    placeholder="Brief summary of your feedback"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    Detailed Feedback <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    placeholder="Please share your detailed feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    className="min-h-[120px]"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      {comment.length < 30 ? (
                        <span className="text-destructive">
                          Minimum 30 characters required ({30 - comment.length} more)
                        </span>
                      ) : (
                        <span className="text-green-500">
                          Minimum length satisfied
                        </span>
                      )}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {comment.length}/500
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Submit anonymously
                    <p className="text-xs text-muted-foreground mt-1">
                      Your name won't be shown with this feedback
                    </p>
                  </Label>
                </div>

                <Alert variant="default" className="bg-blue-50 border-blue-200">
                  <ThumbsUp className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">We value your feedback</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Your honest opinions help us improve our services for everyone.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setRating(0);
                      setCategory('');
                      setTitle('');
                      setComment('');
                    }}
                  >
                    Clear
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={submitting || rating === 0 || !comment.trim() || comment.length < 30}
                    className="min-w-[180px] shadow-sm"
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
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your feedback..."
                  className="pl-9 w-full sm:w-[280px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
             
             {/* // In your FeedbackSystem component, update the Select components like this: */}

{/* Category Select */}
<Select 
  value={category} 
  onValueChange={(value) => setCategory(value)}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    {/* Use a special value for "All Categories" that isn't an empty string */}
    <SelectItem value="all-categories">
      All Categories
    </SelectItem>
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

{/* Filter Select */}
<Select 
  value={filterCategory} 
  onValueChange={(value) => setFilterCategory(value === "all-categories" ? "" : value)}
>
  <SelectTrigger className="w-[180px]">
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4" />
      <SelectValue placeholder="Filter by category" />
    </div>
  </SelectTrigger>
  <SelectContent>
    {/* Use same special value for consistency */}
    <SelectItem value="all-categories">
      All Categories
    </SelectItem>
    {feedbackCategories.map((cat) => (
      <SelectItem key={cat.id} value={cat.id}>
        {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

            </div>
          </div>

          {filteredFeedback.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100/50 p-3 rounded-full">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{myFeedback.length}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-100/50 p-3 rounded-full">
                      <Star className="h-5 w-5 text-yellow-600 fill-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Rating</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">
                          {feedbackStats.averageRating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {renderStarRating(Math.round(feedbackStats.averageRating))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100/50 p-3 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Responded</p>
                      <p className="text-2xl font-bold">
                        {myFeedback.filter(f => f.response).length}/{myFeedback.length}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-medium mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {feedbackStats.ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-4">
                      <div className="flex items-center w-12">
                        <span className="w-5 text-sm">{star}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <Progress value={percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="space-y-3">
                {filteredFeedback.map((feedback) => (
                  <Card 
                    key={feedback.id} 
                    className="hover:shadow-sm transition-shadow overflow-hidden"
                  >
                    <button
                      className="w-full text-left"
                      onClick={() => toggleFeedbackExpansion(feedback.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg line-clamp-1">
                                {feedback.title || 'Feedback'}
                              </h3>
                              {getStatusBadge(feedback.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                {feedback.category.icon && React.createElement(feedback.category.icon, { className: "h-3 w-3" })}
                                {feedback.category.name}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(feedback.createdDate).toLocaleDateString()}
                              </span>
                              {feedback.isAnonymous && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    Anonymous
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {renderStarRating(feedback.rating)}
                              {getEmojiForRating(feedback.rating)}
                            </div>
                            {expandedFeedback === feedback.id ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </button>

                    <CardContent className={cn(
                      "pt-0 pb-6 transition-all duration-300",
                      expandedFeedback === feedback.id ? "block" : "hidden"
                    )}>
                      <Separator className="mb-4" />
                      <p className="whitespace-pre-line text-sm mb-6">
                        {feedback.comment}
                      </p>
                      
                      {feedback.response && (
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/hotel-logo.png" />
                              <AvatarFallback>H</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium">Hotel Management</p>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(feedback.response.responseDate).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">
                                {feedback.response.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="text-center border-0 shadow-none">
              <CardContent className="p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No feedback found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery || filterCategory 
                    ? "No matching feedback found. Try adjusting your search."
                    : "You haven't submitted any feedback yet."}
                </p>
                <Button 
                  onClick={() => setActiveTab('submit')}
                  className="mt-4"
                  variant="outline"
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