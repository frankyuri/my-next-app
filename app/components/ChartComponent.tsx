'use client'

import { useState } from 'react'

export default function ChartComponent() {
  const [chartType, setChartType] = useState<'sales' | 'users' | 'revenue'>('sales')

  const chartData = {
    sales: { label: '銷售額 (萬)', data: [12, 19, 15, 25, 22, 30], color: 'blue' },
    users: { label: '新增用戶', data: [150, 200, 180, 220, 250, 300], color: 'green' },
    revenue: { label: '營收 (萬)', data: [50, 65, 60, 75, 80, 95], color: 'purple' },
  }

  const labels = ['1月', '2月', '3月', '4月', '5月', '6月']
  const currentData = chartData[chartType]
  const maxValue = Math.max(...currentData.data)

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600'
      case 'green': return 'bg-green-600'
      case 'purple': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const stats = [
    { label: '總銷售', value: '123萬', change: '+12%', color: 'blue' },
    { label: '總用戶', value: '1,300', change: '+8%', color: 'green' },
    { label: '總營收', value: '425萬', change: '+15%', color: 'purple' },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📊 數據分析面板
        </h2>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-700 dark:to-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-600"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </p>
              <span className={`text-sm font-medium ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                'text-purple-600'
              }`}>
                ↗ {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* 圖表類型選擇 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setChartType('sales')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === 'sales'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
            }`}
          >
            📈 銷售額
          </button>
          <button
            onClick={() => setChartType('users')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === 'users'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
            }`}
          >
            👥 用戶數
          </button>
          <button
            onClick={() => setChartType('revenue')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === 'revenue'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
            }`}
          >
            💰 營收
          </button>
        </div>

        {/* 圖表 - 柱狀圖 */}
        <div className="h-[400px] bg-gray-50 dark:bg-zinc-900 rounded-lg p-6">
          <div className="h-full flex items-end justify-around gap-4">
            {currentData.data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {value}
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-t-lg relative overflow-hidden" style={{ height: '300px' }}>
                  <div
                    className={`absolute bottom-0 w-full ${getColorClass(currentData.color)} transition-all duration-500 rounded-t-lg`}
                    style={{ height: `${(value / maxValue) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {labels[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>CSS 動畫圖表</strong>：使用 CSS 高度和過渡效果</li>
          <li>• <strong>動態數據</strong>：根據選擇切換不同圖表</li>
          <li>• <strong>響應式設計</strong>：flex 佈局適應不同螢幕</li>
          <li>• <strong>百分比計算</strong>：根據最大值計算高度</li>
          <li>• <strong>進階選項</strong>：可安裝 chart.js 和 react-chartjs-2 使用專業圖表</li>
          <li className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
            <strong>安裝專業圖表庫：</strong><br/>
            <code className="text-blue-900 dark:text-blue-100">npm install chart.js react-chartjs-2</code>
          </li>
        </ul>
      </div>
    </div>
  )
}
