'use client'

import { useState } from 'react'

// 練習 25: 標籤輸入
export default function TagInput() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Next.js'])
  const [input, setInput] = useState('')

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()])
      setInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const suggestedTags = ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Python', 'Git']

  return (
    <div className="p-6 border-2 border-cyan-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🏷️ 標籤輸入</h2>

      <div className="max-w-2xl mx-auto">
        {/* 標籤顯示 */}
        <div className="border-2 border-gray-300 dark:border-zinc-700 rounded-lg p-3 mb-4 min-h-[120px]">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入標籤後按 Enter"
            className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
          />
        </div>

        {/* 建議標籤 */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">建議標籤：</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags
              .filter(tag => !tags.includes(tag))
              .map(tag => (
                <button
                  key={tag}
                  onClick={() => setTags([...tags, tag])}
                  className="px-3 py-1 border border-cyan-500 text-cyan-600 dark:text-cyan-400 rounded-full hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                >
                  + {tag}
                </button>
              ))}
          </div>
        </div>

        {/* 統計 */}
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          已選擇 <strong className="text-cyan-600 dark:text-cyan-400">{tags.length}</strong> 個標籤
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：鍵盤事件、陣列操作、動態輸入
      </div>
    </div>
  )
}
