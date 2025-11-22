'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Main() {
    const router = useRouter();
     return (
        <Button onClick={() => { router.push('/register') }}>Go to Register</Button>
    )
}

