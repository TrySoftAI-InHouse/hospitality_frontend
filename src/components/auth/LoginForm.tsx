// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { authService } from '../../services/authService';
import type { LoginCredentials } from '../../types/auth.types';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: 'john.doe@example.com',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(credentials);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login({
        email: 'john.doe@example.com',
        password: 'demo' // Any password works for demo
      });
      onSuccess();
    } catch (err) {
      setError('Failed to login with demo account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to HospitalityPro</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Use Demo Account'}
          </Button>

          {onSwitchToRegister && (
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto"
                onClick={onSwitchToRegister}
              >
                Sign up
              </Button>
            </div>
          )}
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm font-medium text-blue-800 mb-2">Demo Account Credentials:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>Email: john.doe@example.com</p>
            <p>Password: Any password will work</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}