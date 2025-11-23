import { palettes } from '@/common/palettes';
import React, { useState } from 'react';

const Balance = ({ balance = 1243.72,
  income = 4200.5,
  expenses = 2956.78, }) => {
  const [open, setOpen] = useState(false);
  const format = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6" >

      <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-md" style={{ backgroundColor: palettes.dark[800] }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">Net balance</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{format(balance)}</h1>
            <div className="mt-3 flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600">▲</span>
                <div>
                  <div className="text-xs">Income</div>
                  <div className="font-medium">{format(income)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600">▼</span>
                <div>
                  <div className="text-xs">Expenses</div>
                  <div className="font-medium">{format(expenses)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for sparkline / donut */}
          <div className="hidden md:flex items-center"  >
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center">
              <div className="text-sm text-indigo-700">Spending
                <div className="text-2xl font-semibold">60%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights row (small cards) */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="col-span-1 bg-gray-50 p-3 rounded-lg text-sm">
            <div className="font-medium">This month</div>
            <div className="mt-1">Spent {format(1200)}</div>
          </div>
          <div className="col-span-1 bg-gray-50 p-3 rounded-lg text-sm">
            <div className="font-medium">Subscriptions</div>
            <div className="mt-1">3 active</div>
          </div>
          <div className="col-span-1 bg-gray-50 p-3 rounded-lg text-sm">
            <div className="font-medium">Budget left</div>
            <div className="mt-1">{format(300)}</div>
          </div>
        </div>
      </div>


      {/* Quick actions column */}
      <aside className="bg-white rounded-2xl p-4 shadow-md flex flex-col gap-3"  style={{ backgroundColor: palettes.dark[800] }}>
        <div className="text-sm font-medium">Quick actions</div>
        <button className="w-full py-2 rounded-lg border text-sm">+ Add expense</button>
        <button className="w-full py-2 rounded-lg border text-sm">+ Add income</button>
      </aside>
    </section>
  );
};

export default Balance;