'use client'

import { useState } from 'react'

// 練習 20: Toast 通知
export default function ToastNotification() {
  const [toasts, setToasts] = useState<Array<{id: number, type: string, message: string}>>([])

  const addToast = (type: string, message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const toastTypes = [
    { type: 'success', label: '成功', icon: '✓', color: 'green' },
    { type: 'error', label: '錯誤', icon: '✕', color: 'red' },
    { type: 'warning', label: '警告', icon: '⚠', color: 'yellow' },
    { type: 'info', label: '資訊', icon: 'ℹ', color: 'blue' }
  ]

  return (
    <div className="p-6 border-2 border-lime-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🔔 Toast 通知</h2>

      <div className="flex gap-3 flex-wrap justify-center">
        {toastTypes.map(({ type, label, color }) => (
          <button
            key={type}
            onClick={() => addToast(type, `這是一則${label}訊息`)}
            className={`px-6 py-3 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition-colors`}
          >
            {label}通知
          </button>
        ))}
      </div>

      {/* Toast 容器 */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => {
          const toastType = toastTypes.find(t => t.type === toast.type)!
          return (
            <div
              key={toast.id}
              className={`bg-white dark:bg-zinc-800 border-l-4 border-${toastType.color}-500 rounded-lg shadow-lg p-4 min-w-[300px] animate-slide-in`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-2xl text-${toastType.color}-500`}>
                  {toastType.icon}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {toastType.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {toast.message}
                  </div>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：陣列狀態管理、自動移除、動畫效果、定時器
      </div>
    </div>
  )
}
