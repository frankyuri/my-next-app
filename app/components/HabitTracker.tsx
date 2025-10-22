'use client'

import { useState } from 'react'

interface Habit {
  id: number
  name: string
  icon: string
  streak: number
  completedDates: string[]
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: '閱讀 30 分鐘', icon: '📚', streak: 0, completedDates: [] },
    { id: 2, name: '運動', icon: '💪', streak: 0, completedDates: [] },
    { id: 3, name: '冥想', icon: '🧘', streak: 0, completedDates: [] },
    { id: 4, name: '學習程式', icon: '💻', streak: 0, completedDates: [] },
  ])
  const [newHabitName, setNewHabitName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('⭐')

  const icons = ['⭐', '💪', '📚', '🏃', '🎯', '🎨', '🎵', '✍️', '🧘', '💻', '🌱', '☕']

  const today = new Date().toISOString().split('T')[0]

  const toggleHabit = (habitId: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completedDates.includes(today)
        
        if (isCompletedToday) {
          return {
            ...habit,
            completedDates: habit.completedDates.filter(date => date !== today),
            streak: Math.max(0, habit.streak - 1),
          }
        } else {
          return {
            ...habit,
            completedDates: [...habit.completedDates, today],
            streak: habit.streak + 1,
          }
        }
      }
      return habit
    }))
  }

  const addHabit = () => {
    if (!newHabitName.trim()) return

    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName.trim(),
      icon: selectedIcon,
      streak: 0,
      completedDates: [],
    }

    setHabits([...habits, newHabit])
    setNewHabitName('')
  }

  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter(h => h.id !== habitId))
  }

  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const last7Days = getLast7Days()

  const totalCompleted = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0)
  const todayCompleted = habits.filter(h => h.completedDates.includes(today)).length

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ✨ 習慣追蹤器
        </h2>

        {/* 統計卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">總習慣</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {habits.length}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">今日完成</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {todayCompleted}/{habits.length}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">總完成</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {totalCompleted}
            </p>
          </div>
        </div>

        {/* 新增習慣表單 */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg">
          <div className="flex gap-3">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              placeholder="新增習慣..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
            />
            <div className="flex gap-1 overflow-x-auto">
              {icons.map(icon => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`text-2xl p-2 rounded ${
                    selectedIcon === icon
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <button
              onClick={addHabit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              新增
            </button>
          </div>
        </div>

        {/* 習慣列表 */}
        <div className="space-y-4">
          {habits.map(habit => {
            const isCompletedToday = habit.completedDates.includes(today)
            
            return (
              <div
                key={habit.id}
                className="border-2 border-gray-200 dark:border-zinc-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{habit.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {habit.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        🔥 連續 {habit.streak} 天
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        isCompletedToday
                          ? 'bg-green-600 text-white scale-105'
                          : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600'
                      }`}
                    >
                      {isCompletedToday ? '✓ 已完成' : '完成'}
                    </button>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors text-xl"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* 7 天記錄 */}
                <div className="flex gap-2">
                  {last7Days.map((date, index) => {
                    const isCompleted = habit.completedDates.includes(date)
                    const isToday = date === today
                    
                    return (
                      <div
                        key={date}
                        className={`flex-1 h-10 rounded flex items-center justify-center text-xs font-medium transition-all ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isToday
                            ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-zinc-700 text-gray-400'
                        }`}
                      >
                        {isCompleted ? '✓' : new Date(date).getDate()}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {habits.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p>還沒有習慣，開始建立你的第一個習慣吧！</p>
            </div>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>日期處理</strong>：生成最近 7 天的日期陣列</li>
          <li>• <strong>連續天數計算</strong>：追蹤習慣完成記錄</li>
          <li>• <strong>條件樣式</strong>：根據完成狀態顯示不同顏色</li>
          <li>• <strong>陣列操作</strong>：filter 和 reduce 進行統計</li>
          <li>• <strong>Icon 選擇器</strong>：動態選擇 emoji 圖標</li>
        </ul>
      </div>
    </div>
  )
}
