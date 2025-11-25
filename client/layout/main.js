'use client'
import React from 'react'
import Header from './Header'
import Toaster from './Toaster'
import Interceptor from '../common/Interceptor'



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


    // drop in a client-side file and run
    (function () {
        if (typeof window === 'undefined') return;
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.bottom = '12px';
        overlay.style.left = '12px';
        overlay.style.zIndex = 99999;
        overlay.style.padding = '6px 8px';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.color = 'white';
        overlay.style.fontSize = '12px';
        overlay.style.borderRadius = '6px';
        overlay.style.fontFamily = 'system-ui, Arial';
        overlay.style.pointerEvents = 'none';
        document.body.appendChild(overlay);

        window.addEventListener('focusin', (e) => {
            const el = e.target;
            if (!el || !('nodeType' in el)) return;
            const cs = window.getComputedStyle(el);
            overlay.textContent = `focused: ${el.tagName.toLowerCase()} font-size:${cs.fontSize} line-height:${cs.lineHeight} transform:${cs.transform === 'none' ? 'none' : cs.transform}`;
        });

        window.addEventListener('focusout', () => overlay.textContent = '');
    })();



    return (
        <div style={{ display: 'flex', flex: '1 0 0', flexDirection: 'column', background: '#0f172a' }}>
            <Interceptor />   {/* run only on client */}
            <Header promptEvent={promptEvent} handleInstallClick={handleInstallClick} />
            <div>{children}</div>
            <Toaster />
        </div>
    )
}

export default Main

