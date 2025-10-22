'use client'

import { useState } from 'react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function QuizApp() {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'React 是什麼？',
      options: ['一個後端框架', '一個 JavaScript 庫', '一種程式語言', '一個資料庫'],
      correctAnswer: 1,
      explanation: 'React 是一個用於構建用戶介面的 JavaScript 庫，由 Facebook 開發。',
    },
    {
      id: 2,
      question: 'useState 是什麼？',
      options: ['一個組件', '一個 Hook', '一個類別', '一個事件'],
      correctAnswer: 1,
      explanation: 'useState 是 React 的一個 Hook，用於在函式組件中添加狀態。',
    },
    {
      id: 3,
      question: 'JSX 代表什麼？',
      options: ['Java Syntax Extension', 'JavaScript XML', 'JSON Extension', 'JavaScript Export'],
      correctAnswer: 1,
      explanation: 'JSX 是 JavaScript XML 的縮寫，是 React 中用於描述 UI 的語法擴展。',
    },
    {
      id: 4,
      question: 'useEffect 的主要用途是什麼？',
      options: ['處理副作用', '創建狀態', '定義組件', '處理路由'],
      correctAnswer: 0,
      explanation: 'useEffect 用於處理副作用，如數據獲取、訂閱或手動更改 DOM。',
    },
    {
      id: 5,
      question: 'props 是什麼？',
      options: ['組件的狀態', '組件間傳遞的數據', '一種生命週期方法', '一個 Hook'],
      correctAnswer: 1,
      explanation: 'props（properties）是從父組件傳遞給子組件的數據。',
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            測驗完成！
          </h2>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {score} / {questions.length}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            正確率：{percentage.toFixed(0)}%
          </p>
          <div className="mb-6">
            {percentage >= 80 ? (
              <p className="text-lg text-green-600 dark:text-green-400">太棒了！你對 React 很熟悉！</p>
            ) : percentage >= 60 ? (
              <p className="text-lg text-yellow-600 dark:text-yellow-400">不錯！繼續加油！</p>
            ) : (
              <p className="text-lg text-red-600 dark:text-red-400">繼續學習，你會進步的！</p>
            )}
          </div>
          <button
            onClick={restartQuiz}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            重新開始
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* 進度條 */}
        <div className="h-2 bg-gray-200 dark:bg-zinc-700">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* 題號 */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              問題 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              分數：{score}
            </span>
          </div>

          {/* 問題 */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question}
          </h3>

          {/* 選項 */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showAnswer = selectedAnswer !== null

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    !showAnswer
                      ? 'border-gray-300 dark:border-zinc-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      : isSelected && isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isSelected && !isCorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-zinc-600 opacity-50'
                  } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                    {showAnswer && isCorrect && <span className="text-2xl">✓</span>}
                    {showAnswer && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* 解釋 */}
          {selectedAnswer !== null && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                💡 解釋
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {question.explanation}
              </p>
            </div>
          )}

          {/* 下一題按鈕 */}
          {selectedAnswer !== null && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {currentQuestion < questions.length - 1 ? '下一題' : '查看結果'}
            </button>
          )}
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>條件渲染</strong>：根據狀態顯示不同內容</li>
          <li>• <strong>Set 資料結構</strong>：追蹤已回答的問題</li>
          <li>• <strong>進度追蹤</strong>：計算和顯示進度百分比</li>
          <li>• <strong>disabled 狀態</strong>：防止重複選擇</li>
          <li>• <strong>即時反饋</strong>：立即顯示正確/錯誤答案</li>
        </ul>
      </div>
    </div>
  )
}
