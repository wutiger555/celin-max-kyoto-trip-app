import React, { useState, useEffect } from 'react';
import { Share, X, ChevronRight, ChevronLeft } from './ui/Icons';

// Safari Share Icon SVG (more accurate representation)
const SafariShareIcon = () => (
    <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-text-bottom">
        <rect x="10" y="20" width="30" height="25" rx="3" stroke="#007AFF" strokeWidth="3" fill="none" />
        <path d="M25 5 L25 30" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 13 L25 5 L33 13" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

// Add to Home Screen Icon
const AddHomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="40" height="40" rx="8" stroke="#333" strokeWidth="2.5" fill="none" />
        <path d="M25 15 L25 35" stroke="#333" strokeWidth="3" strokeLinecap="round" />
        <path d="M15 25 L35 25" stroke="#333" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const PWAInstallPrompt: React.FC = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showFullTutorial, setShowFullTutorial] = useState(false);

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
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    const handleRemindLater = () => {
        setShowPrompt(false);
        // Don't save to localStorage, so it will show again next time
    };

    const tutorialSteps = [
        {
            id: 1,
            title: '點擊分享按鈕',
            titleEn: 'Tap Share Button',
            description: '在 Safari 瀏覽器底部找到分享按鈕',
            descriptionEn: 'Find the share button at the bottom of Safari',
            icon: <SafariShareIcon />,
            hint: '藍色的方形帶箭頭圖示',
            visual: (
                <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-lg p-4 mt-3">
                    {/* Mock Safari bottom bar */}
                    <div className="bg-white rounded-lg shadow-sm p-3 flex justify-around items-center">
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-[#007AFF] flex items-center justify-center animate-pulse">
                                <SafariShareIcon />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C44302] rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">1</span>
                            </div>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="10" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: '向下滑動選單',
            titleEn: 'Scroll Down the Menu',
            description: '在彈出的分享選單中向下滑動',
            descriptionEn: 'Scroll down in the share menu',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2">
                    <path d="M12 5 L12 19" strokeLinecap="round" />
                    <path d="M5 12 L12 19 L19 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            hint: '找到「加入主畫面」選項',
            visual: (
                <div className="bg-white rounded-lg shadow-sm p-3 mt-3 border border-stone-200">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400">
                            <div className="w-6 h-6 bg-stone-200 rounded"></div>
                            <span className="text-xs">拷貝</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400">
                            <div className="w-6 h-6 bg-stone-200 rounded"></div>
                            <span className="text-xs">加入閱讀列表</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-50 border-2 border-[#007AFF] relative">
                            <div className="w-6 h-6 bg-stone-100 rounded flex items-center justify-center">
                                <AddHomeIcon />
                            </div>
                            <span className="text-xs font-bold text-stone-900">加入主畫面</span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C44302] rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">2</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400">
                            <div className="w-6 h-6 bg-stone-200 rounded"></div>
                            <span className="text-xs">加入書籤</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: '點擊「新增」',
            titleEn: 'Tap "Add"',
            description: '確認 APP 名稱後，點擊右上角的「新增」',
            descriptionEn: 'Confirm the app name and tap "Add"',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5">
                    <path d="M5 12 L10 17 L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            hint: '完成！APP 將出現在桌面',
            visual: (
                <div className="bg-white rounded-lg shadow-sm p-4 mt-3 border border-stone-200">
                    {/* Mock add to home screen modal */}
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-100">
                        <button className="text-[#007AFF] text-xs">取消</button>
                        <span className="text-xs font-bold text-stone-900">加入主畫面</span>
                        <div className="relative">
                            <button className="text-[#007AFF] text-xs font-bold bg-blue-50 px-2 py-1 rounded border border-[#007AFF]">新增</button>
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#C44302] rounded-full flex items-center justify-center animate-bounce">
                                <span className="text-white text-[8px] font-bold">3</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#C44302] to-[#8B2500] rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-white text-lg font-bold font-serif">京</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-stone-900">WinterKyoto</div>
                            <div className="text-xs text-stone-400">wutiger555.github.io</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            title: '完成！🎉',
            titleEn: 'Done!',
            description: 'APP 已加入主畫面，可隨時離線使用',
            descriptionEn: 'The app is now on your home screen',
            icon: (
                <div className="text-2xl">🎌</div>
            ),
            hint: '享受你的京都之旅！',
            visual: (
                <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-lg p-6 mt-3 text-center">
                    <div className="inline-flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#C44302] to-[#8B2500] rounded-2xl flex items-center justify-center shadow-lg mb-2">
                            <span className="text-white text-2xl font-bold font-serif">京</span>
                        </div>
                        <span className="text-xs font-bold text-stone-700">WinterKyoto</span>
                    </div>
                    <div className="mt-4 text-xs text-stone-500">
                        ✨ 現在可以像原生 APP 一樣使用
                    </div>
                </div>
            )
        }
    ];

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed inset-0 z-[3000] pointer-events-none flex items-end justify-center pb-safe-bottom">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in" onClick={handleRemindLater} />

            {/* Sheet */}
            <div className={`w-full max-w-md bg-[#FDFBF7] rounded-t-2xl shadow-2xl pointer-events-auto relative transform transition-all animate-in slide-in-from-bottom duration-500 ${showFullTutorial ? 'max-h-[85vh]' : ''} overflow-hidden`}>

                {/* Drag Handle */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-stone-300 rounded-full" />

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#C44302]/5 rounded-bl-full -z-10 pointer-events-none" />

                {!showFullTutorial ? (
                    // Initial Compact View
                    <div className="p-6 pt-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C44302] uppercase block mb-1">更好的體驗</span>
                                <h3 className="text-xl font-bold font-display text-stone-900">加入主畫面</h3>
                            </div>
                            <button onClick={handleDismiss} className="p-2 -mr-2 text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-stone-600 font-serif leading-relaxed mb-4">
                            將 <span className="font-bold text-stone-900">Winter in Kyoto</span> 加入主畫面，獲得最佳離線體驗與全螢幕瀏覽。
                        </p>

                        {/* Quick instruction for iOS */}
                        {isIOS && (
                            <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-stone-200 flex items-center justify-center">
                                        <SafariShareIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-stone-800">
                                            點擊 Safari 底部的 <span className="text-[#007AFF]">分享按鈕</span>
                                        </p>
                                        <p className="text-[10px] text-stone-500 mt-0.5">
                                            然後選擇「加入主畫面」
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFullTutorial(true)}
                                className="flex-1 bg-stone-900 text-white py-3 px-4 rounded-lg text-sm font-bold hover:bg-[#C44302] transition-colors"
                            >
                                查看詳細教學
                            </button>
                            <button
                                onClick={handleRemindLater}
                                className="px-4 py-3 rounded-lg text-sm font-medium text-stone-500 border border-stone-200 hover:bg-stone-50 transition-colors"
                            >
                                稍後
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <button onClick={handleDismiss} className="text-[10px] text-stone-400 hover:text-stone-600">
                                不再顯示
                            </button>
                        </div>
                    </div>
                ) : (
                    // Full Tutorial View
                    <div className="flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="p-4 pt-6 border-b border-stone-100 flex justify-between items-center flex-shrink-0">
                            <button
                                onClick={() => setShowFullTutorial(false)}
                                className="text-[#007AFF] text-sm font-medium flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                返回
                            </button>
                            <span className="text-sm font-bold text-stone-900">安裝教學</span>
                            <button onClick={handleDismiss} className="text-stone-400 hover:text-stone-900 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tutorial Content */}
                        <div className="flex-1 overflow-y-auto p-5 pb-8">
                            {/* Progress Indicator */}
                            <div className="flex justify-center gap-2 mb-6">
                                {tutorialSteps.map((step, idx) => (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${idx === currentStep
                                                ? 'w-6 bg-[#C44302]'
                                                : idx < currentStep
                                                    ? 'bg-emerald-500'
                                                    : 'bg-stone-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Current Step */}
                            <div className="text-center mb-4">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-100 rounded-full mb-3">
                                    {tutorialSteps[currentStep].icon}
                                </div>
                                <span className="block text-[10px] font-bold tracking-widest text-[#C44302] uppercase mb-1">
                                    步驟 {currentStep + 1} / {tutorialSteps.length}
                                </span>
                                <h4 className="text-lg font-bold font-display text-stone-900">
                                    {tutorialSteps[currentStep].title}
                                </h4>
                                <p className="text-xs text-stone-500 mt-1">
                                    {tutorialSteps[currentStep].titleEn}
                                </p>
                            </div>

                            <p className="text-sm text-stone-600 text-center mb-2">
                                {tutorialSteps[currentStep].description}
                            </p>
                            <p className="text-[10px] text-center text-[#C44302] font-medium">
                                💡 {tutorialSteps[currentStep].hint}
                            </p>

                            {/* Visual Guide */}
                            {tutorialSteps[currentStep].visual}

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 mt-6">
                                {currentStep > 0 && (
                                    <button
                                        onClick={() => setCurrentStep(prev => prev - 1)}
                                        className="flex-1 py-3 px-4 rounded-lg text-sm font-medium text-stone-600 border border-stone-200 hover:bg-stone-50 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        上一步
                                    </button>
                                )}
                                {currentStep < tutorialSteps.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentStep(prev => prev + 1)}
                                        className="flex-1 bg-stone-900 text-white py-3 px-4 rounded-lg text-sm font-bold hover:bg-[#C44302] transition-colors flex items-center justify-center gap-1"
                                    >
                                        下一步
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDismiss}
                                        className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
                                    >
                                        ✓ 完成設定
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PWAInstallPrompt;
