'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'

interface FileUploadSectionProps {
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
  setProcessingStatus: (status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error') => void
  setStatusMessage: (message: string) => void
}

export function FileUploadSection({ 
  uploadedFile, 
  setUploadedFile, 
  setProcessingStatus, 
  setStatusMessage 
}: FileUploadSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    if (file.size > maxSize) {
      return 'File size must be less than 50MB'
    }

    const extension = file.name.toLowerCase().split('.').pop()
    if (!['pptx', 'json'].includes(extension || '')) {
      return 'Only PPTX and JSON files are accepted'
    }

    return null
  }

  const handleFile = useCallback(async (file: File) => {
    const error = validateFile(file)
    if (error) {
      setUploadError(error)
      return
    }

    setUploadError('')
    setIsUploading(true)
    setProcessingStatus('uploading')
    setStatusMessage('Uploading...')

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setUploadedFile(file)
      setProcessingStatus('processing')
      setStatusMessage('Processing file...')
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setProcessingStatus('complete')
      setStatusMessage('Upload Successful')
    } catch (error) {
      setProcessingStatus('error')
      setStatusMessage('Invalid file format')
      setUploadError('Failed to process file')
    } finally {
      setIsUploading(false)
    }
  }, [setUploadedFile, setProcessingStatus, setStatusMessage])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setUploadError('')
    setProcessingStatus('idle')
    setStatusMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file-upload">File Upload</Label>
        <p className="text-sm text-gray-600 mt-1">
          Upload PPTX presentations or JSON data files for processing
        </p>
      </div>

      {/* Drag and Drop Zone - Updated styling per prompt */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center transition-colors
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploadedFile ? 'border-green-500 bg-green-50' : ''}
          hover:bg-zinc-100
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-zinc-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {isDragOver ? 'Drop your file here' : 'Drag and drop your file here'}
              </p>
              <p className="text-sm text-gray-600">or</p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="gap-2"
              >
                <File className="w-4 h-4" />
                {isUploading ? 'Uploading...' : 'Upload PPTX or JSON'}
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Supports PPTX and JSON files up to 50MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-green-700">Upload Successful</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <File className="w-4 h-4" />
                <span>{uploadedFile.name}</span>
                <span>({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="h-6 w-6 p-0 text-zinc-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept=".pptx,.json,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/json"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
          aria-label="Upload PPTX or JSON file"
        />
      </div>

      {/* Error Display - Updated for status feedback */}
      {uploadError && (
        <div 
          className="bg-red-50 border border-red-200 rounded-xl p-4"
          role="alert" 
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{uploadError}</span>
          </div>
        </div>
      )}
    </div>
  )
}