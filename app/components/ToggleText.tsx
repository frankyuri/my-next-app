'use client'

import { useState } from 'react'

// 練習 3: 文字顯示/隱藏 - 學習條件渲染
export default function ToggleText() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">顯示/隱藏文字</h2>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
      >
        {isVisible ? '隱藏' : '顯示'}文字
      </button>
      {isVisible && (
        <p className="mt-4 text-lg text-blue-600 dark:text-blue-400 animate-fade-in">
          🎉 這是一段可以切換顯示的文字！
        </p>
      )}
    </div>
  )
}
