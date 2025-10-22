'use client'

import { useState } from 'react'

// 練習 19: Modal 彈窗
export default function ModalComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'info' | 'warning' | 'success' | 'error'>('info')

  const openModal = (type: typeof modalType) => {
    setModalType(type)
    setIsOpen(true)
  }

  const modalStyles = {
    info: { color: 'blue', icon: 'ℹ️', title: '提示訊息' },
    warning: { color: 'yellow', icon: '⚠️', title: '警告' },
    success: { color: 'green', icon: '✓', title: '成功' },
    error: { color: 'red', icon: '✕', title: '錯誤' }
  }

  const style = modalStyles[modalType]

  return (
    <div className="p-6 border-2 border-fuchsia-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🪟 Modal 彈窗</h2>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => openModal('info')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          訊息彈窗
        </button>
        <button
          onClick={() => openModal('warning')}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          警告彈窗
        </button>
        <button
          onClick={() => openModal('success')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          成功彈窗
        </button>
        <button
          onClick={() => openModal('error')}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          錯誤彈窗
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 遮罩 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal 內容 */}
          <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div className={`px-6 py-4 border-b border-gray-200 dark:border-zinc-700 bg-${style.color}-50 dark:bg-${style.color}-900/20`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{style.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {style.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                這是一個 {modalType} 類型的彈窗。你可以在這裡放置任何內容，
                比如表單、圖片、或者其他組件。
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                點擊背景或關閉按鈕可以關閉彈窗。
              </p>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-700 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded"
              >
                取消
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 bg-${style.color}-500 text-white rounded hover:bg-${style.color}-600`}
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：Portal、遮罩層、彈窗動畫、事件冒泡阻止
      </div>
    </div>
  )
}
