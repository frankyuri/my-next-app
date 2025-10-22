'use client'

import { useState, useEffect } from 'react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  timestamp: Date
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: '新訊息',
      message: '你有一則新的留言',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 2,
      title: '操作成功',
      message: '你的檔案已成功上傳',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 3,
      title: '注意',
      message: '你的儲存空間即將用完',
      type: 'warning',
      read: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ])

  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read)

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const addRandomNotification = () => {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error']
    const messages = [
      { title: '系統更新', message: '有新版本可用' },
      { title: '好友請求', message: '小明想要加你為好友' },
      { title: '訂單通知', message: '你的訂單已出貨' },
      { title: '提醒', message: '會議將在 15 分鐘後開始' },
    ]

    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    const newNotification: Notification = {
      id: Date.now(),
      ...randomMessage,
      type: randomType,
      read: false,
      timestamp: new Date(),
    }

    setNotifications(prev => [newNotification, ...prev])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return 'ℹ️'
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return '📢'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
      case 'success': return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
      case 'error': return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700'
      default: return 'bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600'
    }
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return '剛剛'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} 分鐘前`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} 小時前`
    const days = Math.floor(hours / 24)
    return `${days} 天前`
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* 標題欄 */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">🔔 通知中心</h2>
              <p className="text-sm opacity-90">
                {unreadCount > 0 ? `${unreadCount} 則未讀通知` : '沒有未讀通知'}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <span className="text-2xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 工具列 */}
        <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
              }`}
            >
              全部 ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600'
              }`}
            >
              未讀 ({unreadCount})
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              全部標為已讀
            </button>
            <button
              onClick={addRandomNotification}
              className="px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
            >
              + 新增測試通知
            </button>
          </div>
        </div>

        {/* 通知列表 */}
        <div className="max-h-[500px] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📭</div>
              <p>沒有通知</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-zinc-700">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  } hover:bg-gray-50 dark:hover:bg-zinc-700/50`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0 border`}>
                      <span className="text-xl">{getTypeIcon(notification.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block" />
                          )}
                        </h3>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="刪除"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            標為已讀
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>通知系統</strong>：完整的通知管理功能</li>
          <li>• <strong>過濾功能</strong>：全部/未讀切換</li>
          <li>• <strong>時間格式化</strong>：相對時間顯示（剛剛、5分鐘前）</li>
          <li>• <strong>徽章計數</strong>：未讀數量顯示</li>
          <li>• <strong>批量操作</strong>：全部標為已讀</li>
        </ul>
      </div>
    </div>
  )
}
