'use client'

import { useState } from 'react'

// 練習 22: 進度條
export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const startProgress = () => {
    setIsRunning(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  return (
    <div className="p-6 border-2 border-pink-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📊 進度條</h2>

      <div className="max-w-md mx-auto space-y-6">
        {/* 基本進度條 */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">基本進度條</span>
            <span className="text-sm font-bold">{progress}%</span>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 分段進度條 */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">分段進度條</span>
          </div>
          <div className="flex gap-1">
            {[20, 40, 60, 80, 100].map(step => (
              <div
                key={step}
                className={`h-4 flex-1 rounded transition-colors ${
                  progress >= step ? 'bg-pink-500' : 'bg-gray-200 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 圓形進度條 */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-zinc-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="text-pink-500 transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={startProgress}
            disabled={isRunning}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRunning ? '進行中...' : '開始'}
          </button>
          <button
            onClick={() => setProgress(0)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            重置
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：進度動畫、SVG 圓形進度、Range Input
      </div>
    </div>
  )
}
