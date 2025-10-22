'use client'

import { useState } from 'react'

// 練習 6: API 請求 - 隨機用戶資料
// 使用公開的 Random User API
interface User {
  name: {
    first: string
    last: string
  }
  email: string
  picture: {
    large: string
  }
  location: {
    country: string
    city: string
  }
}

export default function FetchUserData() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUser = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (!response.ok) throw new Error('請求失敗')
      const data = await response.json()
      setUser(data.results[0])
    } catch (err) {
      setError('獲取用戶資料失敗，請重試')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 border-2 border-purple-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">API 請求練習 - 隨機用戶</h2>
      
      <button 
        onClick={fetchUser}
        disabled={loading}
        className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
      >
        {loading ? '載入中...' : '獲取隨機用戶'}
      </button>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded mb-4">
          {error}
        </div>
      )}

      {user && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-6">
            <img 
              src={user.picture.large} 
              alt="User" 
              className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-700 shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {user.name.first} {user.name.last}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                📧 {user.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                📍 {user.location.city}, {user.location.country}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：fetch API、async/await、loading 狀態、錯誤處理
      </div>
    </div>
  )
}
