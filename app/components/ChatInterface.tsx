'use client'

import { useState } from 'react'

interface Message {
    id: number
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: '你好！我是 AI 助手，有什麼可以幫你的嗎？', sender: 'bot', timestamp: new Date() },
    ])
    const [inputText, setInputText] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const botResponses = [
        '這是個好問題！讓我想想...',
        '我了解你的意思了。',
        '這個問題很有趣！',
        '讓我幫你查一下資料。',
        '根據我的了解...',
        '這確實是個重要的議題。',
    ]

    const sendMessage = async () => {
        if (!inputText.trim()) return

        // 添加用戶訊息
        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage])
        setInputText('')

        // 模擬機器人打字
        setIsTyping(true)
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
        setIsTyping(false)

        // 添加機器人回覆
        const botMessage: Message = {
            id: Date.now() + 1,
            text: botResponses[Math.floor(Math.random() * botResponses.length)],
            sender: 'bot',
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-[700px]">
                {/* 標題欄 */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                            🤖
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">AI 助手</h2>
                            <p className="text-sm opacity-90">線上</p>
                        </div>
                    </div>
                </div>

                {/* 訊息區域 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-900">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded-bl-none shadow'
                                    }`}
                            >
                                <p className="break-words">{message.text}</p>
                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* 打字指示器 */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-3 shadow">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 輸入區域 */}
                <div className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="輸入訊息... (Enter 發送)"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputText.trim()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            發送
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Shift + Enter 換行 • Enter 發送
                    </p>
                </div>
            </div>

            {/* 學習要點 */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>• <strong>訊息列表</strong>：動態添加和顯示訊息</li>
                    <li>• <strong>條件樣式</strong>：用戶和機器人訊息不同風格</li>
                    <li>• <strong>鍵盤事件</strong>：Enter 發送，Shift+Enter 換行</li>
                    <li>• <strong>打字動畫</strong>：使用 animate-bounce 和延遲</li>
                    <li>• <strong>自動滾動</strong>：新訊息時滾動到底部（可加強）</li>
                </ul>
            </div>
        </div>
    )
}
