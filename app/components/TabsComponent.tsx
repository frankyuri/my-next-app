'use client'

import { useState } from 'react'

// 練習 17: Tab 切換組件
export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: '個人資料',
      icon: '👤',
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">姓名</label>
            <input type="text" className="w-full px-3 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" placeholder="王小明" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" placeholder="example@email.com" />
          </div>
        </div>
      )
    },
    {
      title: '帳號設定',
      icon: '⚙️',
      content: (
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>接收電子報</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>雙重驗證</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>推送通知</span>
          </label>
        </div>
      )
    },
    {
      title: '偏好設定',
      icon: '🎨',
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">語言</label>
            <select className="w-full px-3 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
              <option>繁體中文</option>
              <option>English</option>
              <option>日本語</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">主題</label>
            <select className="w-full px-3 py-2 border rounded dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">
              <option>淺色</option>
              <option>深色</option>
              <option>自動</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: '通知',
      icon: '🔔',
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="font-medium text-sm">新訊息</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">你有 3 則未讀訊息</div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
            <div className="font-medium text-sm">系統更新</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">版本 2.0 已發布</div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 border-2 border-violet-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📑 Tab 切換組件</h2>

      <div className="max-w-2xl mx-auto">
        {/* Tab 標籤 */}
        <div className="flex border-b border-gray-200 dark:border-zinc-700 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === index
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{tab.icon}</span>
                <span>{tab.title}</span>
              </div>
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400" />
              )}
            </button>
          ))}
        </div>

        {/* Tab 內容 */}
        <div className="p-4">
          {tabs[activeTab].content}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：Tab 切換、條件渲染、動態樣式、組件化思維
      </div>
    </div>
  )
}
