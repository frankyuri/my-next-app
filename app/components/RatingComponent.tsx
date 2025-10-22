'use client'

import { useState } from 'react'

// 練習 21: 評分組件
export default function RatingComponent() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="p-6 border-2 border-orange-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">⭐ 評分組件</h2>

      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-5xl transition-transform hover:scale-110"
            >
              {star <= (hover || rating) ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        {rating > 0 && (
          <div className="animate-fade-in">
            <p className="text-2xl font-bold text-orange-500 mb-2">
              {rating} / 5 星
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {rating === 5 && '太棒了！'}
              {rating === 4 && '很好！'}
              {rating === 3 && '還不錯'}
              {rating === 2 && '一般般'}
              {rating === 1 && '需要改進'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：Hover 狀態、評分邏輯、用戶交互
      </div>
    </div>
  )
}
