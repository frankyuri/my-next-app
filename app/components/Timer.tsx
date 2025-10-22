'use client'

import { useState, useEffect, useRef } from 'react'

// 練習 11: 倒數計時器 - 綜合計時功能
export default function Timer() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 快速設置時間按鈕
  const quickTimes = [
    { label: '1分鐘', value: 60 },
    { label: '5分鐘', value: 300 },
    { label: '10分鐘', value: 600 },
    { label: '25分鐘', value: 1500 }, // 番茄鐘
  ]

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            // 播放提示音（可選）
            if (typeof window !== 'undefined') {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTUIGWi78OivSxMOVarlx6JiGghDoN3nvHAqBitzy/DZkEQPGnbK8OmhTxEJQ6rm0KNyJAQocMvw35ZICRljv+rlu2ghBCh6y/HajjoKFm3E7+KuXBELSKnh0qRwHwYucMvw34s+ChVvwu7itVkcByhrzfHdlj8LFnHK8uW0XRgKRKXi0KV1IQUrd8zx3I4+CRVuxu/hs2keByV0y/DejzsJFnPK8eiyWhYKSKzo0Kt3IQQrdcrw34Y8ChVsxe/it2gaByV0y/DejjsJFnTK8eexXBYKSKzo0at5IQUrd8zx3I46CRZwx+7htGseBSVzzPDdkzsJFXPK8eiyYRYKR6zo0a58IQUrd8zw3I07CRVuxe/it2geBiRzzvDfkDsJFXHK8uezXxYLSKzo0ax6IQUqd8rw3ow+CRVuxe7jtGgeByRyz/DejzsKFXLK8uiyXxgKSKvo0ax8IQQrdsnw34g+CRVtxe7jtWkeBiRyz/DejjsKFnPK8uizXxcKR6vp0ax+IQQrdsnx3oo9CRZuxe7jtWodByRyz/DfjzsKFnPK8uizXxgKR6zo0KyAIQQrdsnx3oo9CRZuxu7itWoeBiVyz/DfjjwJFnTK8uizXxgKR6zo0KyAIQQrdsvx3oo9CRZuxu7itWodByRzz/DfjjwKFXPK8uizXxgLSKzo0KyAIQQrdsvx3oo9CRZuxu7jtWodByRzz/DfjjwKFXPK8uizXxgLSKzo0KyAIQQrdsvx3oo9CRZuxu7jtWodByRzz/DejjwKFXPL8uiyXxgLSKzo0KyAIQQrdsvx3os9CRZuxu7jtWodByRzz/DfjjwKFXPK8uizXxgLSKzo0KyAIQQrdsvx3os9CRZuxe7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zp0KyAIQQrdsvx3os9CRZuxe7jtWodByR0z/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3os9CRZtxu7jtWodByR0z/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3os9CRZtxu7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zp0KyAIQQrdsvx3os9CRZtxu7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3Ys9CRZtxe7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3Ys9CRZtxe7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3Ys9CRZtxe7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zo0KyAIQQrdsvx3Ys9CRZtxe7jtWodByRzz/DfjjwKFXPK8uizXxgLR6zo0KyA')
              audio.play().catch(() => {}) // 忽略自動播放錯誤
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, totalSeconds])

  // 更新顯示的分秒
  useEffect(() => {
    setMinutes(Math.floor(totalSeconds / 60))
    setSeconds(totalSeconds % 60)
  }, [totalSeconds])

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTotalSeconds(0)
    setMinutes(0)
    setSeconds(0)
  }

  const handleSetTime = (secs: number) => {
    setTotalSeconds(secs)
    setIsRunning(false)
  }

  const handleCustomTime = () => {
    const m = parseInt(prompt('請輸入分鐘數：') || '0')
    const s = parseInt(prompt('請輸入秒數：') || '0')
    if (!isNaN(m) && !isNaN(s)) {
      setTotalSeconds(m * 60 + s)
    }
  }

  const progress = totalSeconds > 0 ? ((totalSeconds / (totalSeconds + 1)) * 100) : 0

  return (
    <div className="p-6 border-2 border-pink-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">⏰ 倒數計時器</h2>

      {/* 時間顯示 */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 mb-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800 dark:text-white font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {totalSeconds === 0 && !isRunning && (
            <div className="text-green-600 dark:text-green-400 text-xl mt-2 animate-pulse">
              ✅ 時間到！
            </div>
          )}
        </div>

        {/* 進度條 */}
        <div className="mt-4 bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
          <div 
            className="bg-pink-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${100 - progress}%` }}
          />
        </div>
      </div>

      {/* 快速設置按鈕 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {quickTimes.map(time => (
          <button
            key={time.value}
            onClick={() => handleSetTime(time.value)}
            disabled={isRunning}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            {time.label}
          </button>
        ))}
      </div>

      {/* 控制按鈕 */}
      <div className="flex gap-3 justify-center flex-wrap">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={totalSeconds === 0}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            ▶️ 開始
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
          >
            ⏸️ 暫停
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
        >
          🔄 重置
        </button>
        <button
          onClick={handleCustomTime}
          disabled={isRunning}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          ⚙️ 自訂
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：useRef、setInterval、計時器管理、useEffect cleanup
      </div>
    </div>
  )
}
