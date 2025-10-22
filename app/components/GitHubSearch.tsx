"use client";

import { useState } from "react";

// 練習 9: 搜尋功能 - GitHub 用戶搜尋
interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    bio: string | null;
}

export default function GitHubSearch() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchUser = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setError("");
        setUser(null);

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);

            if (response.status === 404) {
                throw new Error("找不到該用戶");
            }

            if (!response.ok) {
                throw new Error("請求失敗");
            }

            const data = await response.json();
            setUser(data);
        } catch (err: any) {
            setError(err.message || "搜尋失敗，請重試");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            searchUser();
        }
    };

    return (
        <div className="p-6 border-2 border-blue-500 rounded-lg m-4 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                🔍 GitHub 用戶搜尋
            </h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="輸入 GitHub 用戶名 (例: octocat)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                />
                <button
                    onClick={searchUser}
                    disabled={loading || !username.trim()}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? "搜尋中..." : "搜尋"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded mb-4">
                    {error}
                </div>
            )}

            {user && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                    <div className="flex items-start gap-6">
                        <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-700 shadow-lg"
                        />
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {user.login}
                            </h3>
                            {user.bio && (
                                <p className="text-gray-600 dark:text-gray-300 mb-3 italic">
                                    "{user.bio}"
                                </p>
                            )}
                            <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="text-center p-2 bg-white dark:bg-zinc-800 rounded">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {user.public_repos}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        倉庫
                                    </div>
                                </div>
                                <div className="text-center p-2 bg-white dark:bg-zinc-800 rounded">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {user.followers}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        粉絲
                                    </div>
                                </div>
                                <div className="text-center p-2 bg-white dark:bg-zinc-800 rounded">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {user.following}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        關注
                                    </div>
                                </div>
                            </div>
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                            >
                                查看 GitHub 主頁 →
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                💡 學習重點：搜尋功能、實時 API、錯誤處理、外部連結、Enter 鍵提交
            </div>
        </div>
    );
}
