'use client'

import { useState, useEffect, useRef } from 'react'

interface Snake {
  x: number
  y: number
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const GRID_SIZE = 20
const CELL_SIZE = 20

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Snake[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Snake>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(150)

  // 生成隨機食物
  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  }

  // 重置遊戲
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection('RIGHT')
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
  }

  // 鍵盤控制
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying, gameOver])

  // 遊戲循環
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] }

        // 移動頭部
        switch (direction) {
          case 'UP':
            head.y -= 1
            break
          case 'DOWN':
            head.y += 1
            break
          case 'LEFT':
            head.x -= 1
            break
          case 'RIGHT':
            head.x += 1
            break
        }

        // 檢查撞牆
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true)
          setIsPlaying(false)
          if (score > highScore) setHighScore(score)
          return prevSnake
        }

        // 檢查撞到自己
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          setIsPlaying(false)
          if (score > highScore) setHighScore(score)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        // 檢查吃到食物
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood())
          setScore(prev => prev + 10)
          // 加速
          if (speed > 50) setSpeed(prev => prev - 5)
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, speed)

    return () => clearInterval(gameLoop)
  }, [direction, food, isPlaying, gameOver, score, highScore, speed])

  // 繪製遊戲
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清除畫布
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 繪製網格
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // 繪製蛇
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10b981' : '#34d399'
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      )
    })

    // 繪製食物
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }, [snake, food])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          🐍 貪吃蛇遊戲
        </h2>

        {/* 計分板 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">當前分數</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{score}</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">最高分數</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{highScore}</p>
          </div>
        </div>

        {/* 遊戲畫布 */}
        <div className="flex justify-center mb-6 relative">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="border-4 border-gray-300 dark:border-zinc-600 rounded-lg"
          />
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-4">遊戲結束！</p>
                <p className="text-2xl text-white mb-4">分數：{score}</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  重新開始
                </button>
              </div>
            </div>
          )}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-700 transition-colors font-bold"
              >
                開始遊戲
              </button>
            </div>
          )}
        </div>

        {/* 控制說明 */}
        <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⌨️ 控制方式</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div>↑ 向上移動</div>
            <div>↓ 向下移動</div>
            <div>← 向左移動</div>
            <div>→ 向右移動</div>
          </div>
        </div>

        {/* 遊戲資訊 */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>長度：{snake.length}</span>
          <span>速度：{(200 - speed).toFixed(0)}</span>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Canvas API</strong>：使用 canvas 繪製遊戲畫面</li>
          <li>• <strong>遊戲循環</strong>：setInterval 實現遊戲主循環</li>
          <li>• <strong>鍵盤事件</strong>：方向鍵控制</li>
          <li>• <strong>碰撞檢測</strong>：撞牆和撞到自己的判斷</li>
          <li>• <strong>動態速度</strong>：隨分數提高而加速</li>
        </ul>
      </div>
    </div>
  )
}
