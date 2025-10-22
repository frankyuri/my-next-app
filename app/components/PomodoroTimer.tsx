'use client'

import { useState, useEffect } from 'react'

interface Pomodoro {
  id: number
  completedAt: Date
}

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [completedPomodoros, setCompletedPomodoros] = useState<Pomodoro[]>([])

  const workTime = 25
  const breakTime = 5

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // 番茄鐘完成
            if (mode === 'work') {
              setCompletedPomodoros([
                ...completedPomodoros,
                { id: Date.now(), completedAt: new Date() }
              ])
              setMode('break')
              setMinutes(breakTime)
            } else {
              setMode('work')
              setMinutes(workTime)
            }
            setIsActive(false)
            // 播放提示音（可選）
            if (typeof window !== 'undefined') {
              new Audio('/notification.mp3').play().catch(() => {})
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, mode, completedPomodoros])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode('work')
    setMinutes(workTime)
    setSeconds(0)
  }

  const switchMode = (newMode: 'work' | 'break') => {
    setIsActive(false)
    setMode(newMode)
    setMinutes(newMode === 'work' ? workTime : breakTime)
    setSeconds(0)
  }

  const percentage = mode === 'work'
    ? ((workTime * 60 - minutes * 60 - seconds) / (workTime * 60)) * 100
    : ((breakTime * 60 - minutes * 60 - seconds) / (breakTime * 60)) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          🍅 番茄鐘計時器
        </h2>

        {/* 模式切換 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => switchMode('work')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              mode === 'work'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            ⏰ 工作時間 ({workTime}分)
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              mode === 'break'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            ☕ 休息時間 ({breakTime}分)
          </button>
        </div>

        {/* 圓形進度條 */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          <svg className="transform -rotate-90 w-80 h-80">
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="currentColor"
              strokeWidth="20"
              fill="transparent"
              className="text-gray-200 dark:text-zinc-700"
            />
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="currentColor"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 140}`}
              strokeDashoffset={`${2 * Math.PI * 140 * (1 - percentage / 100)}`}
              className={`transition-all duration-1000 ${
                mode === 'work'
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-7xl font-bold text-gray-900 dark:text-white mb-2">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className={`text-xl font-medium ${
              mode === 'work'
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            }`}>
              {mode === 'work' ? '專注工作中' : '休息一下'}
            </div>
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-4 rounded-lg font-bold text-lg transition-colors ${
              isActive
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : mode === 'work'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isActive ? '⏸ 暫停' : '▶ 開始'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold text-lg transition-colors"
          >
            🔄
          </button>
        </div>

        {/* 完成統計 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">今日完成</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {completedPomodoros.length}
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">專注時長</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {completedPomodoros.length * workTime}分
            </p>
          </div>
        </div>

        {/* 完成記錄 */}
        {completedPomodoros.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              完成記錄
            </h3>
            <div className="flex flex-wrap gap-2">
              {completedPomodoros.map((pomodoro) => (
                <div
                  key={pomodoro.id}
                  className="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
                  title={pomodoro.completedAt.toLocaleTimeString()}
                >
                  🍅
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>setInterval</strong>：實現倒數計時</li>
          <li>• <strong>SVG 圓形進度</strong>：strokeDashoffset 動畫</li>
          <li>• <strong>模式切換</strong>：工作和休息狀態管理</li>
          <li>• <strong>時間格式化</strong>：padStart 補零顯示</li>
          <li>• <strong>完成追蹤</strong>：記錄和統計番茄鐘</li>
        </ul>
      </div>
    </div>
  )
}
