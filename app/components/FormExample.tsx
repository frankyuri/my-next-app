'use client'

import { useState, FormEvent, ChangeEvent, useEffect } from 'react'

// 練習 5: 表單處理 - 學習受控組件
interface FormData {
  name: string
  email: string
  age: string
  gender: string
}

interface FormErrors {
  name?: string
  email?: string
  age?: string
}

export default function FormExample() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    gender: 'male'
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    // 姓名驗證
    if (!formData.name.trim()) {
      newErrors.name = '姓名為必填項目'
    } else if (formData.name.length < 2) {
      newErrors.name = '姓名至少需要 2 個字'
    }
    // Email 驗證
    if (!formData.email.trim()) {
      newErrors.email = 'Email 為必填項目'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email 格式不正確'
    }
    // 年齡驗證
    if (formData.age) {
      const ageNum = parseInt(formData.age)
      if (ageNum < 0 || ageNum > 150) {
        newErrors.age = '年齡必須在 0-150 之間'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let finalValue = value

    // 年齡自動修正
    if (name === 'age' && value) {
      const numValue = parseInt(value)

      finalValue = numValue.toString()
      // 限制範圍在 0-150 之間
      if (numValue < 0) finalValue = '0'
      if (numValue > 150) finalValue = '150'
    }
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      console.log('表單提交成功:', formData)
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({})
      }, 3000) // 3秒後執行

      return () => clearTimeout(timer) // 清理定時器
    }
  }, [errors]) // 當 errors 改變時觸發

  const reset = () => {
    setFormData({ name: '', email: '', age: '', gender: 'male' })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">表單練習</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto space-y-4">
          {/* 姓名欄位 */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              姓名: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white ${errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-zinc-700'
                }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">⚠️ {errors.name}</p>
            )}
          </div>

          {/* Email 欄位 */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white ${errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-zinc-700'
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">⚠️ {errors.email}</p>
            )}
          </div>

          {/* 年齡欄位 */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">年齡:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 dark:bg-zinc-800 dark:text-white ${errors.age
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 dark:border-zinc-700'
                }`}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-500">⚠️ {errors.age}</p>
            )}
          </div>

          {/* 性別欄位 */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">性別:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">其他</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
          >
            提交
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">✅ 提交成功！</h3>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>姓名:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>年齡:</strong> {formData.age || '未提供'}</p>
            <p><strong>性別:</strong> {formData.gender === 'male' ? '男性' : formData.gender === 'female' ? '女性' : '其他'}</p>
          </div>
          <button
            onClick={reset}
            className="mt-4 w-full px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            重新填寫
          </button>
        </div>
      )}
    </div>
  )
}
