import Counter from './components/Counter'
import TodoList from './components/TodoList'
import ToggleText from './components/ToggleText'
import ColorPicker from './components/ColorPicker'
import FormExample from './components/FormExample'

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

        <div className="grid grid-cols-1 gap-6">
          {/* 練習 1: 計數器 */}
          <Counter />

          {/* 練習 2: 顯示/隱藏 */}
          <ToggleText />

          {/* 練習 3: 顏色選擇器 */}
          <ColorPicker />

          {/* 練習 4: 待辦事項列表 */}
          <TodoList />

          {/* 練習 5: 表單處理 */}
          <FormExample />
        </div>

        <footer className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💡 提示：打開開發者工具並嘗試修改這些組件來學習 React！
          </p>
        </footer>
      </div>
    </div>
  );
}
