'use client'

import { useState } from 'react'

// 練習 16: 密碼強度檢測器
export default function PasswordStrength() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const getStrength = () => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  const strength = getStrength()
  const strengthLabels = ['很弱', '弱', '中等', '強', '很強']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500']

  const checks = [
    { label: '至少 8 個字元', valid: password.length >= 8 },
    { label: '包含大小寫字母', valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: '包含數字', valid: /[0-9]/.test(password) },
    { label: '包含特殊符號', valid: /[^a-zA-Z0-9]/.test(password) },
  ]

  return (
    <div className="p-6 border-2 border-amber-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🔒 密碼強度檢測器</h2>

      <div className="max-w-md mx-auto">
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="輸入密碼..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        {password && (
          <>
            {/* 強度條 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">密碼強度</span>
                <span className={`text-sm font-bold ${strength >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                  {strengthLabels[strength]}
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 檢查列表 */}
            <div className="space-y-2">
              {checks.map((check, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={check.valid ? 'text-green-500' : 'text-gray-400'}>
                    {check.valid ? '✓' : '○'}
                  </span>
                  <span className={`text-sm ${check.valid ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：正則表達式、即時驗證、條件渲染、密碼安全
      </div>
    </div>
  )
}
