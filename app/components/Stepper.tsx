'use client'

import { useState } from 'react'

interface Step {
  id: number
  title: string
  content: string
  icon: string
}

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const steps: Step[] = [
    {
      id: 0,
      title: '個人資訊',
      content: '請填寫您的基本資料',
      icon: '👤',
    },
    {
      id: 1,
      title: '聯絡方式',
      content: '請提供您的聯絡資訊',
      icon: '📧',
    },
    {
      id: 2,
      title: '地址資訊',
      content: '請填寫您的地址',
      icon: '🏠',
    },
    {
      id: 3,
      title: '確認提交',
      content: '請確認所有資訊無誤',
      icon: '✓',
    },
  ]

  const goToStep = (step: number) => {
    if (step <= currentStep || completedSteps.has(step - 1)) {
      setCurrentStep(step)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(new Set([...completedSteps, currentStep]))
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setCompletedSteps(new Set())
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          📝 步驟導航器
        </h2>

        {/* 步驟指示器 */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  {/* 步驟圓圈 */}
                  <button
                    onClick={() => goToStep(index)}
                    disabled={index > currentStep && !completedSteps.has(index - 1)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                      index === currentStep
                        ? 'bg-blue-600 text-white scale-110 shadow-lg'
                        : completedSteps.has(index)
                        ? 'bg-green-600 text-white'
                        : index < currentStep
                        ? 'bg-gray-300 dark:bg-zinc-600 text-gray-600 dark:text-gray-400'
                        : 'bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-600'
                    } ${index <= currentStep || completedSteps.has(index - 1) ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}
                  >
                    {completedSteps.has(index) ? '✓' : step.icon}
                  </button>
                  
                  {/* 步驟標題 */}
                  <p className={`mt-3 text-sm font-medium text-center ${
                    index === currentStep
                      ? 'text-blue-600 dark:text-blue-400'
                      : completedSteps.has(index)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>

                {/* 連接線 */}
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded transition-all ${
                    completedSteps.has(index) || index < currentStep
                      ? 'bg-green-600'
                      : 'bg-gray-200 dark:bg-zinc-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 步驟內容 */}
        <div className="min-h-[300px] mb-8">
          <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {steps[currentStep].content}
              </p>
            </div>

            {/* 模擬表單內容 */}
            <div className="max-w-md mx-auto space-y-4">
              {currentStep === 0 && (
                <>
                  <input
                    type="text"
                    placeholder="姓名"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                  <input
                    type="date"
                    placeholder="生日"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                </>
              )}
              {currentStep === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="電話"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="城市"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                  <textarea
                    placeholder="詳細地址"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
                  />
                </>
              )}
              {currentStep === 3 && (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    所有步驟已完成！
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 導航按鈕 */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← 上一步
          </button>

          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors font-medium"
          >
            重置
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => alert('提交成功！')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              提交 ✓
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              下一步 →
            </button>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>步驟管理</strong>：追蹤當前和已完成步驟</li>
          <li>• <strong>Set 資料結構</strong>：儲存已完成步驟</li>
          <li>• <strong>條件導航</strong>：只能前往已完成的步驟</li>
          <li>• <strong>動態樣式</strong>：根據步驟狀態改變外觀</li>
          <li>• <strong>漸進式表單</strong>：分步驟收集資訊</li>
        </ul>
      </div>
    </div>
  )
}
