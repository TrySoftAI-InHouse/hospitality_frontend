'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Slider } from '../ui/slider'
import { Play, Pause, RotateCcw, Volume2, Download, Settings } from 'lucide-react'

interface AudioPlaybackSectionProps {
  data: any
}

// Mock audio data for each slide segment
const mockAudioData = [
  {
    slideId: 1,
    segments: [
      { id: 1, title: "Opening", duration: 15, url: "#", text: "Welcome everyone to today's presentation..." },
      { id: 2, title: "Objectives", duration: 12, url: "#", text: "Our key objectives for today include..." },
      { id: 3, title: "Agenda", duration: 8, url: "#", text: "Let's review our agenda for the session..." }
    ]
  },
  {
    slideId: 2,
    segments: [
      { id: 4, title: "Market Overview", duration: 18, url: "#", text: "Current market analysis shows..." },
      { id: 5, title: "Competition", duration: 14, url: "#", text: "Our competitive landscape reveals..." },
      { id: 6, title: "Opportunities", duration: 16, url: "#", text: "Growth opportunities are emerging..." }
    ]
  }
]

const pollyVoices = [
  { id: 'joanna', name: 'Joanna', gender: 'Female', language: 'en-US' },
  { id: 'matthew', name: 'Matthew', gender: 'Male', language: 'en-US' },
  { id: 'amy', name: 'Amy', gender: 'Female', language: 'en-GB' },
  { id: 'brian', name: 'Brian', gender: 'Male', language: 'en-GB' }
]

export function AudioPlaybackSection({ data }: AudioPlaybackSectionProps) {
  const [selectedVoice, setSelectedVoice] = useState('joanna')
  const [playingSegment, setPlayingSegment] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([80])
  const audioRef = useRef<HTMLAudioElement>(null)

  const playSegment = (segmentId: number) => {
    if (playingSegment === segmentId) {
      // Pause current
      setPlayingSegment(null)
      audioRef.current?.pause()
    } else {
      // Play new segment
      setPlayingSegment(segmentId)
      // In real app, would load and play actual audio file
      console.log(`Playing segment ${segmentId} with voice ${selectedVoice}`)
    }
  }

  const resetAudio = () => {
    setPlayingSegment(null)
    setCurrentTime(0)
    audioRef.current?.pause()
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const regenerateAudio = () => {
    console.log(`Regenerating audio with voice: ${selectedVoice}`)
    // In real app, would call API to regenerate with selected voice
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  return (
    <section className="bg-white rounded-xl border p-6 shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio Playback
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Preview AI-generated narration for each slide segment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-zinc-500" />
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pollyVoices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name} ({voice.gender})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={regenerateAudio} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Regenerate
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {mockAudioData.map((slideAudio) => (
          <Card key={slideAudio.slideId} className="rounded-xl shadow bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Slide {slideAudio.slideId} Audio Segments</span>
                <Badge variant="outline">
                  {slideAudio.segments.length} segments
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slideAudio.segments.map((segment) => (
                  <div key={segment.id} className="border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playSegment(segment.id)}
                          className="w-10 h-10 p-0 rounded"
                          aria-label={`Play audio for slide ${slideAudio.slideId}, segment ${segment.id}`}
                        >
                          {playingSegment === segment.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <div>
                          <p className="text-sm">{segment.title}</p>
                          <p className="text-xs text-gray-600">
                            Duration: {formatTime(segment.duration)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>

                    {/* Audio Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-10">
                          {formatTime(currentTime)}
                        </span>
                        <Slider
                          value={[playingSegment === segment.id ? currentTime : 0]}
                          max={segment.duration}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-600 w-10">
                          {formatTime(segment.duration)}
                        </span>
                      </div>
                    </div>

                    {/* Script Text */}
                    <div className="mt-3 p-3 bg-zinc-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Script:</p>
                      <p className="text-sm text-zinc-700">{segment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Volume Control */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Volume2 className="w-4 h-4 text-zinc-500" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600 w-8">{volume[0]}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hidden audio element for actual playback */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
        onEnded={() => setPlayingSegment(null)}
      />
    </section>
  )
}