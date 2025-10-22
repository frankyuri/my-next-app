'use client'

import { useState } from 'react'
import { Card, PageTitle, Button, Input, StatCard, EmptyState, LearningPoints, Badge } from './shared/UIComponents'

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
          <Card className="sticky top-6">
            <PageTitle icon="💰">記帳本</PageTitle>

            {/* 總金額 */}
            <div className="mb-6">
              <StatCard label="總支出" value={`$${totalAmount.toLocaleString()}`} color="purple" />
            </div>

            {/* 表單 */}
            <div className="space-y-4 mb-6">
              <Input
                value={description}
                onChange={setDescription}
                placeholder="支出描述..."
              />
              <Input
                type="number"
                value={amount}
                onChange={setAmount}
                placeholder="金額"
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
              <Button onClick={addExpense} fullWidth size="lg">
                新增支出
              </Button>
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
          </Card>
        </div>

        {/* 右側：支出列表 */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                支出記錄
              </h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilter('all')}
                  variant={filter === 'all' ? 'primary' : 'secondary'}
                  size="sm"
                >
                  全部
                </Button>
                {categories.map(cat => (
                  <Button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    variant={filter === cat ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    {getCategoryIcon(cat)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredExpenses.length === 0 ? (
                <EmptyState icon="📝" message="還沒有支出記錄" />
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
                        <div className="flex gap-2 mt-1">
                          <Badge color="blue">{expense.category}</Badge>
                          <Badge color="gray">{expense.date}</Badge>
                        </div>
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
          </Card>
        </div>
      </div>

      <LearningPoints
        points={[
          '• <strong>reduce 方法</strong>：計算總金額和分類統計',
          '• <strong>雙欄佈局</strong>：左側表單，右側列表',
          '• <strong>分類過濾</strong>：按類別篩選支出',
          '• <strong>數字格式化</strong>：toLocaleString 千分位顯示',
          '• <strong>sticky 定位</strong>：表單固定在視窗中',
        ]}
      />
    </div>
  )
}
