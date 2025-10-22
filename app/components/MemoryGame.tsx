'use client'

import { useState, useEffect } from 'react'

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🥝', '🍑']

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped])
        setFlipped([])
        
        if (matched.length + 2 === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🧠 記憶翻牌遊戲
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">步數</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{moves}</p>
          </div>
        </div>

        {/* 遊戲勝利訊息 */}
        {gameWon && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white text-center">
            <div className="text-6xl mb-3">🎉</div>
            <p className="text-2xl font-bold mb-2">恭喜你！</p>
            <p className="text-lg">你用了 {moves} 步完成遊戲！</p>
          </div>
        )}

        {/* 卡片網格 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={flipped.includes(index) || matched.includes(index)}
              className={`aspect-square text-6xl font-bold rounded-xl transition-all transform ${
                flipped.includes(index) || matched.includes(index)
                  ? 'bg-white dark:bg-zinc-700 scale-105'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105 hover:shadow-lg'
              } ${
                matched.includes(index)
                  ? 'opacity-50'
                  : ''
              }`}
            >
              {flipped.includes(index) || matched.includes(index) ? card : '?'}
            </button>
          ))}
        </div>

        {/* 統計資訊 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">總卡片</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {cards.length}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">已配對</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {matched.length / 2}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">剩餘</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(cards.length - matched.length) / 2}
            </p>
          </div>
        </div>

        {/* 重新開始按鈕 */}
        <button
          onClick={initGame}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          🔄 重新開始
        </button>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>陣列隨機排序</strong>：使用 sort 和 Math.random</li>
          <li>• <strong>遊戲邏輯</strong>：配對判斷和狀態管理</li>
          <li>• <strong>setTimeout</strong>：延遲翻回未配對的卡片</li>
          <li>• <strong>條件禁用</strong>：防止重複點擊</li>
          <li>• <strong>勝利判斷</strong>：檢測遊戲完成</li>
        </ul>
      </div>
    </div>
  )
}
