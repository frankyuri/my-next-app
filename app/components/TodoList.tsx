'use client'

import { useState, useEffect } from 'react'
import Logger from './shared/logger'

// 練習 2: 待辦事項列表 - 學習列表渲染、表單處理、狀態管理
interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
      Logger.log('新增待辦事項', inputValue, 'TodoList')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
    Logger.log('切換待辦事項狀態, id', id, 'TodoList')
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    Logger.log('刪除待辦事項, id', id, 'TodoList')
  }

  const clearAll = () => {
    setTodos([])
    Logger.log('清空所有待辦事項', undefined, 'TodoList')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 當按下 Backspace 且不在輸入框中時
      if (e.key === 'Backspace' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault() // 防止瀏覽器返回上一頁
        clearAll()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [todos]) // 記得加入依賴

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">待辦事項列表</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="輸入新任務..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          新增
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
        >
          清空
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        總任務數: {todos.length} | 已完成: {todos.filter(t => t.completed).length}
      </p>
    </div>
  )
}
