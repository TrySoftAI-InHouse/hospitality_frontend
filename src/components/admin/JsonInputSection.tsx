'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Check, AlertCircle, Code, FileText } from 'lucide-react'

interface JsonInputSectionProps {
  jsonInput: string
  setJsonInput: (input: string) => void
  setProcessingStatus: (status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error') => void
  setStatusMessage: (message: string) => void
}

export function JsonInputSection({ 
  jsonInput, 
  setJsonInput, 
  setProcessingStatus, 
  setStatusMessage 
}: JsonInputSectionProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const sampleJson = {
    slides: [
      {
        title: "Welcome to Our Presentation",
        content: [
          "Introduction to the topic",
          "Key objectives for today",
          "Agenda overview"
        ],
        transitions: [
          {
            type: "fade",
            duration: 1000,
            script: "Welcome everyone to today's presentation"
          }
        ]
      }
    ],
    metadata: {
      title: "Sample Presentation",
      author: "AI Assistant",
      created: "2024-01-01"
    }
  }

  const validateJson = async () => {
    if (!jsonInput.trim()) {
      setValidationError('Please enter JSON content')
      setIsValid(false)
      return
    }

    setIsValidating(true)
    setValidationError('')
    setProcessingStatus('processing')
    setStatusMessage('Validating JSON format...')

    try {
      // Client-side JSON validation
      const parsed = JSON.parse(jsonInput)
      
      // Basic schema validation
      if (!parsed.slides || !Array.isArray(parsed.slides)) {
        throw new Error('JSON must contain a "slides" array')
      }

      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsValid(true)
      setProcessingStatus('complete')
      setStatusMessage('JSON validated successfully')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON format'
      setValidationError(message)
      setIsValid(false)
      setProcessingStatus('error')
      setStatusMessage('JSON validation failed')
    } finally {
      setIsValidating(false)
    }
  }

  const insertSample = () => {
    setJsonInput(JSON.stringify(sampleJson, null, 2))
    setIsValid(null)
    setValidationError('')
  }

  const clearInput = () => {
    setJsonInput('')
    setIsValid(null)
    setValidationError('')
    setProcessingStatus('idle')
    setStatusMessage('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="json-input">Manual JSON Input</Label>
          <p className="text-sm text-gray-600 mt-1">
            Manually input slide data in JSON format
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={insertSample}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Sample
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearInput}
            disabled={!jsonInput}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* JSON Input Area - Updated styling per prompt */}
      <div className="bg-white rounded-xl p-4 shadow relative">
        <Textarea
          id="json-input"
          placeholder={`Enter your JSON data here...\n\nSample structure:\n{\n  "slides": [\n    {\n      "title": "Slide Title",\n      "content": ["Bullet point 1", "Bullet point 2"],\n      "transitions": [{"type": "fade", "duration": 1000}]\n    }\n  ]\n}`}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className={`
            min-h-[300px] text-xs font-mono resize-none border-0 bg-transparent p-0
            ${isValid === true ? 'text-green-700' : ''}
            ${isValid === false ? 'text-red-700' : ''}
          `}
          aria-describedby="json-help"
          aria-live="polite"
        />
        
        {/* Real-time Status Icon */}
        {isValid !== null && (
          <div className="absolute top-4 right-4">
            {isValid ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
        )}
      </div>

      {/* Validation Button */}
      <div className="flex justify-between items-center">
        <p id="json-help" className="text-sm text-gray-600">
          JSON should contain slides array with title, content, and transitions
        </p>
        <Button
          onClick={validateJson}
          disabled={isValidating || !jsonInput.trim()}
          className="gap-2"
        >
          <Code className="w-4 h-4" />
          {isValidating ? 'Validating...' : 'Validate JSON'}
        </Button>
      </div>

      {/* Validation Error */}
      {validationError && (
        <div 
          className="bg-red-50 border border-red-200 rounded-xl p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{validationError}</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div 
          className="bg-green-50 border border-green-200 rounded-xl p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">JSON format is valid and ready for processing</span>
          </div>
        </div>
      )}
    </div>
  )
}