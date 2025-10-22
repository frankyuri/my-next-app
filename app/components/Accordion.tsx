'use client'

import { useState } from 'react'

// 練習 18: 手風琴 Accordion
export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = [
    {
      title: 'React 是什麼？',
      content: 'React 是一個用於構建用戶界面的 JavaScript 函式庫。它由 Facebook 開發和維護，專注於創建可重用的 UI 組件。'
    },
    {
      title: 'useState Hook 如何使用？',
      content: 'useState 是 React 的一個 Hook，用於在函數組件中添加狀態。它返回一個狀態變量和一個更新該狀態的函數。'
    },
    {
      title: 'useEffect 的作用是什麼？',
      content: 'useEffect 用於處理副作用，如數據獲取、訂閱或手動更改 DOM。它在組件渲染後執行，可以替代類組件中的生命週期方法。'
    },
    {
      title: '什麼是 Props？',
      content: 'Props（屬性）是父組件傳遞給子組件的數據。它們是只讀的，子組件不應該直接修改 props。'
    },
    {
      title: 'React 的虛擬 DOM 是什麼？',
      content: '虛擬 DOM 是真實 DOM 的輕量級副本。React 使用它來提高性能，通過比較虛擬 DOM 的變化來最小化真實 DOM 的更新。'
    }
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="p-6 border-2 border-sky-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📋 手風琴 Accordion</h2>

      <div className="max-w-2xl mx-auto space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <span className="font-medium text-left text-gray-800 dark:text-white">
                {item.title}
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：展開/收起動畫、狀態管理、過渡效果
      </div>
    </div>
  )
}
