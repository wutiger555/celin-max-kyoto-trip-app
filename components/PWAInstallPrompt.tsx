import React, { useState, useEffect } from 'react';
import { Share, X } from './ui/Icons';

const PWAInstallPrompt: React.FC = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already in standalone mode
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;

        setIsStandalone(isInStandaloneMode);

        if (isInStandaloneMode) return;

        // Check device type
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        // Check if user has dismissed the prompt before
        const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');

        // Show prompt after a short delay if not dismissed and not installed
        if (!hasDismissed && isIosDevice) {
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed inset-0 z-[3000] pointer-events-none flex items-end justify-center pb-safe-bottom">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in" onClick={handleDismiss} />

            {/* Sheet */}
            <div className="w-full max-w-md bg-[#FDFBF7] rounded-t-xl shadow-2xl p-6 pointer-events-auto relative transform transition-transform animate-in slide-in-from-bottom duration-500 pb-8">

                {/* Decorative elements */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-stone-300 rounded-full" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C44302]/5 rounded-bl-full -z-10 pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#C44302] uppercase block mb-1">Begin Function</span>
                        <h3 className="text-xl font-bold font-display text-stone-900">Install App</h3>
                    </div>
                    <button onClick={handleDismiss} className="p-2 -mr-2 text-stone-400 hover:text-stone-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-stone-600 font-serif leading-relaxed mb-6">
                    For the best offline experience in Kyoto, add this app to your home screen.
                    <br /><span className="text-xs text-stone-400 italic mt-1 block">Designed to feel like a native travel companion.</span>
                </p>

                {/* Instructions */}
                {isIOS ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-white border border-stone-200 rounded-lg shadow-sm">
                            <div className="w-8 h-8 flex items-center justify-center bg-stone-50 rounded text-stone-400">
                                1
                            </div>
                            <div className="flex-1 text-xs font-bold text-stone-700">
                                Tap the <span className="inline-flex items-center justify-center mx-1 align-text-bottom"><Share className="w-4 h-4 text-[#007AFF]" /></span> Share button below.
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-4 w-px bg-stone-300 border-l border-dashed border-stone-300"></div>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-white border border-stone-200 rounded-lg shadow-sm">
                            <div className="w-8 h-8 flex items-center justify-center bg-stone-50 rounded text-stone-400">
                                2
                            </div>
                            <div className="flex-1 text-xs font-bold text-stone-700">
                                Select <span className="font-serif italic text-stone-900">"Add to Home Screen"</span> from the menu.
                            </div>
                            <div className="w-8 h-8 border border-stone-200 rounded flex items-center justify-center bg-stone-50">
                                <span className="text-lg leading-none pb-1">+</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Generic / Android
                    <div className="text-center">
                        <p className="text-xs text-stone-500 mb-4">Tap the menu icon and select "Install App" or "Add to Home Screen".</p>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button onClick={handleDismiss} className="text-[10px] font-bold tracking-widest uppercase text-stone-400 hover:text-stone-600 border-b border-stone-200 pb-0.5">
                        Dismiss
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PWAInstallPrompt;
