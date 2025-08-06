'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Eye, Play, Clock, FileText } from 'lucide-react'

interface PreviewSectionProps {
  data: any
}

// Mock slide data for preview
const mockSlides = [
  {
    id: 1,
    title: "Introduction",
    transitions: [
      { type: "fade", duration: 1000, thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop" },
      { type: "slide", duration: 1200, thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
      { type: "zoom", duration: 800, thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" }
    ],
    content: ["Welcome to our presentation", "Key objectives", "Agenda overview"],
    script: "Welcome everyone to today's comprehensive presentation where we'll explore..."
  },
  {
    id: 2,
    title: "Market Analysis",
    transitions: [
      { type: "wipe", duration: 1000, thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
      { type: "dissolve", duration: 1500, thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
      { type: "push", duration: 900, thumbnail: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=300&fit=crop" }
    ],
    content: ["Current market trends", "Competitive landscape", "Growth opportunities"],
    script: "Our market analysis reveals significant trends that are shaping the industry..."
  }
]

export function PreviewSection({ data }: PreviewSectionProps) {
  const [selectedSlide, setSelectedSlide] = useState<any>(null)
  const [selectedTransition, setSelectedTransition] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const slides = mockSlides // In real app, this would come from processed data

  const openPreview = (slide: any, transition: any) => {
    setSelectedSlide(slide)
    setSelectedTransition(transition)
    setIsModalOpen(true)
  }

  return (
    <section className="bg-white rounded-xl border p-6 shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Slide Preview Gallery
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Preview generated transitions for each slide
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <FileText className="w-4 h-4" />
          {slides.length} slides processed
        </Badge>
      </div>

      <div className="space-y-6">
        {slides.map((slide) => (
          <Card key={slide.id} className="overflow-hidden rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Slide {slide.id}: {slide.title}</span>
                <Badge variant="outline">
                  {slide.transitions.length} transitions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Slide Content */}
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Content:</p>
                  <ul className="text-sm space-y-1">
                    {slide.content.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Transition Thumbnails - Updated styling per prompt */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Transition Previews:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {slide.transitions.map((transition: any, index: number) => (
                      <div
                        key={index}
                        className="group cursor-pointer rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                        onClick={() => openPreview(slide, transition)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Slide ${slide.id}, Transition ${index + 1}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openPreview(slide, transition)
                          }
                        }}
                      >
                        <div className="relative aspect-video">
                          <ImageWithFallback
                            src={transition.thumbnail}
                            alt={`${slide.title} - ${transition.type} transition`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-zinc-800" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {transition.type}
                            </Badge>
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {transition.duration}ms
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Script Preview */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 mb-2">Generated Script:</p>
                  <p className="text-sm text-zinc-700">
                    {slide.script.substring(0, 120)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedSlide?.title} - {selectedTransition?.type} transition
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden">
              {selectedTransition && (
                <ImageWithFallback
                  src={selectedTransition.thumbnail}
                  alt={`Preview of ${selectedTransition.type} transition`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm">Transition: {selectedTransition?.type}</p>
                <p className="text-xs text-gray-600">
                  Duration: {selectedTransition?.duration}ms
                </p>
              </div>
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Play Transition
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}