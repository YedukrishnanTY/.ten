import React from 'react';
import { ChevronRight, } from 'lucide-react';
import { palettes } from '@/common/palettes';

const format = (value) => `$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


function RecentTransaction({ recent }) {
    return (
        <section
            className="rounded-2xl p-5 shadow-2xl border border-gray-700/50"
            style={{ backgroundColor: palettes.dark[800] }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-xl text-white">Recent Transactions</h3>
                <button
                    className="text-sm font-semibold hover:text-white transition"
                    style={{ color: palettes.primary[400] }}
                >
                    See all
                </button>
            </div>

            <ul className="space-y-2">
                {recent?.map((t) => {
                    const isExpense = t.amount < 0;
                    const amountColor = isExpense ? palettes.red[500] : palettes.green[500];
                    // const IconComponent = categoryIcons[t.category] || ChevronRight; // Default icon

                    return (
                        <li
                            key={t.id}
                            className="py-3 px-2 flex items-center justify-between rounded-lg hover:bg-gray-700/50 transition duration-150 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">

                                {/* Transaction Icon based on Expense/Income */}
                                {/* <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${isExpense ? 'bg-red-800/80' : 'bg-green-800/80'}`}>
                                    <IconComponent className={`w-5 h-5 ${isExpense ? 'text-red-300' : 'text-green-300'}`} />
                                </div> */}

                                <div>
                                    <div className="font-medium text-white">{t.title}</div>
                                    <div className="text-xs text-gray-400">{t.category} • {t.date}</div>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="flex items-center gap-1">
                                <span className={`font-bold text-lg`} style={{ color: amountColor }}>
                                    {isExpense ? '-' : '+'} {format(t.amount)}
                                </span>
                                <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default RecentTransaction;