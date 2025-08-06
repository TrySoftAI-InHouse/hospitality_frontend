'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ArrowLeft, ArrowRight, Mail, Lock, User, Building, Check } from 'lucide-react'
import { SocialSigninButtons } from './SocialSigninButtons'

interface SignupFormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

export function SignupForm({ currentStep, setCurrentStep, totalSteps }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    role: ''
  })

  const progressPercentage = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-2">
        <div className="mb-6">
          <h2 className="mb-2">Create your account</h2>
          <p className="text-muted-foreground">
            Join thousands of users already using our platform
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Email & Password */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3>Let's start with the basics</h3>
              <p className="text-sm text-muted-foreground">
                We'll need your email and a secure password
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <SocialSigninButtons />
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3>Tell us about yourself</h3>
              <p className="text-sm text-muted-foreground">
                Help us personalize your experience
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="Your job title"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3>You're all set!</h3>
              <p className="text-sm text-muted-foreground">
                Review your information before creating your account
              </p>
            </div>

            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="text-sm">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Company:</span>
                <span className="text-sm">{formData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Role:</span>
                <span className="text-sm">{formData.role}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              Create Account
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}