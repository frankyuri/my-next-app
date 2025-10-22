'use client'

import { useState } from 'react'

// 練習 23: 無限滾動載入
export default function InfiniteScroll() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1))
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const newItems = Array.from(
        { length: 10 },
        (_, i) => items.length + i + 1
      )
      setItems([...items, ...newItems])
      setLoading(false)
    }, 1000)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight
    if (bottom && !loading) {
      loadMore()
    }
  }

  return (
    <div className="p-6 border-2 border-teal-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">♾️ 無限滾動載入</h2>

      <div
        onScroll={handleScroll}
        className="h-96 overflow-y-auto border border-gray-200 dark:border-zinc-700 rounded-lg p-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(item => (
            <div
              key={item}
              className="aspect-square bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            >
              {item}
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent" />
            <p className="mt-2 text-gray-600 dark:text-gray-400">載入中...</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：滾動監聽、動態載入、性能優化
      </div>
    </div>
  )
}
