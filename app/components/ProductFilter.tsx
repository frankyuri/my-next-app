'use client'

import { useState, useMemo } from 'react'

// 練習 10: 數據過濾與排序 - 產品列表管理
interface Product {
    id: number
    name: string
    category: string
    price: number
    stock: number
    rating: number
}

const mockProducts: Product[] = [
    { id: 1, name: 'iPhone 15', category: '手機', price: 29900, stock: 15, rating: 4.8 },
    { id: 2, name: 'MacBook Pro', category: '筆電', price: 59900, stock: 8, rating: 4.9 },
    { id: 3, name: 'iPad Air', category: '平板', price: 19900, stock: 20, rating: 4.7 },
    { id: 4, name: 'AirPods Pro', category: '耳機', price: 7990, stock: 30, rating: 4.6 },
    { id: 5, name: 'Apple Watch', category: '穿戴', price: 12900, stock: 12, rating: 4.5 },
    { id: 6, name: 'Samsung S24', category: '手機', price: 26900, stock: 18, rating: 4.7 },
    { id: 7, name: 'Dell XPS', category: '筆電', price: 45900, stock: 5, rating: 4.6 },
    { id: 8, name: 'Sony WH-1000XM5', category: '耳機', price: 9990, stock: 25, rating: 4.8 },
]

export default function ProductFilter() {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    // 使用 useMemo 優化性能
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...mockProducts]

        // 搜尋過濾
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // 分類過濾
        if (categoryFilter !== 'all') {
            result = result.filter(p => p.category === categoryFilter)
        }

        // 排序
        result.sort((a, b) => {
            let comparison = 0
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name)
            } else {
                comparison = a[sortBy] - b[sortBy]
            }
            return sortOrder === 'asc' ? comparison : -comparison
        })

        return result
    }, [searchTerm, categoryFilter, sortBy, sortOrder])

    const categories = Array.from(new Set(mockProducts.map(p => p.category)))

    return (
        <div className="p-6 border-2 border-indigo-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🛍️ 產品列表管理</h2>

            {/* 控制面板 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {/* 搜尋 */}
                <input
                    type="text"
                    placeholder="搜尋產品..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                />

                {/* 分類篩選 */}
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                >
                    <option value="all">所有分類</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* 排序依據 */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                >
                    <option value="name">依名稱</option>
                    <option value="price">依價格</option>
                    <option value="rating">依評分</option>
                </select>

                {/* 排序方向 */}
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                >
                    {sortOrder === 'asc' ? '↑ 升序' : '↓ 降序'}
                </button>
            </div>

            {/* 結果統計 */}
            <div className="mb-4 text-gray-600 dark:text-gray-400">
                找到 <strong className="text-indigo-600 dark:text-indigo-400">{filteredAndSortedProducts.length}</strong> 個產品
            </div>

            {/* 產品列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAndSortedProducts.map(product => (
                    <div key={product.id} className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{product.name}</h3>
                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded">
                                {product.category}
                            </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>💰 價格: <strong className="text-green-600 dark:text-green-400">NT$ {product.price.toLocaleString()}</strong></p>
                            <p>📦 庫存: {product.stock} 件</p>
                            <p>⭐ 評分: {product.rating} / 5.0</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    沒有找到符合條件的產品 😢
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                💡 學習重點：useMemo 性能優化、數據過濾、排序、搜尋功能
            </div>
        </div>
    )
}
