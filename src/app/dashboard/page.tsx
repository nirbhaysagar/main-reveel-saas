export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
          Welcome back! Here's what's happening with your competitors.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Total Competitors</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>12</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>+2 this month</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Changes Detected</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>47</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>+12 this week</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>AI Insights</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>8</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Generated today</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Active Jobs</h3>
          <div className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>5</div>
          <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Running now</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>Recent Activity</h2>
          <p className="text-sm text-gray-600 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>
            Latest changes detected across your competitors
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Nike updated pricing</p>
                  <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>2 minutes ago</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Price Change</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Adidas launched new product</p>
                  <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>1 hour ago</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Product Launch</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Puma updated homepage</p>
                  <p className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>3 hours ago</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-light" style={{ fontFamily: 'SF Pro Text, system-ui, sans-serif' }}>Content Update</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

