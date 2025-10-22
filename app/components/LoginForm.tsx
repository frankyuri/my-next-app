'use client'

import { useState } from 'react'

// 練習 8: POST 請求 - 模擬登入
interface LoginResponse {
    token: string
    user: {
        id: number
        username: string
        email: string
    }
}

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<LoginResponse | null>(null)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setResponse(null)

        try {
            // 使用 JSONPlaceholder 的測試 API
            const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!res.ok) throw new Error('登入失敗')

            const userData = await res.json()

            // 模擬登入成功響應
            setResponse({
                token: 'mock-jwt-token-' + Date.now(),
                user: {
                    id: userData.id,
                    username: userData.username,
                    email: userData.email
                }
            })
        } catch (err) {
            setError('登入失敗，請檢查帳號密碼')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        setResponse(null)
        setUsername('')
        setPassword('')
    }

    return (
        <div className="p-6 border-2 border-green-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">POST 請求練習 - 模擬登入</h2>

            {!response ? (
                <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">用戶名:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="輸入任意用戶名"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">密碼:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="輸入任意密碼"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400 font-semibold"
                    >
                        {loading ? '登入中...' : '登入'}
                    </button>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        💡 提示：輸入任意帳號密碼即可測試
                    </p>
                </form>
            ) : (
                <div className="max-w-md mx-auto bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">✅ 登入成功！</h3>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <p><strong>用戶名:</strong> {response.user.username}</p>
                        <p><strong>Email:</strong> {response.user.email}</p>
                        <p><strong>用戶 ID:</strong> {response.user.id}</p>
                        <p className="text-xs break-all"><strong>Token:</strong> {response.token}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        登出
                    </button>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                💡 學習重點：POST 請求、表單提交、認證流程、請求頭設置
            </div>
        </div>
    )
}
