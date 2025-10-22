'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

// 練習 5: 表單處理 - 學習受控組件
interface FormData {
  name: string
  email: string
  age: string
  gender: string
}

export default function FormExample() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    gender: 'male'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reset = () => {
    setFormData({ name: '', email: '', age: '', gender: 'male' })
    setSubmitted(false)
  }

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">表單練習</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">姓名:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">年齡:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
          </div>
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
