'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from 'recharts';

const balanceData = [
    { name: 'Jan', balance: 8000 },
    { name: 'Feb', balance: 9200 },
    { name: 'Mar', balance: 7600 },
    { name: 'Apr', balance: 11200 },
    { name: 'May', balance: 9800 },
    { name: 'Jun', balance: 12500 },
    { name: 'Jul', balance: 14300 },
];

const expensesByCategory = [
    { category: 'Food', amount: 4200 },
    { category: 'Transport', amount: 1500 },
    { category: 'Shopping', amount: 2300 },
    { category: 'Bills', amount: 900 },
    { category: 'Others', amount: 600 },
];

const recentTransactions = [
    { id: 'tx_01', title: 'Grocery', category: 'Food', amount: 420, date: '2025-11-21' },
    { id: 'tx_02', title: 'Uber', category: 'Transport', amount: 320, date: '2025-11-20' },
    { id: 'tx_03', title: 'Electricity bill', category: 'Bills', amount: 1200, date: '2025-11-18' },
    { id: 'tx_04', title: 'Shoes', category: 'Shopping', amount: 2599, date: '2025-11-15' },
    { id: 'tx_05', title: 'Coffee', category: 'Food', amount: 180, date: '2025-11-14' },
];

export default function Dashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6 p-6">
                {/* Sidebar */}
                <aside className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">ET</div>
                        <div>
                            <div className="font-semibold">Penny</div>
                            <div className="text-xs text-slate-400">Personal</div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <button className="text-left px-3 py-2 rounded-md hover:bg-slate-50 font-medium">Overview</button>
                        <button className="text-left px-3 py-2 rounded-md hover:bg-slate-50">Transactions</button>
                        <button className="text-left px-3 py-2 rounded-md hover:bg-slate-50">Budgets</button>
                        <button className="text-left px-3 py-2 rounded-md hover:bg-slate-50">Goals</button>
                        <button className="text-left px-3 py-2 rounded-md hover:bg-slate-50">Settings</button>
                    </nav>

                    <div className="mt-6 text-xs text-slate-500">Sync: <span className="font-medium text-slate-700">Online</span></div>
                </aside>

                {/* Main content */}
                <main className="lg:col-span-5 space-y-6">
                    {/* Top bar */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Overview</h2>
                            <div className="text-sm text-slate-500">Quick snapshot of your accounts & spending</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-3 py-2 rounded-md bg-indigo-600 text-white" onClick={() => router.push('/transactions/new')}>Add</button>
                            <button className="px-3 py-2 rounded-md border">Export</button>
                        </div>
                    </div>

                    {/* Balances and charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
                            <div className="text-xs text-slate-400">Available balance</div>
                            <div className="text-2xl font-semibold mt-2">₹14,560</div>

                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm text-slate-600">
                                <div>
                                    <div className="font-medium">₹420</div>
                                    <div className="text-xs">Today</div>
                                </div>
                                <div>
                                    <div className="font-medium">₹2,130</div>
                                    <div className="text-xs">Week</div>
                                </div>
                                <div>
                                    <div className="font-medium">₹9,420</div>
                                    <div className="text-xs">Month</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium">Balance trend</div>
                                <div className="text-xs text-slate-500">Last 6 months</div>
                            </div>
                            <div style={{ width: '100%', height: 180 }}>
                                <ResponsiveContainer>
                                    <LineChart data={balanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="balance" stroke="#6366F1" strokeWidth={3} dot={{ r: 2 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Spending by category + recent transactions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-1">
                            <div className="font-medium">Spending by category</div>
                            <div style={{ width: '100%', height: 200 }} className="mt-3">
                                <ResponsiveContainer>
                                    <BarChart data={expensesByCategory}>
                                        <XAxis dataKey="category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="amount" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <ul className="mt-4 text-sm text-slate-600 space-y-2">
                                {expensesByCategory.map((c) => (
                                    <li key={c.category} className="flex items-center justify-between">
                                        <div>{c.category}</div>
                                        <div className="font-medium">₹{c.amount}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">Recent transactions</div>
                                <div className="text-xs text-slate-500">Showing last 5</div>
                            </div>

                            <div className="mt-3 overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-slate-500 text-xs">
                                        <tr>
                                            <th className="px-3 py-2">Title</th>
                                            <th className="px-3 py-2">Category</th>
                                            <th className="px-3 py-2">Date</th>
                                            <th className="px-3 py-2 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map((tx) => (
                                            <tr key={tx.id} className="border-t">
                                                <td className="px-3 py-3">{tx.title}</td>
                                                <td className="px-3 py-3 text-slate-600">{tx.category}</td>
                                                <td className="px-3 py-3 text-slate-600">{tx.date}</td>
                                                <td className="px-3 py-3 text-right font-medium">-₹{tx.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button className="text-sm px-3 py-2 rounded-md border">View all</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm text-sm text-slate-500">Tip: use the Add button to quickly create transactions — on mobile it opens a compact flow for one-handed use.</div>
                </main>
            </div>
        </div>
    );
}