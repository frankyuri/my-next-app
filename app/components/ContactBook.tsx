'use client'

import { useState } from 'react'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  company: string
  avatar: string
  favorite: boolean
}

export default function ContactBook() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: '王小明', email: 'ming@example.com', phone: '0912-345-678', company: 'ABC公司', avatar: '👨', favorite: false },
    { id: 2, name: '李小華', email: 'hua@example.com', phone: '0923-456-789', company: 'XYZ企業', avatar: '👩', favorite: true },
    { id: 3, name: '張大偉', email: 'david@example.com', phone: '0934-567-890', company: 'DEF集團', avatar: '👨‍💼', favorite: false },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    avatar: '👤',
  })

  const avatars = ['👤', '👨', '👩', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍💻', '👩‍💻']

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const favoriteContacts = filteredContacts.filter(c => c.favorite)
  const otherContacts = filteredContacts.filter(c => !c.favorite)

  const addContact = () => {
    if (!formData.name.trim()) return

    const newContact: Contact = {
      id: Date.now(),
      ...formData,
      favorite: false,
    }

    setContacts([...contacts, newContact])
    resetForm()
  }

  const updateContact = () => {
    setContacts(contacts.map(c =>
      c.id === editingId
        ? { ...c, ...formData }
        : c
    ))
    resetForm()
  }

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  const toggleFavorite = (id: number) => {
    setContacts(contacts.map(c =>
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ))
  }

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id)
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      avatar: contact.avatar,
    })
    setIsAdding(true)
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '', avatar: '👤' })
    setIsAdding(false)
    setEditingId(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            📱 聯絡人清單
          </h2>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + 新增聯絡人
          </button>
        </div>

        {/* 搜尋框 */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋姓名、Email、電話或公司..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white"
          />
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">總聯絡人</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {contacts.length}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">我的最愛</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {favoriteContacts.length}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">搜尋結果</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {filteredContacts.length}
            </p>
          </div>
        </div>

        {/* 新增/編輯表單 */}
        {isAdding && (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-zinc-700 rounded-lg">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? '編輯聯絡人' : '新增聯絡人'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="姓名 *"
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="電話"
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="公司"
                className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">選擇頭像：</p>
              <div className="flex gap-2">
                {avatars.map(avatar => (
                  <button
                    key={avatar}
                    onClick={() => setFormData({ ...formData, avatar })}
                    className={`text-3xl p-2 rounded ${
                      formData.avatar === avatar
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-zinc-600'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={editingId ? updateContact : addContact}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {editingId ? '更新' : '新增'}
              </button>
              <button
                onClick={resetForm}
                className="flex-1 py-2 bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-500 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 聯絡人列表 */}
        {favoriteContacts.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              ⭐ 我的最愛
            </h3>
            <div className="space-y-3">
              {favoriteContacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onToggleFavorite={toggleFavorite}
                  onEdit={startEdit}
                  onDelete={deleteContact}
                />
              ))}
            </div>
          </div>
        )}

        {otherContacts.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              所有聯絡人
            </h3>
            <div className="space-y-3">
              {otherContacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onToggleFavorite={toggleFavorite}
                  onEdit={startEdit}
                  onDelete={deleteContact}
                />
              ))}
            </div>
          </div>
        )}

        {filteredContacts.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-6xl mb-4">👤</div>
            <p>沒有找到聯絡人</p>
          </div>
        )}
      </div>

      {/* 學習要點 */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>CRUD 操作</strong>：完整的新增、讀取、更新、刪除功能</li>
          <li>• <strong>搜尋功能</strong>：多欄位模糊搜尋</li>
          <li>• <strong>分類顯示</strong>：我的最愛優先顯示</li>
          <li>• <strong>表單狀態</strong>：同一表單支援新增和編輯</li>
          <li>• <strong>組件拆分</strong>：ContactCard 可獨立為子組件</li>
        </ul>
      </div>
    </div>
  )
}

// 聯絡人卡片組件
function ContactCard({
  contact,
  onToggleFavorite,
  onEdit,
  onDelete,
}: {
  contact: Contact
  onToggleFavorite: (id: number) => void
  onEdit: (contact: Contact) => void
  onDelete: (id: number) => void
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow">
      <div className="text-5xl">{contact.avatar}</div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-white">{contact.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
        <div className="flex gap-4 mt-1 text-sm text-gray-500 dark:text-gray-500">
          <span>📧 {contact.email}</span>
          <span>📞 {contact.phone}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleFavorite(contact.id)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {contact.favorite ? '⭐' : '☆'}
        </button>
        <button
          onClick={() => onEdit(contact)}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          編輯
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          刪除
        </button>
      </div>
    </div>
  )
}
