'use client'

import { useState } from 'react'

// 練習 12: 購物車功能 - 電商必備
interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

const products = [
    { id: 1, name: 'React 入門書', price: 450, image: '📚' },
    { id: 2, name: 'TypeScript 實戰', price: 520, image: '📘' },
    { id: 3, name: 'Next.js 完全指南', price: 680, image: '📗' },
    { id: 4, name: '前端面試寶典', price: 380, image: '📙' },
    { id: 5, name: 'JavaScript 精粹', price: 420, image: '📕' },
]

export default function ShoppingCart() {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (product: typeof products[0]) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id)
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const getTotalPrice = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const getTotalItems = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0)
    }

    const clearCart = () => {
        if (confirm('確定要清空購物車嗎？')) {
            setCart([])
        }
    }

    const checkout = () => {
        if (cart.length === 0) {
            alert('購物車是空的！')
            return
        }
        alert(`結帳成功！總金額：NT$ ${getTotalPrice().toLocaleString()}`)
        setCart([])
    }

    return (
        <div className="p-6 border-2 border-teal-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🛒 購物車系統</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 商品列表 */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">商品列表</h3>
                    <div className="space-y-2">
                        {products.map(product => (
                            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{product.image}</span>
                                    <div>
                                        <div className="font-semibold text-gray-800 dark:text-white">{product.name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">NT$ {product.price}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors text-sm"
                                >
                                    加入購物車
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 購物車 */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            購物車 ({getTotalItems()})
                        </h3>
                        {cart.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                清空
                            </button>
                        )}
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            購物車是空的 🛒
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{item.image}</span>
                                                <div>
                                                    <div className="font-semibold text-gray-800 dark:text-white">{item.name}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">NT$ {item.price}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 bg-gray-300 dark:bg-zinc-700 rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
                                            >
                                                −
                                            </button>
                                            <span className="px-4 py-1 bg-white dark:bg-zinc-800 rounded min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-300 dark:bg-zinc-700 rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
                                            >
                                                +
                                            </button>
                                            <span className="ml-auto font-semibold text-teal-600 dark:text-teal-400">
                                                NT$ {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 總計 */}
                            <div className="border-t-2 border-teal-500 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold text-gray-800 dark:text-white">總計</span>
                                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                        NT$ {getTotalPrice().toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    onClick={checkout}
                                    className="w-full px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold"
                                >
                                    結帳
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                💡 學習重點：複雜狀態管理、數組操作、條件渲染、數量控制、金額計算
            </div>
        </div>
    )
}
