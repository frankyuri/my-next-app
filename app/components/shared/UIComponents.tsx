import { ReactNode } from 'react'

// 學習要點組件
interface LearningPointsProps {
    points: string[]
}

export function LearningPoints({ points }: LearningPointsProps) {
    return (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 學習要點</h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    )
}

// 統計卡片組件
interface StatCardProps {
    label: string
    value: number | string
    icon?: string
    color?: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'pink'
}

export function StatCard({ label, value, icon, color = 'blue' }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
        yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
        green: 'bg-gradient-to-br from-green-500 to-green-600',
        red: 'bg-gradient-to-br from-red-500 to-red-600',
        purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
        pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
    }

    return (
        <div className={`${colorClasses[color]} text-white rounded-lg p-4`}>
            <p className="text-sm opacity-90 mb-1">{label}</p>
            <p className="text-3xl font-bold">
                {icon && <span className="mr-2">{icon}</span>}
                {value}
            </p>
        </div>
    )
}

// 空狀態組件
interface EmptyStateProps {
    icon: string
    message: string
    description?: string
}

export function EmptyState({ icon, message, description }: EmptyStateProps) {
    return (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-6xl mb-4">{icon}</div>
            <p className="text-xl">{message}</p>
            {description && <p className="text-sm mt-2">{description}</p>}
        </div>
    )
}

// 按鈕組件
interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'danger' | 'success'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
}

export function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    type = 'button',
}: ButtonProps) {
    const baseClasses = 'font-medium rounded-lg transition-colors'

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
        success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
    }

    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
        >
            {children}
        </button>
    )
}

// 輸入框組件
interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    fullWidth?: boolean
    disabled?: boolean
}

export function Input({
    value,
    onChange,
    placeholder,
    type = 'text',
    fullWidth = true,
    disabled = false,
}: InputProps) {
    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${widthClass} px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white disabled:opacity-50`}
        />
    )
}

// 文字區域組件
interface TextAreaProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    rows?: number
    fullWidth?: boolean
    disabled?: boolean
}

export function TextArea({
    value,
    onChange,
    placeholder,
    rows = 4,
    fullWidth = true,
    disabled = false,
}: TextAreaProps) {
    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${widthClass} px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg dark:bg-zinc-700 dark:text-white disabled:opacity-50 resize-none`}
        />
    )
}

// 卡片容器組件
interface CardProps {
    children: ReactNode
    className?: string
    padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    }

    return (
        <div className={`bg-white dark:bg-zinc-800 rounded-lg shadow-lg ${paddingClasses[padding]} ${className}`}>
            {children}
        </div>
    )
}

// 標題組件
interface PageTitleProps {
    children: ReactNode
    icon?: string
}

export function PageTitle({ children, icon }: PageTitleProps) {
    return (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </h2>
    )
}

// Modal 組件
interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'md' }: ModalProps) {
    if (!isOpen) return null

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white dark:bg-zinc-800 rounded-lg shadow-2xl p-6 w-full ${maxWidthClasses[maxWidth]}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {title}
                </h3>
                {children}
            </div>
        </div>
    )
}

// Badge 組件
interface BadgeProps {
    children: ReactNode
    color?: 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple'
    size?: 'sm' | 'md'
}

export function Badge({ children, color = 'gray', size = 'md' }: BadgeProps) {
    const colorClasses = {
        gray: 'bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300',
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
        green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300',
        yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300',
        red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300',
    }

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2 py-1',
    }

    return (
        <span className={`${colorClasses[color]} ${sizeClasses[size]} rounded`}>
            {children}
        </span>
    )
}
