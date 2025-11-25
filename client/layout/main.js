'use client'
import React from 'react'
import Header from './Header'
import Toaster from './Toaster'
import Interceptor from '../common/Interceptor'

function Main({ children }) {

    React.useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('SW registered', reg))
                .catch(err => console.log('SW reg failed', err));
        }
    }, []);
    return (
        <div style={{ display: 'flex', flex: '1 0 0', flexDirection: 'column', background: '#0f172a' }}>
            <Interceptor />   {/* run only on client */}
            <Header />
            <div>{children}</div>
            <Toaster />
        </div>
    )
}

export default Main

