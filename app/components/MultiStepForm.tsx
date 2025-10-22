'use client'

import { useState } from 'react'

// 練習 14: 多步驟表單 - 複雜表單管理
interface FormData {
  // 步驟 1: 基本資料
  name: string
  email: string
  phone: string
  // 步驟 2: 地址資訊
  address: string
  city: string
  zipCode: string
  // 步驟 3: 偏好設定
  interests: string[]
  newsletter: boolean
  notifications: boolean
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    interests: [],
    newsletter: false,
    notifications: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 3

  const interestOptions = ['前端開發', '後端開發', 'UI/UX 設計', '資料科學', '機器學習', '區塊鏈']

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.address && formData.city && formData.zipCode
      case 3:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep()) {
      setSubmitted(true)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      interests: [],
      newsletter: false,
      notifications: false,
    })
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="p-6 border-2 border-emerald-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📝 多步驟表單</h2>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">✅ 提交成功！</h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div>
              <strong>姓名：</strong> {formData.name}
            </div>
            <div>
              <strong>Email：</strong> {formData.email}
            </div>
            <div>
              <strong>電話：</strong> {formData.phone}
            </div>
            <div>
              <strong>地址：</strong> {formData.address}, {formData.city} {formData.zipCode}
            </div>
            <div>
              <strong>興趣：</strong> {formData.interests.join(', ') || '未選擇'}
            </div>
            <div>
              <strong>訂閱電子報：</strong> {formData.newsletter ? '是' : '否'}
            </div>
            <div>
              <strong>通知：</strong> {formData.notifications ? '開啟' : '關閉'}
            </div>
          </div>
          <button
            onClick={resetForm}
            className="mt-6 w-full px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            重新填寫
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 border-2 border-emerald-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📝 多步驟表單</h2>

      {/* 步驟指示器 */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step === currentStep
                ? 'bg-emerald-500 text-white'
                : step < currentStep
                ? 'bg-emerald-300 text-white'
                : 'bg-gray-300 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
            }`}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < totalSteps && (
              <div className={`flex-1 h-1 mx-2 ${
                step < currentStep ? 'bg-emerald-300' : 'bg-gray-300 dark:bg-zinc-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* 步驟內容 */}
      <div className="min-h-[300px]">
        {/* 步驟 1: 基本資料 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">步驟 1: 基本資料</h3>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">姓名 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                placeholder="請輸入您的姓名"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">電話 *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                placeholder="0912-345-678"
              />
            </div>
          </div>
        )}

        {/* 步驟 2: 地址資訊 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">步驟 2: 地址資訊</h3>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">地址 *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                placeholder="請輸入詳細地址"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">城市 *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  placeholder="台北市"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">郵遞區號 *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        )}

        {/* 步驟 3: 偏好設定 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">步驟 3: 偏好設定</h3>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-3">興趣領域（可複選）</label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(interest => (
                  <label key={interest} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 dark:text-gray-300">訂閱電子報</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 dark:text-gray-300">接收通知</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 控制按鈕 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-300 dark:bg-zinc-700 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 上一步
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!validateStep()}
            className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一步 →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            提交 ✓
          </button>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：多步驟流程、表單驗證、狀態持久化、進度指示
      </div>
    </div>
  )
}
