'use client'

import { useState, useCallback } from 'react'

interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface Task {
  id: string
  content: string
  priority: 'low' | 'medium' | 'high'
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: '待處理',
      tasks: [
        { id: '1', content: '設計首頁 UI', priority: 'high' },
        { id: '2', content: '實作登入功能', priority: 'medium' },
      ],
    },
    {
      id: 'inprogress',
      title: '進行中',
      tasks: [
        { id: '3', content: '開發 API 端點', priority: 'high' },
      ],
    },
    {
      id: 'done',
      title: '已完成',
      tasks: [
        { id: '4', content: '專案初始化', priority: 'low' },
      ],
    },
  ])

  const [draggedTask, setDraggedTask] = useState<{ task: Task; fromColumn: string } | null>(null)

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, fromColumn: columnId })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = useCallback((toColumnId: string) => {
    if (!draggedTask) return

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(col => ({ ...col, tasks: [...col.tasks] }))
      
      // 從原欄位移除
      const fromColumn = newColumns.find(col => col.id === draggedTask.fromColumn)
      if (fromColumn) {
        fromColumn.tasks = fromColumn.tasks.filter(t => t.id !== draggedTask.task.id)
      }

      // 加入新欄位
      const toColumn = newColumns.find(col => col.id === toColumnId)
      if (toColumn) {
        toColumn.tasks.push(draggedTask.task)
      }

      return newColumns
    })

    setDraggedTask(null)
  }, [draggedTask])

  const addTask = (columnId: string) => {
    const content = prompt('輸入任務內容：')
    if (!content) return

    const newTask: Task = {
      id: Date.now().toString(),
      content,
      priority: 'medium',
    }

    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    )
  }

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
          : col
      )
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300'
      case 'low': return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📋 看板管理
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          拖曳卡片來移動任務狀態
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4"
          >
            {/* 欄位標題 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {column.title}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({column.tasks.length})
                </span>
              </h3>
              <button
                onClick={() => addTask(column.id)}
                className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="新增任務"
              >
                +
              </button>
            </div>

            {/* 任務卡片 */}
            <div className="space-y-3">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className={`p-4 rounded-lg border-2 cursor-move hover:shadow-lg transition-all ${getPriorityColor(task.priority)}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1 font-medium">{task.content}</p>
                    <button
                      onClick={() => deleteTask(column.id, task.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="刪除任務"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-2 text-xs opacity-75">
                    優先級：{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </div>
                </div>
              ))}

              {column.tasks.length === 0 && (
                <div className="text-center py-8 text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg">
                  將任務拖曳到這裡
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 學習要點 */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>拖放 API</strong>：onDragStart, onDragOver, onDrop 事件</li>
          <li>• <strong>狀態管理</strong>：複雜的巢狀陣列更新</li>
          <li>• <strong>useCallback</strong>：優化拖放處理函式</li>
          <li>• <strong>不可變更新</strong>：使用展開運算符複製陣列</li>
          <li>• <strong>條件樣式</strong>：根據優先級顯示不同顏色</li>
        </ul>
      </div>
    </div>
  )
}
