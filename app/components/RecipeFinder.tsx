'use client'

import { useState } from 'react'

interface Recipe {
  id: number
  name: string
  ingredients: string[]
  image: string
  cookTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

export default function RecipeFinder() {
  const [recipes] = useState<Recipe[]>([
    {
      id: 1,
      name: '番茄炒蛋',
      ingredients: ['雞蛋', '番茄', '鹽', '糖', '油'],
      image: '🍳',
      cookTime: 15,
      difficulty: 'easy',
      category: '中式',
    },
    {
      id: 2,
      name: '義大利麵',
      ingredients: ['義大利麵', '番茄醬', '洋蔥', '大蒜', '橄欖油'],
      image: '🍝',
      cookTime: 30,
      difficulty: 'medium',
      category: '西式',
    },
    {
      id: 3,
      name: '壽司',
      ingredients: ['米飯', '海苔', '鮭魚', '醋', '醬油'],
      image: '🍣',
      cookTime: 45,
      difficulty: 'hard',
      category: '日式',
    },
    {
      id: 4,
      name: '炒飯',
      ingredients: ['白飯', '雞蛋', '蔥', '醬油', '油'],
      image: '🍚',
      cookTime: 20,
      difficulty: 'easy',
      category: '中式',
    },
    {
      id: 5,
      name: '漢堡',
      ingredients: ['漢堡麵包', '牛肉', '生菜', '番茄', '起司'],
      image: '🍔',
      cookTime: 25,
      difficulty: 'medium',
      category: '西式',
    },
    {
      id: 6,
      name: '拉麵',
      ingredients: ['麵條', '豬肉', '雞蛋', '蔥', '湯底'],
      image: '🍜',
      cookTime: 40,
      difficulty: 'medium',
      category: '日式',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [maxTime, setMaxTime] = useState(60)

  const categories = ['all', '中式', '西式', '日式']
  const difficulties = ['all', 'easy', 'medium', 'hard']

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    const matchesTime = recipe.cookTime <= maxTime

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTime
  })

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '簡單'
      case 'medium': return '中等'
      case 'hard': return '困難'
      default: return difficulty
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🍳 食譜搜尋器
        </h2>

        {/* 搜尋和過濾 */}
        <div className="grid gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋食譜或食材..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
          />

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                類別
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '全部' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                難度
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff === 'all' ? '全部' : getDifficultyText(diff)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                烹飪時間：{maxTime} 分鐘以內
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 結果統計 */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            找到 <span className="font-bold text-blue-600 dark:text-blue-400">{filteredRecipes.length}</span> 個食譜
          </p>
        </div>

        {/* 食譜網格 */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p>沒有找到符合條件的食譜</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className="border-2 border-gray-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-center mb-4">
                  <div className="text-7xl mb-3">{recipe.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded">
                      {recipe.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(recipe.difficulty)}`}>
                      {getDifficultyText(recipe.difficulty)}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded">
                      ⏱️ {recipe.cookTime}分
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    所需食材：
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  查看食譜
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>多重過濾</strong>：同時處理文字搜尋、類別、難度、時間</li>
          <li>• <strong>Range input</strong>：使用滑桿控制數值範圍</li>
          <li>• <strong>陣列搜尋</strong>：使用 some() 搜尋陣列內的元素</li>
          <li>• <strong>卡片佈局</strong>：響應式網格展示</li>
          <li>• <strong>動態統計</strong>：即時顯示過濾結果數量</li>
        </ul>
      </div>
    </div>
  )
}
