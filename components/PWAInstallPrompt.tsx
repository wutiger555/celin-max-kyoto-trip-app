import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from './ui/Icons';

// Washi Paper Texture Background (same as Dashboard)
const WashiTexture = () => (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
    />
);

// Mizuhiki Knot Decoration (same as Dashboard)
const MizuhikiDecor = () => (
    <svg width="60" height="30" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-3 -right-3 z-20 drop-shadow-sm">
        <path d="M20 20 C 20 5, 40 5, 40 20 C 40 35, 60 35, 60 20" stroke="#C44302" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 20 C 20 35, 40 35, 40 20 C 40 5, 60 5, 60 20" stroke="#C44302" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 20 L 25 20" stroke="#C44302" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 20 L 65 20" stroke="#C44302" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// APP Icon Component (matching the actual icon)
const AppIcon = ({ size = 48 }: { size?: number }) => (
    <div
        className="rounded-2xl flex items-center justify-center shadow-lg"
        style={{
            width: size,
            height: size,
            background: '#FDFBF7',
            border: '1px solid rgba(0,0,0,0.05)'
        }}
    >
        <div
            className="rounded-full flex items-center justify-center"
            style={{
                width: size * 0.7,
                height: size * 0.7,
                background: '#C44302'
            }}
        >
            <span
                className="font-serif font-bold text-[#FDFBF7]"
                style={{ fontSize: size * 0.35 }}
            >
                京
            </span>
        </div>
    </div>
);

// Safari Share Icon (accurate)
const SafariShareIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="30" height="25" rx="3" stroke="#007AFF" strokeWidth="3" fill="none" />
        <path d="M25 5 L25 30" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 13 L25 5 L33 13" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

const PWAInstallPrompt: React.FC = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showFullTutorial, setShowFullTutorial] = useState(false);

    useEffect(() => {
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;

        setIsStandalone(isInStandaloneMode);
        if (isInStandaloneMode) return;

        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');

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
    };

    const tutorialSteps = [
        {
            id: 1,
            title: '點擊分享按鈕',
            description: '在 Safari 瀏覽器底部找到分享按鈕',
            visual: (
                <div className="bg-stone-100 rounded-lg p-4 mt-4 border border-stone-200">
                    <div className="bg-white rounded-lg shadow-sm p-3 flex justify-around items-center">
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-[#C44302]/10 border-2 border-[#C44302] flex items-center justify-center animate-pulse">
                                <SafariShareIcon size={24} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C44302] rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white text-[10px] font-bold">1</span>
                            </div>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">□</div>
                        <div className="w-6 h-6 flex items-center justify-center text-stone-300">⋯</div>
                    </div>
                    <p className="text-[10px] text-stone-400 text-center mt-2 font-serif italic">Safari 底部工具列</p>
                </div>
            )
        },
        {
            id: 2,
            title: '選擇「加入主畫面」',
            description: '在選單中向下滑動，找到此選項',
            visual: (
                <div className="bg-white rounded-lg shadow-sm p-3 mt-4 border border-stone-200">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400 text-xs">
                            <div className="w-5 h-5 bg-stone-200 rounded"></div>
                            <span>拷貝</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400 text-xs">
                            <div className="w-5 h-5 bg-stone-200 rounded"></div>
                            <span>加入閱讀列表</span>
                        </div>
                        <div className="relative flex items-center gap-3 p-2.5 rounded-lg bg-[#C44302]/5 border-2 border-[#C44302]">
                            <div className="w-6 h-6 bg-stone-100 rounded flex items-center justify-center text-stone-700 text-lg">+</div>
                            <span className="text-xs font-bold text-stone-900">加入主畫面</span>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C44302] rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white text-[10px] font-bold">2</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded bg-stone-50 text-stone-400 text-xs">
                            <div className="w-5 h-5 bg-stone-200 rounded"></div>
                            <span>加入書籤</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: '點擊「新增」確認',
            description: '確認名稱後，點擊右上角新增',
            visual: (
                <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-stone-200">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-100">
                        <span className="text-[#007AFF] text-xs">取消</span>
                        <span className="text-xs font-bold text-stone-900">加入主畫面</span>
                        <div className="relative">
                            <span className="text-[#007AFF] text-xs font-bold bg-[#C44302]/10 px-2 py-1 rounded border border-[#C44302]">新增</span>
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#C44302] rounded-full flex items-center justify-center shadow-sm animate-bounce">
                                <span className="text-white text-[10px] font-bold">3</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AppIcon size={48} />
                        <div>
                            <div className="text-sm font-bold text-stone-900 font-serif">WinterKyoto</div>
                            <div className="text-[10px] text-stone-400">wutiger555.github.io</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            title: '完成！',
            description: 'APP 已加入主畫面，隨時可用',
            visual: (
                <div className="bg-stone-100 rounded-lg p-6 mt-4 text-center border border-stone-200">
                    <div className="inline-flex flex-col items-center">
                        <AppIcon size={64} />
                        <span className="text-xs font-bold text-stone-700 mt-2 font-serif">WinterKyoto</span>
                    </div>
                    <p className="mt-4 text-xs text-stone-500 font-serif italic">
                        ✨ 現在可以像原生 APP 一樣使用
                    </p>
                    <p className="mt-1 text-[10px] text-[#C44302]">
                        支援離線瀏覽 • 全螢幕體驗
                    </p>
                </div>
            )
        }
    ];

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed inset-0 z-[3000] pointer-events-none flex items-end justify-center pb-safe-bottom">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in" onClick={handleRemindLater} />

            {/* Sheet - Kyoto Style */}
            <div className={`w-full max-w-md bg-[#FDFBF7] rounded-t-xl shadow-2xl pointer-events-auto relative transform transition-all animate-in slide-in-from-bottom duration-500 overflow-hidden ${showFullTutorial ? 'max-h-[85vh]' : ''}`}>

                <WashiTexture />
                <MizuhikiDecor />

                {/* Handle Bar */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-stone-300 rounded-full z-10" />

                {!showFullTutorial ? (
                    // Initial View
                    <div className="p-6 pt-8 relative z-10">
                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-4">
                                <AppIcon size={56} />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="h-px w-4 bg-[#C44302]"></span>
                                        <span className="text-[9px] font-bold tracking-[0.2em] text-[#C44302] uppercase">旅の始まり</span>
                                    </div>
                                    <h3 className="text-xl font-bold font-display text-stone-900">加入主畫面</h3>
                                </div>
                            </div>
                            <button onClick={handleDismiss} className="p-2 -mr-2 -mt-2 text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-stone-600 font-serif leading-relaxed mb-5 pl-1 border-l-2 border-stone-200">
                            將 <span className="font-bold text-stone-900">Winter in Kyoto</span> 加入主畫面，<br />
                            獲得最佳離線體驗與全螢幕瀏覽。
                        </p>

                        {/* Quick Instruction */}
                        {isIOS && (
                            <div className="bg-white/80 rounded-lg p-4 border border-stone-200 mb-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-center">
                                        <SafariShareIcon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-stone-800">
                                            點擊 Safari 底部 <span className="text-[#007AFF]">分享按鈕</span>
                                        </p>
                                        <p className="text-[10px] text-stone-500 mt-0.5">
                                            然後選擇「加入主畫面」
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFullTutorial(true)}
                                className="flex-1 bg-stone-900 text-[#FDFBF7] py-3.5 px-4 rounded-lg text-sm font-bold hover:bg-[#C44302] transition-colors shadow-sm"
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
                            <button onClick={handleDismiss} className="text-[10px] text-stone-400 hover:text-stone-600 font-serif italic">
                                不再顯示此提示
                            </button>
                        </div>
                    </div>
                ) : (
                    // Full Tutorial
                    <div className="flex flex-col max-h-[85vh] relative z-10">
                        {/* Header */}
                        <div className="p-4 pt-7 border-b border-stone-100 flex justify-between items-center flex-shrink-0 bg-[#FDFBF7]/90 backdrop-blur-sm">
                            <button
                                onClick={() => setShowFullTutorial(false)}
                                className="text-stone-600 text-sm font-medium flex items-center gap-1 hover:text-[#C44302] transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                返回
                            </button>
                            <div className="flex items-center gap-2">
                                <span className="h-px w-4 bg-[#C44302]"></span>
                                <span className="text-xs font-bold text-stone-900 font-serif">安裝教學</span>
                                <span className="h-px w-4 bg-[#C44302]"></span>
                            </div>
                            <button onClick={handleDismiss} className="text-stone-400 hover:text-stone-900 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 pb-8">
                            {/* Progress */}
                            <div className="flex justify-center gap-2 mb-6">
                                {tutorialSteps.map((step, idx) => (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(idx)}
                                        className={`h-1.5 rounded-full transition-all ${idx === currentStep
                                                ? 'w-8 bg-[#C44302]'
                                                : idx < currentStep
                                                    ? 'w-3 bg-emerald-500'
                                                    : 'w-3 bg-stone-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Step Content */}
                            <div className="text-center mb-2">
                                <span className="inline-block text-[10px] font-bold tracking-widest text-[#C44302] uppercase border border-[#C44302]/30 px-2 py-0.5 rounded-full bg-[#C44302]/5 mb-3">
                                    步驟 {currentStep + 1} / {tutorialSteps.length}
                                </span>
                                <h4 className="text-xl font-bold font-display text-stone-900">
                                    {tutorialSteps[currentStep].title}
                                </h4>
                                <p className="text-sm text-stone-500 mt-1 font-serif">
                                    {tutorialSteps[currentStep].description}
                                </p>
                            </div>

                            {/* Visual */}
                            {tutorialSteps[currentStep].visual}

                            {/* Navigation */}
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
                                        className="flex-1 bg-stone-900 text-[#FDFBF7] py-3 px-4 rounded-lg text-sm font-bold hover:bg-[#C44302] transition-colors flex items-center justify-center gap-1 shadow-sm"
                                    >
                                        下一步
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDismiss}
                                        className="flex-1 bg-[#C44302] text-[#FDFBF7] py-3 px-4 rounded-lg text-sm font-bold hover:bg-[#8B2500] transition-colors shadow-sm"
                                    >
                                        ✓ 完成
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
