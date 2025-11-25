'use client'
import React from 'react'
import Header from './Header'
import Toaster from './Toaster'
import Interceptor from '../common/Interceptor'
import { Apple, Menu, MenuIcon, Settings, Settings2, Share2, Step, StepForward } from 'lucide-react'
import { palettes } from '@/common/palettes'



function Main({ children }) {
    const [promptEvent, setPromptEvent] = React.useState(null);


    React.useEffect(() => {
        let mounted = true;
        let fallbackTimer = null;

        const onBeforeInstallPrompt = (e) => {
            e.preventDefault();
            if (!mounted) return;
            setPromptEvent(e);
            // don't show fallback anymore
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };

        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);


        return () => {
            mounted = false;
            window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!promptEvent) return;
        try {
            promptEvent.prompt();
            const choice = await promptEvent.userChoice;
            console.log('PWA install choice', choice);
            setPromptEvent(null);
        } catch (err) {
            console.error('Install prompt failed', err);
        }
    };



    return (
        <div style={{ display: 'flex', flex: '1 0 0', flexDirection: 'column', background: '#0f172a' }}>
            <Interceptor />   {/* run only on client */}
            <Header promptEvent={promptEvent}  handleInstallClick={handleInstallClick} />
            <div>{children}</div>
            <Toaster />
        </div>
    )
}

export default Main

