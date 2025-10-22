'use client'

import { useState, useEffect } from 'react'

// 練習 7: useEffect + API - 狗狗圖片
export default function DogImageGallery() {
  const [dogImage, setDogImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [breed, setBreed] = useState('random')
  const [breeds, setBreeds] = useState<string[]>([])

  // 獲取狗品種列表
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => {
        const breedList = Object.keys(data.message).slice(0, 10) // 只取前 10 個
        setBreeds(breedList)
      })
  }, [])

  const fetchDogImage = async () => {
    setLoading(true)
    try {
      const url = breed === 'random' 
        ? 'https://dog.ceo/api/breeds/image/random'
        : `https://dog.ceo/api/breed/${breed}/images/random`
      
      const response = await fetch(url)
      const data = await response.json()
      setDogImage(data.message)
    } catch (err) {
      console.error('獲取圖片失敗', err)
    } finally {
      setLoading(false)
    }
  }

  // 自動載入第一張圖片
  useEffect(() => {
    fetchDogImage()
  }, [breed])

  return (
    <div className="p-6 border-2 border-orange-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🐕 狗狗圖片庫</h2>
      
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <select
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        >
          <option value="random">隨機品種</option>
          {breeds.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        
        <button 
          onClick={fetchDogImage}
          disabled={loading}
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? '載入中...' : '換一張'}
        </button>
      </div>

      {dogImage && (
        <div className="relative group overflow-hidden rounded-lg">
          <img 
            src={dogImage} 
            alt="Random Dog" 
            className="w-full h-96 object-cover rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm">品種: {breed === 'random' ? '隨機' : breed}</p>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        💡 學習重點：useEffect hook、自動載入數據、下拉選單控制
      </div>
    </div>
  )
}
