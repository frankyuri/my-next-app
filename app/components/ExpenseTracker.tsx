'use client'

import { useState } from 'react'

interface Expense {
  id: number
  description: string
  amount: number
  category: string
  date: string
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('食物')
  const [filter, setFilter] = useState('all')

  const categories = ['食物', '交通', '娛樂', '購物', '帳單', '其他']

  const addExpense = () => {
    if (!description.trim() || !amount) return

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    }

    setExpenses([newExpense, ...expenses])
    setDescription('')
    setAmount('')
  }

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const filteredExpenses = filter === 'all'
    ? expenses
    : expenses.filter(e => e.category === filter)

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)

  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  }))

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      '食物': '🍔',
      '交通': '🚗',
      '娛樂': '🎮',
      '購物': '🛍️',
      '帳單': '💳',
      '其他': '📦',
    }
    return icons[category] || '📦'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左側：輸入表單 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💰 記帳本
            </h2>

            {/* 總金額 */}
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
              <p className="text-sm opacity-90 mb-1">總支出</p>
              <p className="text-3xl font-bold">${totalAmount.toLocaleString()}</p>
            </div>

            {/* 表單 */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="支出描述..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="金額"
                className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                ))}
              </select>
              <button
                onClick={addExpense}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                新增支出
              </button>
            </div>

            {/* 分類統計 */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">分類統計</h3>
              <div className="space-y-2">
                {categoryTotals.map(({ category, total }) => (
                  <div key={category} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-zinc-700 rounded">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {getCategoryIcon(category)} {category}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右側：支出列表 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                支出記錄
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  全部
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      filter === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="text-6xl mb-4">📝</div>
                  <p>還沒有支出記錄</p>
                </div>
              ) : (
                filteredExpenses.map(expense => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-3xl">{getCategoryIcon(expense.category)}</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {expense.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {expense.category} • {expense.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        -${expense.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>reduce 方法</strong>：計算總金額和分類統計</li>
          <li>• <strong>雙欄佈局</strong>：左側表單，右側列表</li>
          <li>• <strong>分類過濾</strong>：按類別篩選支出</li>
          <li>• <strong>數字格式化</strong>：toLocaleString 千分位顯示</li>
          <li>• <strong>sticky 定位</strong>：表單固定在視窗中</li>
        </ul>
      </div>
    </div>
  )
}
