'use client'

import { useState, useEffect } from 'react'

interface Note {
  id: number
  title: string
  content: string
  color: string
  createdAt: Date
  pinned: boolean
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedColor, setSelectedColor] = useState('#fef3c7')

  const colors = [
    { name: '黃色', value: '#fef3c7' },
    { name: '粉色', value: '#fce7f3' },
    { name: '藍色', value: '#dbeafe' },
    { name: '綠色', value: '#d1fae5' },
    { name: '紫色', value: '#e9d5ff' },
    { name: '橘色', value: '#fed7aa' },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('sticky-notes')
    if (saved) {
      setNotes(JSON.parse(saved).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt)
      })))
    }
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('sticky-notes', JSON.stringify(notes))
    }
  }, [notes])

  const addNote = () => {
    if (!title.trim() && !content.trim()) return

    const newNote: Note = {
      id: Date.now(),
      title: title.trim() || '無標題',
      content: content.trim(),
      color: selectedColor,
      createdAt: new Date(),
      pinned: false,
    }

    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
    setIsAdding(false)
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const togglePin = (id: number) => {
    setNotes(notes.map(n =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    ))
  }

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          📌 便利貼
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + 新增便利貼
        </button>
      </div>

      {/* 新增便利貼表單 */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              新增便利貼
            </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="標題"
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg mb-3 dark:bg-zinc-700 dark:text-white"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="內容..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg mb-3 dark:bg-zinc-700 dark:text-white"
            />
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">選擇顏色：</p>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${
                      selectedColor === color.value
                        ? 'border-blue-600 scale-110'
                        : 'border-gray-300 dark:border-zinc-600'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addNote}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                新增
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setTitle('')
                  setContent('')
                }}
                className="flex-1 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 便利貼網格 */}
      {notes.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <div className="text-8xl mb-4">📝</div>
          <p className="text-xl">還沒有便利貼</p>
          <p className="text-sm mt-2">點擊「新增便利貼」開始記錄</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedNotes.map(note => (
            <div
              key={note.id}
              className="relative p-5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-rotate-1"
              style={{ backgroundColor: note.color }}
            >
              {note.pinned && (
                <div className="absolute -top-2 -right-2 text-2xl">
                  📌
                </div>
              )}
              
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {note.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {note.createdAt.toLocaleDateString('zh-TW')}
                </p>
              </div>

              <p className="text-gray-800 text-sm mb-4 whitespace-pre-wrap break-words">
                {note.content}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => togglePin(note.id)}
                  className="flex-1 px-3 py-1 bg-white/50 hover:bg-white/70 rounded text-xs font-medium transition-colors"
                  title={note.pinned ? '取消置頂' : '置頂'}
                >
                  {note.pinned ? '📌 已置頂' : '📍 置頂'}
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors"
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 學習要點 */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>localStorage</strong>：持久化儲存便利貼</li>
          <li>• <strong>動態樣式</strong>：inline style 設定背景顏色</li>
          <li>• <strong>置頂功能</strong>：排序時優先顯示置頂項目</li>
          <li>• <strong>Modal 彈窗</strong>：fixed 定位實現遮罩層</li>
          <li>• <strong>Grid 佈局</strong>：響應式多欄顯示</li>
        </ul>
      </div>
    </div>
  )
}
