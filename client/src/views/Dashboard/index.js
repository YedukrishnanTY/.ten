'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { palettes } from '@/common/palettes';
import { getProfileDetails } from '@/services/Auth.services';
import { toast } from 'sonner';
import RecentTransaction from './Components/RecentTransaction';
import ChartAndSubs from './Components/ChartAndSubs';
import Balance from './Components/Balance';
import { Button } from '@/components/ui/button';
import { getExpenseAll } from '@/services/Expenses.services';



export default function HomePage({
    currencyList
}) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);
    const [recent, setRecent] = React.useState(null);

    const getDetails = async () => {
        setLoading(true);
        await getProfileDetails()
            .then((res) => {
                setProfile(res);
            })
            .catch((err) => {
                toast.error('Failed to fetch profile details. Please login again.');
                router.push('/login');
            }).finally(() => {
                setLoading(false);
            });
    };
    const getExpenseDetails = async () => {
        await getExpenseAll()
            .then((res) => {
                setRecent(res || [])
            })
            .catch((err) => {
                toast.error(err?.message || 'Failed to fetch expense details. ');
            })
    };
    React.useEffect(() => {
        getDetails();
        getExpenseDetails()
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white-900"></div>
            </div>
        );
    }

    return (
        <div className=" p-6 md:p-10" style={{ color: palettes.primary[400] }}>
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold">Welcome back, {profile?.name}</h2>
                    <p className="text-sm text-gray-500">Overview of your money at a glance</p>
                </div>

            </header>

            {/* Top row: Balance + Quick actions */}
            <Balance />

            {/* Middle row: Charts + Subscriptions/Budgets */}
            <ChartAndSubs currencyList={currencyList} profile={profile} />

            {/* Recent transactions */}
            <RecentTransaction recent={recent} />

        </div>
    )
}

