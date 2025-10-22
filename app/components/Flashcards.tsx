'use client'

import { useState } from 'react'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

export default function Flashcards() {
  const [cards] = useState<Question[]>([
    {
      question: 'React 的核心特性是什麼？',
      options: ['虛擬 DOM', '雙向綁定', '模板語法', 'MVC 架構'],
      correctAnswer: 0,
    },
    {
      question: 'useState 返回什麼？',
      options: ['函式', '陣列', '物件', '字串'],
      correctAnswer: 1,
    },
    {
      question: 'useEffect 在什麼時候執行？',
      options: ['渲染之前', '渲染之後', '只在掛載時', '手動呼叫時'],
      correctAnswer: 1,
    },
    {
      question: 'Props 是什麼？',
      options: ['組件內部狀態', '組件間傳遞的數據', '生命週期方法', 'CSS 樣式'],
      correctAnswer: 1,
    },
    {
      question: 'key 屬性的用途是什麼？',
      options: ['樣式設定', '事件處理', '列表元素識別', '路由導航'],
      correctAnswer: 2,
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set())

  const currentCard = cards[currentIndex]

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const nextCard = () => {
    setIsFlipped(false)
    setCurrentIndex((currentIndex + 1) % cards.length)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length)
  }

  const markAsMastered = () => {
    setMasteredCards(new Set([...masteredCards, currentIndex]))
    nextCard()
  }

  const resetProgress = () => {
    setMasteredCards(new Set())
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🎴 記憶卡片
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">進度</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {masteredCards.size} / {cards.length}
            </p>
          </div>
        </div>

        {/* 進度條 */}
        <div className="mb-8">
          <div className="flex gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  masteredCards.has(index)
                    ? 'bg-green-500'
                    : index === currentIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-200 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 卡片容器 */}
        <div className="perspective-1000 mb-8">
          <div
            onClick={flipCard}
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 正面 */}
            <div
              className={`absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center ${
                isFlipped ? 'invisible' : 'visible'
              }`}
            >
              <div className="text-6xl mb-6">❓</div>
              <p className="text-3xl font-bold text-white text-center mb-4">
                {currentCard.question}
              </p>
              <p className="text-sm text-white/80 mt-4">點擊查看答案</p>
            </div>

            {/* 背面 */}
            <div
              className={`absolute inset-0 backface-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 ${
                isFlipped ? 'visible' : 'invisible'
              }`}
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4 text-center">✅</div>
                <p className="text-xl font-semibold text-white mb-4 text-center">答案：</p>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-2xl font-bold text-white text-center">
                    {currentCard.options[currentCard.correctAnswer]}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/90 font-semibold">所有選項：</p>
                  {currentCard.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        index === currentCard.correctAnswer
                          ? 'bg-white/30'
                          : 'bg-white/10'
                      }`}
                    >
                      <span className="text-white text-sm">
                        {index === currentCard.correctAnswer ? '✓ ' : '• '}
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevCard}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ← 上一張
          </button>

          <div className="flex gap-3">
            <button
              onClick={resetProgress}
              className="px-4 py-3 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
            >
              🔄
            </button>
            {isFlipped && !masteredCards.has(currentIndex) && (
              <button
                onClick={markAsMastered}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                ✓ 已掌握
              </button>
            )}
          </div>

          <button
            onClick={nextCard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            下一張 →
          </button>
        </div>

        {/* 卡片計數 */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          卡片 {currentIndex + 1} / {cards.length}
          {masteredCards.has(currentIndex) && (
            <span className="ml-2 text-green-600 dark:text-green-400">✓ 已掌握</span>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>3D 翻轉效果</strong>：CSS transform 和 rotateY</li>
          <li>• <strong>Set 資料結構</strong>：追蹤已掌握的卡片</li>
          <li>• <strong>循環導航</strong>：使用 % 運算符實現循環</li>
          <li>• <strong>條件渲染</strong>：根據翻轉狀態顯示不同內容</li>
          <li>• <strong>進度追蹤</strong>：視覺化顯示學習進度</li>
        </ul>
      </div>
    </div>
  )
}
