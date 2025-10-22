'use client'

import { useState } from 'react'

// 練習 4: 顏色選擇器 - 學習動態樣式
export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const colors = [
    { name: '藍色', value: '#3b82f6' },
    { name: '紅色', value: '#ef4444' },
    { name: '綠色', value: '#10b981' },
    { name: '紫色', value: '#8b5cf6' },
    { name: '黃色', value: '#f59e0b' },
    { name: '粉色', value: '#ec4899' }
  ]

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">顏色選擇器</h2>
      <div
        style={{ backgroundColor: selectedColor }}
        className="w-full h-32 rounded-lg mb-4 transition-colors duration-300 flex items-center justify-center"
      >
        <span className="text-white text-xl font-bold drop-shadow-lg">
          {colors.find(c => c.value === selectedColor)?.name}
        </span>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">當前顏色: {selectedColor}</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {colors.map(color => (
          <button
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            style={{ backgroundColor: color.value }}
            className={`w-12 h-12 rounded-full transition-transform hover:scale-110 ${selectedColor === color.value ? 'ring-4 ring-black dark:ring-white' : 'ring-2 ring-gray-300'
              }`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
