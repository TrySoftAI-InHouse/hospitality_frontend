'use client'

import { useState } from 'react'
import { VisualCarousel } from './VisualCarousel'
import { SignupForm } from './SignupForm'

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual Storytelling */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <VisualCarousel />
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-sm">
          <SignupForm 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep}
            totalSteps={totalSteps}
          />
        </div>
      </div>
    </div>
  )
}