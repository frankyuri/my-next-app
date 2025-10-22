'use client'

import { useState } from 'react'

// 練習 1: 計數器 - 學習 useState 和事件處理
export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const sign = () => setCount(-count)
  const reset = () => setCount(0)

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">計數器練習</h2>
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
        當前數值: <strong className="text-blue-600 dark:text-blue-400 text-2xl">{count}</strong>
      </p>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          增加 +1
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          減少 -1
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          重置
        </button>
        <button
          onClick={sign}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          取反
        </button>
      </div>
    </div>
  )
}
