import { ReactNode } from 'react'

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

interface LogOptions {
    level?: LogLevel
    timestamp?: boolean
    context?: string
}

class Logger {
    private static isDevelopment = process.env.NODE_ENV === 'development'
    private static context = ''

    static setContext(context: string) {
        this.context = context
    }

    private static formatMessage(action: string, context?: string): string {
        const timestamp = new Date().toISOString()
        const ctx = context || this.context
        return ctx ? `[${timestamp}][${ctx}] ${action}` : `[${timestamp}] ${action}`
    }

    static log(action: string, data?: any, context?: string) {
        if (!this.isDevelopment) return
        console.log(this.formatMessage(action, context), data ?? '')
    }

    static info(action: string, data?: any, context?: string) {
        if (!this.isDevelopment) return
        console.info(this.formatMessage(action, context), data ?? '')
    }

    static error(action: string, error?: any, context?: string) {
        console.error(this.formatMessage(action, context), error ?? '')
    }

    static warn(action: string, data?: any, context?: string) {
        if (!this.isDevelopment) return
        console.warn(this.formatMessage(action, context), data ?? '')
    }

    static debug(action: string, data?: any, context?: string) {
        if (!this.isDevelopment) return
        console.debug(this.formatMessage(action, context), data ?? '')
    }

    static group(label: string, callback: () => void) {
        if (!this.isDevelopment) return callback()
        console.group(label)
        callback()
        console.groupEnd()
    }

    static table(data: any) {
        if (!this.isDevelopment) return
        console.table(data)
    }
}

export default Logger