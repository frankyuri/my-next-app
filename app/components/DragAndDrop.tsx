'use client'

import { useState } from 'react'

// 練習 24: 拖放排序
export default function DragAndDrop() {
  const [items, setItems] = useState([
    { id: 1, text: '學習 React', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 2, text: '練習 TypeScript', color: 'bg-green-100 dark:bg-green-900/20' },
    { id: 3, text: '寫個人專案', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
    { id: 4, text: '準備面試', color: 'bg-purple-100 dark:bg-purple-900/20' },
    { id: 5, text: '找工作', color: 'bg-pink-100 dark:bg-pink-900/20' },
  ])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleDragStart = (id: number) => {
    setDraggedItem(id)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const draggedIndex = items.findIndex(item => item.id === draggedItem)
    if (draggedIndex === index) return

    const newItems = [...items]
    const draggedItemData = newItems[draggedIndex]
    newItems.splice(draggedIndex, 1)
    newItems.splice(index, 0, draggedItemData)
    setItems(newItems)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="p-6 border-2 border-indigo-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🎯 拖放排序</h2>

      <div className="max-w-md mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          拖動項目來重新排序
        </p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`${item.color} p-4 rounded-lg cursor-move hover:shadow-lg transition-shadow flex items-center gap-3`}
            >
              <span className="text-2xl">☰</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {index + 1}. {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：拖放 API、陣列重排、即時更新
      </div>
    </div>
  )
}
