'use client'

import { useState } from 'react'

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# 歡迎使用 Markdown 編輯器

## 功能特色

這是一個**即時預覽**的 Markdown 編輯器。

### 支援的語法：

- **粗體文字**
- *斜體文字*
- \`程式碼\`
- [連結](https://example.com)

### 程式碼區塊

\`\`\`javascript
function hello() {
  console.log('Hello World!')
}
\`\`\`

### 列表

1. 第一項
2. 第二項
3. 第三項

### 引用

> 這是一段引用文字
> 可以多行顯示

---

試試看編輯左邊的文字！`)

  // 簡單的 Markdown 轉換器（實際專案建議使用 marked 或 react-markdown）
  const convertMarkdown = (text: string) => {
    let html = text
      // 標題
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>')
      // 粗體
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      // 斜體
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      // 行內程式碼
      .replace(/`(.*?)`/gim, '<code class="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-sm font-mono">$1</code>')
      // 連結
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // 分隔線
      .replace(/^---$/gim, '<hr class="my-6 border-gray-300 dark:border-zinc-700">')
      // 引用
      .replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-gray-300 dark:border-zinc-600 italic text-gray-700 dark:text-gray-300 my-2">$1</blockquote>')
      // 無序列表
      .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-gray-800 dark:text-gray-200">$1</li>')
      // 有序列表
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-gray-800 dark:text-gray-200">$1</li>')
      // 程式碼區塊
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
      // 段落
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-800 dark:text-gray-200">')

    return `<p class="mb-4 text-gray-800 dark:text-gray-200">${html}</p>`
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-100 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            📝 Markdown 即時預覽
          </h2>
        </div>

        <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-zinc-700">
          {/* 編輯器 */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ✏️ 編輯器
            </h3>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[600px] p-4 border border-gray-300 dark:border-zinc-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              placeholder="輸入 Markdown..."
            />
          </div>

          {/* 預覽 */}
          <div className="p-6 bg-gray-50 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              👀 預覽
            </h3>
            <div
              className="prose dark:prose-invert max-w-none h-[600px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: convertMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>正則表達式</strong>：使用 regex 解析 Markdown 語法</li>
          <li>• <strong>dangerouslySetInnerHTML</strong>：渲染 HTML 內容（注意安全性）</li>
          <li>• <strong>split-view 佈局</strong>：編輯器與預覽並排</li>
          <li>• <strong>字串處理</strong>：多次 replace 轉換文字</li>
          <li>• <strong>實際專案建議</strong>：使用 marked 或 react-markdown 套件</li>
        </ul>
      </div>
    </div>
  )
}
