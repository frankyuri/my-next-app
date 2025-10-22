'use client'

import { useState, useEffect } from 'react'

interface Weather {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('台北')

  // 模擬天氣 API
  const mockWeatherData: Record<string, Weather> = {
    '台北': {
      location: '台北',
      temperature: 28,
      condition: '多雲',
      humidity: 65,
      windSpeed: 12,
      icon: '⛅',
    },
    '台中': {
      location: '台中',
      temperature: 30,
      condition: '晴朗',
      humidity: 55,
      windSpeed: 8,
      icon: '☀️',
    },
    '高雄': {
      location: '高雄',
      temperature: 32,
      condition: '晴朗',
      humidity: 70,
      windSpeed: 15,
      icon: '☀️',
    },
    '台南': {
      location: '台南',
      temperature: 31,
      condition: '局部多雲',
      humidity: 60,
      windSpeed: 10,
      icon: '🌤️',
    },
  }

  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 800))
    setWeather(mockWeatherData[cityName] || mockWeatherData['台北'])
    setLoading(false)
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
    fetchWeather(newCity)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-2xl shadow-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🌤️ 天氣預報
        </h2>

        {/* 城市選擇 */}
        <div className="flex gap-2 mb-6">
          {Object.keys(mockWeatherData).map(cityName => (
            <button
              key={cityName}
              onClick={() => handleCityChange(cityName)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                city === cityName
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-6xl">🌀</div>
            <p className="mt-4">載入中...</p>
          </div>
        ) : weather ? (
          <div>
            {/* 主要資訊 */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{weather.icon}</div>
              <div className="text-6xl font-bold mb-2">{weather.temperature}°C</div>
              <div className="text-xl opacity-90">{weather.condition}</div>
            </div>

            {/* 詳細資訊 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-sm opacity-75 mb-1">濕度</div>
                <div className="text-2xl font-bold">{weather.humidity}%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-sm opacity-75 mb-1">風速</div>
                <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
              </div>
            </div>

            {/* 更新時間 */}
            <div className="mt-6 text-center text-sm opacity-75">
              更新時間：{new Date().toLocaleTimeString('zh-TW')}
            </div>

            {/* 重新整理按鈕 */}
            <button
              onClick={() => fetchWeather(city)}
              className="w-full mt-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              🔄 重新整理
            </button>
          </div>
        ) : null}
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>條件渲染</strong>：根據 loading 狀態顯示不同內容</li>
          <li>• <strong>Gradient 背景</strong>：漂亮的漸層色設計</li>
          <li>• <strong>半透明效果</strong>：backdrop-blur 和 opacity</li>
          <li>• <strong>模擬 API</strong>：學習 async/await 和延遲</li>
          <li>• <strong>Date 格式化</strong>：toLocaleTimeString 使用</li>
        </ul>
      </div>
    </div>
  )
}
