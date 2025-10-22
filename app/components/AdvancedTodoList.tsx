'use client'

import { useState, useEffect } from 'react'

interface Task {
  id: number
  text: string
  completed: boolean
  category: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export default function AdvancedTodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date')

  const categories = ['工作', '個人', '學習', '其他']

  useEffect(() => {
    const saved = localStorage.getItem('advanced-todos')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('advanced-todos', JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = () => {
    if (!inputText.trim()) return

    const newTask: Task = {
      id: Date.now(),
      text: inputText,
      completed: false,
      category: selectedCategory === 'all' ? '其他' : selectedCategory,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      priority: selectedPriority,
    }

    setTasks([...tasks, newTask])
    setInputText('')
    setDueDate('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '工作': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      '個人': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      '學習': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      '其他': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    }
    return colors[category] || colors['其他']
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
    .filter(task => selectedCategory === 'all' || task.category === selectedCategory)
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
  }

  const isOverdue = (date: string) => {
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ✅ 進階待辦清單
        </h2>

        {/* 統計卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">總任務</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">進行中</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.active}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">已完成</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
          </div>
        </div>

        {/* 新增任務表單 */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="輸入新任務..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
            />
            <div className="grid grid-cols-3 gap-3">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              >
                <option value="low">低優先級</option>
                <option value="medium">中優先級</option>
                <option value="high">高優先級</option>
              </select>
              <select
                value={selectedCategory === 'all' ? '其他' : selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              onClick={addTask}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              新增任務
            </button>
          </div>
        </div>

        {/* 過濾和排序 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {f === 'all' ? '全部' : f === 'active' ? '進行中' : '已完成'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {['all', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat === 'all' ? '全部' : cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setSortBy('date')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'date'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              📅 日期
            </button>
            <button
              onClick={() => setSortBy('priority')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'priority'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⚡ 優先級
            </button>
          </div>
        </div>

        {/* 任務列表 */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📭</div>
              <p>沒有任務</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 border-2 rounded-lg transition-all ${
                  task.completed
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                    : isOverdue(task.dueDate)
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                    : 'border-gray-200 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {task.text}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '⚡ 高' : task.priority === 'medium' ? '📌 中' : '🌱 低'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded font-medium ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded font-medium ${isOverdue(task.dueDate) ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                        📅 {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold text-xl"
                  >
                    ×
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
          <li>• <strong>localStorage</strong>：持久化儲存任務數據</li>
          <li>• <strong>多條件過濾</strong>：狀態、分類、排序組合</li>
          <li>• <strong>日期處理</strong>：到期日判斷和顯示</li>
          <li>• <strong>複雜狀態</strong>：多個相關狀態的管理</li>
          <li>• <strong>條件樣式</strong>：根據任務狀態動態顯示</li>
        </ul>
      </div>
    </div>
  )
}
