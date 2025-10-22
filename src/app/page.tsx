'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Target, Zap, Bell, Mail, Users, Slack, Chrome, FileText, MessageCircle, Twitter } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-medium text-gray-900 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Reveel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/register">
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 py-2 font-medium text-sm" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gray-900 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gray-900 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gray-900 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8 font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            <span className="mr-2">✨</span>
            Trusted by 500+ businesses worldwide
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-[0.9] tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Track Competitors
            <span className="block font-medium text-gray-600">Effortlessly</span>
            with AI Intelligence
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Monitor competitor websites, detect pricing changes, track product updates, 
            and get AI-powered insights—all automatically.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/register">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 py-4 rounded-full font-medium" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-gray-900 border-gray-300 hover:bg-gray-50 text-lg px-8 py-4 rounded-full font-medium" 
              style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Join 500+ businesses tracking competitors
              </h3>
              <p className="text-sm text-gray-600 mb-6 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Get weekly competitor insights and change alerts delivered to your inbox
              </p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-sm font-light" 
                  style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}
                />
                <Button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-2xl font-medium text-sm" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              About Reveel
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
              The competitive intelligence platform that actually works
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl font-light text-gray-900 mb-8 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Never Miss a Competitive Move
              </h3>
              <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                Reveel automatically monitors your competitors' websites, tracks pricing changes, 
                detects product updates, and sends you instant alerts when something important happens.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mt-4 mr-6 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-lg" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Website Monitoring</h4>
                    <p className="text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Track competitor websites 24/7 with automated scraping</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mt-4 mr-6 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-lg" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Change Detection</h4>
                    <p className="text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI-powered analysis to detect pricing and product changes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mt-4 mr-6 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 text-lg" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Instant Alerts</h4>
                    <p className="text-gray-600 font-light leading-relaxed" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Get notified immediately when competitors make important changes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-3xl mb-8">
                  <Target className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="text-3xl font-light text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Monitor. Detect. Alert.</h4>
                <p className="text-gray-600 font-light leading-relaxed text-lg" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
                  Add competitor websites, set monitoring preferences, and get instant 
                  notifications when they change prices, launch products, or update content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-xl font-medium mb-3" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Reveel</h3>
          <p className="text-gray-500 mb-4 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            The competitive intelligence platform that helps you stay ahead.
          </p>
          <p className="text-gray-400 text-sm font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            &copy; 2024 Reveel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}