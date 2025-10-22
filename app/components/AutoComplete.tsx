'use client'

import { useState, useRef, useEffect } from 'react'

export default function AutoComplete() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const allSuggestions = [
    'React', 'React Native', 'Redux', 'React Router', 'React Query',
    'Next.js', 'Nuxt.js', 'Node.js', 'Nest.js',
    'JavaScript', 'TypeScript', 'Java', 'Python',
    'Vue.js', 'Angular', 'Svelte', 'Solid.js',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Azure',
    'Git', 'GitHub', 'GitLab', 'Bitbucket',
  ]

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = allSuggestions.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    )
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    setSelectedIndex(-1)
  }, [inputValue])

  // 點擊外部關閉建議列表
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🔎 自動完成輸入
        </h2>

        {/* 輸入框與建議列表 */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(suggestions.length > 0)}
            placeholder="搜尋技術關鍵字..."
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-zinc-600 rounded-lg focus:border-blue-500 dark:bg-zinc-700 dark:text-white"
          />

          {/* 建議列表 */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  onClick={() => selectSuggestion(suggestion)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-600'
                  }`}
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    {suggestion.substring(0, suggestion.toLowerCase().indexOf(inputValue.toLowerCase()))}
                    <span className="bg-yellow-200 dark:bg-yellow-600">
                      {suggestion.substring(
                        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()),
                        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) + inputValue.length
                      )}
                    </span>
                    {suggestion.substring(suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) + inputValue.length)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 當前選擇 */}
        {inputValue && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">當前輸入：</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {inputValue}
            </p>
          </div>
        )}

        {/* 快捷鍵提示 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-zinc-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ⌨️ 快捷鍵
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div>↑ ↓ 選擇項目</div>
            <div>Enter 確認選擇</div>
            <div>Esc 關閉列表</div>
            <div>點擊外部 關閉</div>
          </div>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>useRef</strong>：管理 DOM 元素引用</li>
          <li>• <strong>鍵盤事件</strong>：方向鍵導航和 Enter 選擇</li>
          <li>• <strong>點擊外部檢測</strong>：關閉下拉列表</li>
          <li>• <strong>高亮匹配文字</strong>：視覺化搜尋結果</li>
          <li>• <strong>鍵盤可訪問性</strong>：完整的鍵盤操作支援</li>
        </ul>
      </div>
    </div>
  )
}
