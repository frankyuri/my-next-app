'use client'

import { useState, useEffect } from 'react'

// 練習 13: 分頁功能 - 大量數據展示
interface Post {
  id: number
  title: string
  body: string
}

export default function Pagination() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data.slice(0, 30)) // 只取前 30 筆
    } catch (error) {
      console.error('獲取文章失敗', error)
    } finally {
      setLoading(false)
    }
  }

  // 計算當前頁面的文章
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // 計算總頁數
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // 生成頁碼
  const getPageNumbers = () => {
    const pages = []
    const maxButtons = 5

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="p-6 border-2 border-cyan-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 border-2 border-cyan-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📄 分頁功能</h2>

      {/* 文章列表 */}
      <div className="space-y-4 mb-6">
        {currentPosts.map(post => (
          <div key={post.id} className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                {post.id}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {post.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分頁控制 */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          顯示 {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, posts.length)} 筆，共 {posts.length} 筆
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {/* 上一頁 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 上一頁
          </button>

          {/* 頁碼 */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`px-4 py-2 rounded transition-colors ${
                page === currentPage
                  ? 'bg-cyan-500 text-white font-bold'
                  : page === '...'
                  ? 'bg-transparent text-gray-600 dark:text-gray-400 cursor-default'
                  : 'bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-600'
              }`}
            >
              {page}
            </button>
          ))}

          {/* 下一頁 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一頁 →
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：分頁邏輯、數據切片、動態頁碼生成、用戶體驗優化
      </div>
    </div>
  )
}
