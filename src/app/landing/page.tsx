import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Menu } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 relative overflow-hidden">
      {/* Cloud Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-16 bg-white/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-18 bg-white/25 rounded-full blur-xl"></div>
        <div className="absolute top-60 right-1/3 w-20 h-14 bg-white/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-36 h-22 bg-white/30 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-800">available for projects</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm">
              <div className="flex items-center gap-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🌿</span>
                  </div>
                  <span className="font-semibold text-gray-800">Reveel</span>
                </div>
                
                {/* Menu Items */}
                <div className="flex items-center gap-6">
                  <Link href="#works" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Works</Link>
                  <Link href="#benefits" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Benefits</Link>
                  <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">About</Link>
                  <Link href="#process" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Process</Link>
                  <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Pricing</Link>
                  <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
                  <Link href="#faq" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">FAQ</Link>
                </div>
              </div>
            </nav>

            {/* Email Badge */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm">
              <Mail className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-800">hey@reveel.com</span>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-sm">
              <Menu className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[70vh] px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Need a cool website?
            <span className="block text-4xl md:text-6xl font-light mt-2">I've got you covered</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Designing and building sites that wow visitors and win customers
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-12 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book a call
          </Button>
        </div>
      </main>

      {/* Bottom UI Mockups Preview */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {/* Mock UI Elements */}
          <div className="flex gap-4 opacity-60">
            <div className="w-64 h-16 bg-gray-800 rounded-xl flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded"></div>
                <span className="text-white text-sm font-medium">Remix Lab</span>
              </div>
              <div className="flex gap-2">
                <div className="w-16 h-6 bg-white/10 rounded text-xs text-white flex items-center justify-center">Remixes</div>
                <div className="w-20 h-6 bg-white/10 rounded text-xs text-white flex items-center justify-center">Resources</div>
              </div>
            </div>
            
            <div className="w-72 h-20 bg-orange-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌿</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">Flowré</div>
                  <div className="text-xs text-gray-600">A little plant shop in the ❤️ of Lisbon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
