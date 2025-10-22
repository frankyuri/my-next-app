'use client'

import { useState, useMemo } from 'react'

interface Item {
  id: number
  name: string
  category: string
  tags: string[]
}

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const items: Item[] = [
    { id: 1, name: 'iPhone 15 Pro', category: '手機', tags: ['蘋果', '5G', '高端'] },
    { id: 2, name: 'MacBook Air', category: '筆電', tags: ['蘋果', 'M2', '輕薄'] },
    { id: 3, name: 'iPad Pro', category: '平板', tags: ['蘋果', 'M2', '創作'] },
    { id: 4, name: 'Samsung S24', category: '手機', tags: ['三星', '5G', 'AI'] },
    { id: 5, name: 'Dell XPS 13', category: '筆電', tags: ['Dell', 'Intel', '商務'] },
    { id: 6, name: 'Surface Pro 9', category: '平板', tags: ['微軟', '2合1', '觸控'] },
    { id: 7, name: 'Google Pixel 8', category: '手機', tags: ['Google', 'AI', '攝影'] },
    { id: 8, name: 'Lenovo ThinkPad', category: '筆電', tags: ['Lenovo', '商務', '耐用'] },
  ]

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))]

  // 使用 useMemo 優化過濾性能
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🔍 搜尋與過濾
        </h2>

        {/* 搜尋欄 */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋產品名稱或標籤..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
          />
        </div>

        {/* 分類按鈕 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>

        {/* 結果統計 */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          找到 {filteredItems.length} 個結果
        </div>

        {/* 產品列表 */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              沒有找到符合條件的產品
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>useMemo</strong>：優化複雜的過濾計算</li>
          <li>• <strong>多條件過濾</strong>：同時處理搜尋和分類</li>
          <li>• <strong>陣列方法</strong>：filter, some, includes 組合使用</li>
          <li>• <strong>動態 className</strong>：根據狀態改變樣式</li>
        </ul>
      </div>
    </div>
  )
}
