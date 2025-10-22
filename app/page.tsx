'use client'

import { useState, useEffect } from 'react'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import ToggleText from './components/ToggleText'
import ColorPicker from './components/ColorPicker'
import FormExample from './components/FormExample'
import FetchUserData from './components/FetchUserData'
import DogImageGallery from './components/DogImageGallery'
import LoginForm from './components/LoginForm'
import GitHubSearch from './components/GitHubSearch'
import ProductFilter from './components/ProductFilter'
import Timer from './components/Timer'
import ShoppingCart from './components/ShoppingCart'
import Pagination from './components/Pagination'
import MultiStepForm from './components/MultiStepForm'

// 組件配置
const components = [
  // 基礎練習
  { id: 'counter', name: '計數器', icon: '🔢', component: Counter, category: 'basic' },
  { id: 'toggle', name: '顯示/隱藏', icon: '👁️', component: ToggleText, category: 'basic' },
  { id: 'color', name: '顏色選擇器', icon: '🎨', component: ColorPicker, category: 'basic' },
  { id: 'todo', name: '待辦事項', icon: '✅', component: TodoList, category: 'basic' },
  { id: 'form', name: '表單處理', icon: '📝', component: FormExample, category: 'basic' },
  
  // API 練習
  { id: 'fetch-user', name: '隨機用戶 API', icon: '👤', component: FetchUserData, category: 'api' },
  { id: 'dog', name: '狗狗圖片', icon: '🐕', component: DogImageGallery, category: 'api' },
  { id: 'github', name: 'GitHub 搜尋', icon: '🔍', component: GitHubSearch, category: 'api' },
  { id: 'login', name: '模擬登入', icon: '🔐', component: LoginForm, category: 'api' },
  
  // 進階練習
  { id: 'product', name: '產品過濾', icon: '�️', component: ProductFilter, category: 'advanced' },
  { id: 'cart', name: '購物車', icon: '🛒', component: ShoppingCart, category: 'advanced' },
  { id: 'timer', name: '倒數計時器', icon: '⏰', component: Timer, category: 'advanced' },
  { id: 'pagination', name: '分頁功能', icon: '📄', component: Pagination, category: 'advanced' },
  { id: 'multistep', name: '多步驟表單', icon: '📋', component: MultiStepForm, category: 'advanced' },
]

const categories = [
  { id: 'basic', name: '📚 基礎練習', color: 'blue' },
  { id: 'api', name: '🌐 API 請求', color: 'purple' },
  { id: 'advanced', name: '💼 進階實戰', color: 'emerald' },
]

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('counter')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // 監聽 hash 變化
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && components.find(c => c.id === hash)) {
        setActiveComponent(hash)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 切換組件
  const handleComponentChange = (id: string) => {
    setActiveComponent(id)
    window.location.hash = id
    // 在移動設備上自動關閉側邊欄
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  const ActiveComponentElement = components.find(c => c.id === activeComponent)?.component || Counter

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
      {/* 側邊欄 */}
      <aside className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              🚀 React 練習集
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              共 {components.length} 個實戰組件
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {categories.map(category => (
              <div key={category.id} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {components
                    .filter(c => c.category === category.id)
                    .map(component => (
                      <li key={component.id}>
                        <button
                          onClick={() => handleComponentChange(component.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeComponent === component.id
                              ? `bg-${category.color}-50 dark:bg-${category.color}-900/20 text-${category.color}-700 dark:text-${category.color}-400 font-medium`
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                          }`}
                        >
                          <span className="text-xl">{component.icon}</span>
                          <span className="text-sm">{component.name}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Next.js + TypeScript + Tailwind CSS
            </p>
          </div>
        </div>
      </aside>

      {/* 主內容區 */}
      <main className="flex-1 overflow-y-auto">
        {/* 移動端漢堡選單 */}
        <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 組件內容 */}
        <div className="p-4 lg:p-8">
          <ActiveComponentElement />
        </div>
      </main>

      {/* 遮罩層（移動端） */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
