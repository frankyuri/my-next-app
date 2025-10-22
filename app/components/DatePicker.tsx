'use client'

import { useState } from 'react'

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    )
  }

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📅 日期選擇器
        </h2>

        {/* 月份導航 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <span className="text-xl">←</span>
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentMonth.getFullYear()}年 {monthNames[currentMonth.getMonth()]}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* 星期標題 */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日期格子 */}
        <div className="grid grid-cols-7 gap-2">
          {/* 前面的空格 */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* 日期按鈕 */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            return (
              <button
                key={day}
                onClick={() => selectDate(day)}
                className={`
                  aspect-square rounded-lg font-medium transition-all
                  ${isSelected(day)
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : isToday(day)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-900 dark:text-white'
                  }
                `}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* 選擇的日期顯示 */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">選擇的日期：</p>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月 {selectedDate.getDate()}日
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            星期{weekDays[selectedDate.getDay()]}
          </p>
        </div>

        {/* 快速選擇 */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              const today = new Date()
              setSelectedDate(today)
              setCurrentMonth(today)
            }}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            今天
          </button>
          <button
            onClick={() => {
              const tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              setSelectedDate(tomorrow)
              setCurrentMonth(tomorrow)
            }}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            明天
          </button>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Date 物件</strong>：JavaScript 日期處理</li>
          <li>• <strong>Calendar 邏輯</strong>：計算月份天數和起始星期</li>
          <li>• <strong>條件樣式</strong>：今天、選中、懸停狀態</li>
          <li>• <strong>Grid 佈局</strong>：7 列日曆排列</li>
        </ul>
      </div>
    </div>
  )
}
