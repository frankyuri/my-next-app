'use client'

import { useState, useEffect, useCallback } from 'react'

type Cell = 0 | 1 | 2 // 0: 空, 1: X, 2: O

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(0))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直
    [0, 4, 8], [2, 4, 6], // 斜
  ]

  const checkWinner = useCallback((currentBoard: Cell[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo
      if (
        currentBoard[a] !== 0 &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a] === 1 ? 'X' : 'O', line: combo }
      }
    }

    if (currentBoard.every(cell => cell !== 0)) {
      return { winner: 'Draw', line: [] }
    }

    return null
  }, [])

  useEffect(() => {
    const result = checkWinner(board)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      
      if (result.winner === 'X') {
        setScores(prev => ({ ...prev, X: prev.X + 1 }))
      } else if (result.winner === 'O') {
        setScores(prev => ({ ...prev, O: prev.O + 1 }))
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
      }
    }
  }, [board, checkWinner])

  const handleClick = (index: number) => {
    if (board[index] !== 0 || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 1 : 2
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(0))
    setIsXNext(true)
    setWinner(null)
    setWinningLine([])
  }

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 })
    resetGame()
  }

  const getCellClass = (index: number) => {
    const baseClass = 'w-24 h-24 border-4 border-gray-300 dark:border-zinc-600 flex items-center justify-center text-5xl font-bold cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-zinc-700'
    
    if (winningLine.includes(index)) {
      return `${baseClass} bg-green-100 dark:bg-green-900/30 scale-110`
    }
    
    return baseClass
  }

  const getCellContent = (cell: Cell) => {
    if (cell === 1) return <span className="text-blue-600 dark:text-blue-400">✕</span>
    if (cell === 2) return <span className="text-red-600 dark:text-red-400">◯</span>
    return null
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          ⭕ 井字遊戲 ✕
        </h2>

        {/* 計分板 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">玩家 X</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{scores.X}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">平局</p>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{scores.draws}</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">玩家 O</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{scores.O}</p>
          </div>
        </div>

        {/* 狀態訊息 */}
        <div className="text-center mb-6">
          {winner ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {winner === 'Draw' ? '平局！' : `${winner} 獲勝！🎉`}
              </p>
            </div>
          ) : (
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              輪到：
              <span className={isXNext ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}>
                {isXNext ? ' X' : ' O'}
              </span>
            </p>
          )}
        </div>

        {/* 遊戲棋盤 */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-2">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                disabled={cell !== 0 || winner !== null}
                className={getCellClass(index)}
              >
                {getCellContent(cell)}
              </button>
            ))}
          </div>
        </div>

        {/* 按鈕 */}
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            重新開始
          </button>
          <button
            onClick={resetScores}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            重置計分
          </button>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>遊戲邏輯</strong>：勝負判斷算法</li>
          <li>• <strong>陣列操作</strong>：棋盤狀態管理</li>
          <li>• <strong>useCallback</strong>：優化勝負檢查函式</li>
          <li>• <strong>TypeScript</strong>：使用類型別名定義格子狀態</li>
          <li>• <strong>計分系統</strong>：持久化追蹤勝負記錄</li>
        </ul>
      </div>
    </div>
  )
}
