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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 React 初學者練習集
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            使用 Next.js + TypeScript + Tailwind CSS 打造的互動式學習組件
          </p>
        </header>

        {/* 基礎練習 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 px-4">
            📚 基礎練習
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Counter />
            <ToggleText />
            <ColorPicker />
            <TodoList />
            <FormExample />
          </div>
        </section>

        {/* API 請求練習 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 px-4">
            🌐 API 請求練習
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <FetchUserData />
            <DogImageGallery />
            <GitHubSearch />
            <LoginForm />
          </div>
        </section>

        {/* 進階實戰練習 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 px-4">
            💼 進階實戰練習（面試常見）
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <ProductFilter />
            <ShoppingCart />
            <Timer />
            <Pagination />
            <MultiStepForm />
          </div>
        </section>

        <footer className="text-center mt-12 text-gray-600 dark:text-gray-400 border-t pt-8">
          <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            🎯 共 14 個實戰練習組件
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-bold text-blue-600 dark:text-blue-400 mb-2">📚 基礎練習 (5)</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                State、Props、條件渲染、列表渲染、表單處理
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="font-bold text-purple-600 dark:text-purple-400 mb-2">🌐 API 請求 (4)</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Fetch、Async/Await、Loading、Error Handling
              </div>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">💼 進階實戰 (5)</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                性能優化、複雜狀態、分頁、購物車、多步驟表單
              </div>
            </div>
          </div>
          <p className="text-sm mb-2">
            💡 提示：所有組件都附帶學習重點說明，建議從基礎到進階循序漸進學習！
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            這些練習涵蓋了前端面試和實習常見的技術要求
          </p>
        </footer>
      </div>
    </div>
  );
}
