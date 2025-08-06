'use client'

import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Alert, AlertDescription } from '../ui/alert'
import { Download, FileText, Music, Archive, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface DownloadSectionProps {
  data: any
}

export function DownloadSection({ data }: DownloadSectionProps) {
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: 'idle' | 'downloading' | 'complete' | 'error'}>({})
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({})

  const downloadFiles = [
    {
      id: 'pptx',
      name: 'Enhanced Presentation.pptx',
      type: 'PowerPoint',
      size: '2.4 MB',
      icon: FileText,
      description: 'PPTX file with AI-generated transitions',
      url: '#', // In real app, this would be an S3 expiring URL
      expires: '2 hours'
    },
    {
      id: 'audio-zip',
      name: 'Audio Narration.zip',
      type: 'Audio Archive',
      size: '8.7 MB',
      icon: Archive,
      description: 'ZIP file containing all audio segments',
      url: '#',
      expires: '2 hours'
    }
  ]

  const handleDownload = async (fileId: string) => {
    setDownloadStatus(prev => ({ ...prev, [fileId]: 'downloading' }))
    setDownloadProgress(prev => ({ ...prev, [fileId]: 0 }))

    try {
      // Simulate download progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setDownloadProgress(prev => ({ ...prev, [fileId]: progress }))
      }

      // Simulate successful download
      setDownloadStatus(prev => ({ ...prev, [fileId]: 'complete' }))
      
      // In real app, would trigger actual file download
      console.log(`Downloading file: ${fileId}`)
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, [fileId]: 'error' }))
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloading':
        return <Download className="w-4 h-4 animate-pulse" />
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Download className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'downloading':
        return 'Download started'
      case 'complete':
        return 'Downloaded'
      case 'error':
        return 'Link expired'
      default:
        return 'Download'
    }
  }

  return (
    <section className="bg-white rounded-xl border p-6 shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Area
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Access your processed presentation and audio files
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Clock className="w-4 h-4" />
          Links expire in 2 hours
        </Badge>
      </div>

      {/* Security Notice */}
      <Alert className="mb-6 border-blue-200 bg-blue-50 rounded-xl">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-blue-700">
          Download links are secure and expire after 2 hours for your protection. 
          Files are temporarily stored and will be automatically deleted.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {downloadFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                    <file.icon className="w-6 h-6 text-zinc-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3>{file.name}</h3>
                      <Badge variant="outline">{file.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{file.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Size: {file.size}</span>
                      <span>Expires: {file.expires}</span>
                    </div>
                    
                    {/* Download Progress */}
                    {downloadStatus[file.id] === 'downloading' && (
                      <div className="space-y-1">
                        <Progress value={downloadProgress[file.id]} className="h-2" />
                        <p className="text-xs text-gray-600">
                          {downloadProgress[file.id]}% complete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Updated button styling per prompt */}
                <Button
                  onClick={() => handleDownload(file.id)}
                  disabled={downloadStatus[file.id] === 'downloading'}
                  className={`gap-2 ml-4 p-3 rounded-xl ${
                    downloadStatus[file.id] === 'complete' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}
                  aria-label={`Download ${file.name}`}
                >
                  {getStatusIcon(downloadStatus[file.id])}
                  {getStatusText(downloadStatus[file.id])}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Download All Button - Updated styling per prompt */}
      <div className="mt-6 pt-6 border-t">
        <Button 
          size="lg" 
          className="w-full gap-2 bg-blue-600 text-white p-3 rounded-xl"
          aria-label="Download all files as ZIP"
        >
          <Archive className="w-5 h-5" />
          Download All Files as ZIP
        </Button>
      </div>
    </section>
  )
}