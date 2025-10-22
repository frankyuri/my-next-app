'use client'

import { useState, useRef, useEffect } from 'react'

interface FileItem {
  id: number
  name: string
  size: number
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
}

export default function FileUploader() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles: FileItem[] = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    }))

    setFiles(prev => [...prev, ...newFiles])

    // 模擬上傳
    newFiles.forEach(file => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: number) => {
    // 更新狀態為上傳中
    setFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, status: 'uploading' as const } : f))
    )

    // 模擬上傳進度
    const interval = setInterval(() => {
      setFiles(prev => {
        const file = prev.find(f => f.id === fileId)
        if (!file || file.progress >= 100) {
          clearInterval(interval)
          return prev.map(f =>
            f.id === fileId
              ? { ...f, progress: 100, status: Math.random() > 0.1 ? 'success' as const : 'error' as const }
              : f
          )
        }

        return prev.map(f =>
          f.id === fileId
            ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 100) }
            : f
        )
      })
    }, 300)
  }

  const removeFile = (fileId: number) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const retryUpload = (fileId: number) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === fileId
          ? { ...f, progress: 0, status: 'pending' as const }
          : f
      )
    )
    simulateUpload(fileId)
  }

  const clearAll = () => {
    setFiles([])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'uploading': return '⬆️'
      case 'success': return '✅'
      case 'error': return '❌'
      default: return '📄'
    }
  }

  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length
  const uploadingCount = files.filter(f => f.status === 'uploading').length

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📤 檔案上傳器
        </h2>

        {/* 統計 */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">上傳中</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {uploadingCount}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">成功</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {successCount}
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">失敗</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {errorCount}
              </p>
            </div>
          </div>
        )}

        {/* 拖放區域 */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
              : 'border-gray-300 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-zinc-700/50'
          }`}
        >
          <div className="text-6xl mb-4">📁</div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            拖放檔案到這裡
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            或點擊選擇檔案
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            支援任何檔案類型，最大 100MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* 檔案列表 */}
        {files.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                檔案列表 ({files.length})
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                清除全部
              </button>
            </div>

            <div className="space-y-3">
              {files.map(file => (
                <div
                  key={file.id}
                  className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getStatusIcon(file.status)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {file.status === 'error' && (
                        <button
                          onClick={() => retryUpload(file.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          重試
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        刪除
                      </button>
                    </div>
                  </div>

                  {/* 進度條 */}
                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>上傳中...</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>拖放 API</strong>：處理 dragOver, dragLeave, drop 事件</li>
          <li>• <strong>File API</strong>：讀取檔案資訊</li>
          <li>• <strong>進度模擬</strong>：使用 setInterval 更新進度</li>
          <li>• <strong>多檔案處理</strong>：批次上傳和管理</li>
          <li>• <strong>錯誤處理</strong>：重試機制</li>
        </ul>
      </div>
    </div>
  )
}
