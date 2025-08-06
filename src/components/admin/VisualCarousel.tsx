'use client'

import { useState, useEffect } from 'react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop',
    title: 'Connect with your team',
    subtitle: 'Collaborate seamlessly with colleagues around the world'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop',
    title: 'Boost your productivity',
    subtitle: 'Streamline your workflow with powerful tools and insights'
  },
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=1000&fit=crop',
    title: 'Achieve your goals',
    subtitle: 'Turn your ideas into reality with our comprehensive platform'
  }
]

export function VisualCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
        <div className="max-w-md">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {index === currentSlide && (
                <>
                  <h1 className="mb-4 text-4xl leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {slide.subtitle}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-12 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}