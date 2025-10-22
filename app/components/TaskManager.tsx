'use client'

import { useState } from 'react'

interface Task {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: '完成專案文件', completed: false, priority: 'high', category: '工作', dueDate: '2025-10-25' },
    { id: 2, text: '學習 TypeScript', completed: false, priority: 'medium', category: '學習', dueDate: '2025-10-30' },
    { id: 3, text: '健身', completed: true, priority: 'low', category: '個人', dueDate: '2025-10-22' },
  ])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date')
  const [view, setView] = useState<'list' | 'grid'>('list')

  const categories = ['工作', '個人', '學習', '購物', '其他']

  const addTask = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      priority: 'medium',
      category: '其他',
      dueDate: new Date().toISOString().split('T')[0],
    }

    setTasks([task, ...tasks])
    setNewTask('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const updatePriority = (id: number, priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(t => t.id === id ? { ...t, priority } : t))
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
    })

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      '工作': '💼',
      '個人': '👤',
      '學習': '📚',
      '購物': '🛒',
      '其他': '📋',
    }
    return icons[category] || '📋'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 統計卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">總任務</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">進行中</p>
          <p className="text-3xl font-bold">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">已完成</p>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90 mb-1">高優先</p>
          <p className="text-3xl font-bold">{stats.highPriority}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          📋 任務管理器
        </h2>

        {/* 輸入框 */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="新增任務..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            新增
          </button>
        </div>

        {/* 工具列 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              進行中
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              已完成
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'date'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              📅 日期
            </button>
            <button
              onClick={() => setSortBy('priority')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'priority'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⚡ 優先級
            </button>
            <button
              onClick={() => setView(view === 'list' ? 'grid' : 'list')}
              className="px-3 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
            >
              {view === 'list' ? '📊' : '📋'}
            </button>
          </div>
        </div>

        {/* 任務列表 */}
        <div className={view === 'grid' ? 'grid md:grid-cols-2 gap-4' : 'space-y-3'}>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p>沒有任務</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 border-2 rounded-lg transition-all ${
                  task.completed
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-zinc-700 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium mb-2 ${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-500'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.text}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded">
                        {getCategoryIcon(task.category)} {task.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded">
                        📅 {task.dueDate}
                      </span>
                      <select
                        value={task.priority}
                        onChange={(e) => updatePriority(task.id, e.target.value as any)}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-700 rounded"
                      >
                        <option value="low">🟢 低</option>
                        <option value="medium">🟡 中</option>
                        <option value="high">🔴 高</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
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
          <li>• <strong>綜合應用</strong>：整合多種功能的完整應用</li>
          <li>• <strong>視圖切換</strong>：列表和網格兩種顯示方式</li>
          <li>• <strong>多條件排序</strong>：日期和優先級排序</li>
          <li>• <strong>內聯編輯</strong>：直接在列表中更改優先級</li>
          <li>• <strong>統計面板</strong>：即時計算和顯示統計數據</li>
        </ul>
      </div>
    </div>
  )
}
