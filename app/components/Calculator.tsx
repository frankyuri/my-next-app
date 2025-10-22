'use client'

import { useState } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue = currentValue

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue
          break
        case '-':
          newValue = currentValue - inputValue
          break
        case '×':
          newValue = currentValue * inputValue
          break
        case '÷':
          newValue = currentValue / inputValue
          break
        case '%':
          newValue = currentValue % inputValue
          break
      }

      const calculation = `${currentValue} ${operation} ${inputValue} = ${newValue}`
      setHistory([calculation, ...history.slice(0, 9)])
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const buttons = [
    ['C', '÷', '×', '←'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '%'],
    ['0', '.', '=', '='],
  ]

  const getButtonClass = (btn: string) => {
    const base = 'text-xl font-semibold rounded-lg transition-all active:scale-95'
    
    if (btn === 'C') return `${base} bg-red-600 text-white hover:bg-red-700`
    if (btn === '←') return `${base} bg-gray-600 text-white hover:bg-gray-700`
    if (['+', '-', '×', '÷', '%', '='].includes(btn)) {
      return `${base} bg-blue-600 text-white hover:bg-blue-700 ${btn === '=' ? 'col-span-2' : ''}`
    }
    return `${base} bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600`
  }

  const handleClick = (btn: string) => {
    if (btn >= '0' && btn <= '9') {
      inputDigit(btn)
    } else if (btn === '.') {
      inputDecimal()
    } else if (btn === 'C') {
      clear()
    } else if (btn === '←') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
    } else if (btn === '=') {
      performOperation('=')
      setOperation(null)
    } else {
      performOperation(btn)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* 計算器 */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔢 計算機
          </h2>

          {/* 顯示屏 */}
          <div className="mb-4 p-6 bg-gray-900 rounded-lg">
            <div className="text-right">
              {operation && previousValue !== null && (
                <div className="text-sm text-gray-400 mb-1">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-4xl font-mono text-white overflow-x-auto">
                {display}
              </div>
            </div>
          </div>

          {/* 按鈕網格 */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((btn, index) => (
              btn ? (
                <button
                  key={index}
                  onClick={() => handleClick(btn)}
                  className={getButtonClass(btn)}
                  style={{ padding: '1rem' }}
                >
                  {btn}
                </button>
              ) : null
            ))}
          </div>
        </div>

        {/* 歷史記錄 */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📜 計算歷史
          </h3>
          
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">📝</div>
              <p>還沒有計算記錄</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((calc, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-zinc-700 rounded-lg font-mono text-sm text-gray-900 dark:text-white"
                >
                  {calc}
                </div>
              ))}
            </div>
          )}

          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="w-full mt-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              清除歷史
            </button>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>狀態管理</strong>：處理多個相關狀態（顯示、運算符、等待輸入）</li>
          <li>• <strong>運算邏輯</strong>：實現基本四則運算</li>
          <li>• <strong>條件樣式</strong>：不同按鈕類型的樣式</li>
          <li>• <strong>歷史記錄</strong>：陣列操作保存計算過程</li>
          <li>• <strong>Grid 佈局</strong>：計算機按鈕排列</li>
        </ul>
      </div>
    </div>
  )
}
