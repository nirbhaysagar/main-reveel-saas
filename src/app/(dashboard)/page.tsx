// ============================================
// DASHBOARD HOME PAGE - SIMPLIFIED VERSION
// ============================================
// Purpose: Main dashboard with overview stats
// Why: Users see key metrics at a glance
// Framework: Next.js Server Component

export default function DashboardPage() {
  console.log('Dashboard page is loading...')
  
  return (
    <div className="space-y-6">
      {/* ============================================
          PAGE HEADER
          ============================================ */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Welcome back! Here's what's happening with your competitors.
        </p>
      </div>

      {/* ============================================
          SIMPLE STATS GRID
          ============================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600">Total Competitors</h3>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-slate-500 mt-1">+2 this month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600">Changes Detected</h3>
          <div className="text-2xl font-bold">47</div>
          <p className="text-xs text-slate-500 mt-1">+12 this week</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600">Active Alerts</h3>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-slate-500 mt-1">3 new today</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600">Insights Generated</h3>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-slate-500 mt-1">+23 this week</p>
        </div>
      </div>

      {/* ============================================
          RECENT ACTIVITY
          ============================================ */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-sm text-slate-600 mt-1">
            Latest changes detected from your competitors
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="font-medium text-slate-900">Nike</p>
                  <p className="text-sm text-slate-600">Price drop detected</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium text-slate-900">Adidas</p>
                  <p className="text-sm text-slate-600">New product launched</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">5 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <div>
                  <p className="font-medium text-slate-900">Puma</p>
                  <p className="text-sm text-slate-600">Campaign updated</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}