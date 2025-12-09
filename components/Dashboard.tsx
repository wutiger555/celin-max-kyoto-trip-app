




import React, { useState, useEffect, useMemo } from 'react';
import WeatherWidget from './WeatherWidget';
import { ITINERARY_DATA, HOTELS, FLIGHTS } from '../data/itinerary';
import { Plane, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MapIcon, Navigation, Star, Ticket, Banknote, RefreshCw, Train, Clock, Plus, Minus, Edit } from './ui/Icons';
import { ItineraryItem } from '../types';

// --- Visual Components ---

const WashiTexture = () => (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
    />
);

const MizuhikiKnot = () => (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -right-4 z-20 drop-shadow-sm">
        {/* Stylized Awaji Knot */}
        <path d="M20 20 C 20 5, 40 5, 40 20 C 40 35, 60 35, 60 20" stroke="#C44302" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 20 C 20 35, 40 35, 40 20 C 40 5, 60 5, 60 20" stroke="#C44302" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 20 L 25 20" stroke="#C44302" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M55 20 L 65 20" stroke="#C44302" strokeWidth="2.5" strokeLinecap="round" />

        {/* White accent for depth */}
        <path d="M20 20 C 20 5, 40 5, 40 20 C 40 35, 60 35, 60 20" stroke="#FDFBF7" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6" />
    </svg>
);

const InkanStamp = ({ text }: { text: string }) => {
    const [showSecret, setShowSecret] = React.useState(false);
    const [pressTimer, setPressTimer] = React.useState<NodeJS.Timeout | null>(null);

    const handlePressStart = () => {
        const timer = setTimeout(() => setShowSecret(true), 1500);
        setPressTimer(timer);
    };

    const handlePressEnd = () => {
        if (pressTimer) clearTimeout(pressTimer);
        setPressTimer(null);
    };

    return (
        <div className="relative group cursor-default"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
        >
            {showSecret && (
                <div
                    className="fixed inset-0 z-[4000] bg-stone-900/90 flex items-center justify-center p-8 animate-in fade-in duration-500"
                    onClick={() => setShowSecret(false)}
                >
                    <div className="text-center">
                        <div className="text-6xl mb-4">💕</div>
                        <p className="text-[#FDFBF7] font-serif text-lg leading-relaxed mb-2">
                            To my dearest Celin,
                        </p>
                        <p className="text-stone-400 font-serif text-sm italic leading-relaxed max-w-xs">
                            Every step of this journey<br />
                            is sweeter because it's with you.<br />
                            — Max
                        </p>
                        <p className="text-stone-500 text-xs mt-6">tap to close</p>
                    </div>
                </div>
            )}
            <div className="w-12 h-12 border-2 border-[#C44302] rounded-lg opacity-80 rotate-12 flex items-center justify-center bg-[#C44302]/5 mix-blend-multiply backdrop-blur-[1px] transition-transform active:scale-95">
                <div className="w-10 h-10 border border-[#C44302] border-dashed rounded flex items-center justify-center">
                    <span className="text-[#C44302] font-bold text-xs writing-vertical font-serif tracking-widest leading-none">{text}</span>
                </div>
            </div>
        </div>
    );
};

const SeigaihaPattern = () => (
    <div className="absolute top-0 right-0 w-48 h-24 opacity-[0.03] pointer-events-none z-0 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
            <defs>
                <pattern id="seigaiha" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                    <path d="M0,10 A10,10 0 0,1 20,10" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,10 A10,10 0 0,1 20,10" fill="none" stroke="currentColor" strokeWidth="1" transform="translate(10, -5)" />
                </pattern>
            </defs>
            <rect width="200" height="100" fill="url(#seigaiha)" />
        </svg>
    </div>
);

// --- Helper for Time Calculation ---
const addMinutes = (timeStr: string, minsToAdd: number): string => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + minsToAdd);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

// --- Main Component ---

const Dashboard: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // Flatten the itinerary to a single linear timeline
    const timelineItems = useMemo(() => {
        return ITINERARY_DATA.flatMap(day =>
            day.items.map(item => ({
                ...item,
                dayTitle: day.title,
                dayDate: day.date,
                city: day.city
            }))
        );
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-detect current item based on real time
    useEffect(() => {
        const now = new Date();
        // Construct real dates for comparison (Assuming Dec 2025)
        const tripYear = 2025;

        let foundIndex = 0;
        let minDiff = Infinity;

        timelineItems.forEach((item, index) => {
            // Parse item time (e.g. "12/19" + "11:00")
            const [month, day] = item.dayDate.split('/').map(Number);
            const [hours, minutes] = item.time.split(':').map(Number);

            const itemDate = new Date(tripYear, month - 1, day, hours, minutes);
            const diff = Math.abs(now.getTime() - itemDate.getTime());

            if (diff < minDiff) {
                minDiff = diff;
                foundIndex = index;
            }
        });

        // If before trip, default to start
        if (now.getFullYear() < 2025 || (now.getFullYear() === 2025 && now.getMonth() < 11)) {
            setActiveIndex(0);
        } else {
            setActiveIndex(foundIndex);
        }
    }, [timelineItems]);

    // --- Currency Exchange State ---
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [jpyAmount, setJpyAmount] = useState<string>('');
    const [lastUpdated, setLastUpdated] = useState<string>('');

    // --- Travel Duration Adjustment State ---
    const [adjustedDurations, setAdjustedDurations] = useState<Record<string, number>>({});
    const [isEditingDuration, setIsEditingDuration] = useState(false);
    const [manualDurationInput, setManualDurationInput] = useState('');

    // Reset states when changing cards
    useEffect(() => {
        setIsEditingDuration(false);
    }, [activeIndex]);

    useEffect(() => {
        const fetchRate = () => {
            fetch('https://api.exchangerate-api.com/v4/latest/JPY')
                .then(res => res.json())
                .then(data => {
                    setExchangeRate(data.rates.TWD);
                    setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                })
                .catch(err => {
                    console.warn('Exchange rate fetch failed, utilizing offline backup rate.');
                    setExchangeRate(0.21); // Fallback rate
                    setLastUpdated('Offline');
                });
        };
        fetchRate();
    }, []);

    const twdAmount = useMemo(() => {
        if (!exchangeRate || !jpyAmount) return 0;
        const num = parseFloat(jpyAmount);
        return isNaN(num) ? 0 : Math.round(num * exchangeRate);
    }, [exchangeRate, jpyAmount]);

    const currentItem = timelineItems[activeIndex];

    const handlePrev = () => {
        setActiveIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setActiveIndex(prev => Math.min(timelineItems.length - 1, prev + 1));
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    // Handlers for travel duration adjustment
    const handleAdjustDuration = (delta: number) => {
        if (!currentItem.transport) return;
        setAdjustedDurations(prev => {
            const currentAdj = prev[currentItem.id] || 0;
            return { ...prev, [currentItem.id]: currentAdj + delta };
        });
    };

    const handleSaveManualDuration = () => {
        const val = parseInt(manualDurationInput, 10);
        const base = currentItem.transport?.duration || 0;
        if (!isNaN(val) && val >= 0) {
            const delta = val - base;
            setAdjustedDurations(prev => ({
                ...prev,
                [currentItem.id]: delta
            }));
        }
        setIsEditingDuration(false);
    };

    const toggleEditDuration = () => {
        if (isEditingDuration) {
            handleSaveManualDuration();
        } else {
            // Initialize input with current value
            const base = currentItem.transport?.duration || 0;
            const adj = adjustedDurations[currentItem.id] || 0;
            setManualDurationInput((base + adj).toString());
            setIsEditingDuration(true);
        }
    };

    const getStatusText = () => {
        if (activeIndex === 0) return '一期一会'; // Once in a lifetime
        return '旅の栞'; // Travel Guide
    };

    const renderFlightCard = (flight: any, label: string) => (
        <div className="bg-white border border-stone-200 rounded p-4 relative shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded">{label}</span>
                <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${flight.status === 'On Time' || flight.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-500'}`}>
                    {flight.status}
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                    <div className="text-2xl font-display font-bold text-stone-900 leading-none">{flight.departure.code}</div>
                    <div className="text-[10px] text-stone-500 font-bold mt-1">Terminal {flight.departure.terminal}</div>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                    <div className="w-full border-t border-dashed border-stone-300 relative top-2"></div>
                    <Plane className="w-4 h-4 text-stone-300 relative z-10 bg-white px-0.5 transform rotate-90" />
                    <div className="text-[9px] font-mono text-stone-400 mt-1">{flight.airline}</div>
                    <div className="text-[9px] font-mono text-stone-900 font-bold">{flight.code}</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-display font-bold text-stone-900 leading-none">{flight.arrival.code}</div>
                    <div className="text-[10px] text-stone-500 font-bold mt-1">Terminal {flight.arrival.terminal}</div>
                </div>
            </div>

            <div className="flex justify-between text-xs font-mono border-t border-stone-100 pt-3">
                <div className="text-stone-900 font-bold">{flight.departure.time}</div>
                <div className="text-stone-400">Duration 2h 30m</div>
                <div className="text-stone-900 font-bold">{flight.arrival.time}</div>
            </div>
        </div>
    );

    // Derived values for transport duration
    const baseDuration = currentItem.transport?.duration || 0;
    const adjustment = adjustedDurations[currentItem.id] || 0;
    const finalDuration = Math.max(0, baseDuration + adjustment);
    const arrivalTime = currentItem.transport && baseDuration > 0 ? addMinutes(currentItem.time, finalDuration) : null;

    return (
        <div className="p-6 min-h-full relative text-stone-900 overflow-hidden">
            <WashiTexture />
            <SeigaihaPattern />

            {/* Hero Section */}
            <header className="relative mb-8 pt-6 flex justify-between items-end">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-8 bg-[#C44302]"></span>
                        <p className="text-[10px] font-bold tracking-[0.3em] text-[#C44302] uppercase">Kyoto Winter Sync</p>
                    </div>
                    <h1 className="text-5xl font-display font-medium leading-none tracking-tight text-stone-900">
                        Winter<br />
                        <span className="text-stone-400 italic">Journey.</span>
                    </h1>
                </div>

                {/* Date Stamp */}
                <div className="mb-2 mr-2">
                    <InkanStamp text="二五年冬" />
                </div>
            </header>

            {/* Weather Widget */}
            <section className="mb-10 relative z-10">
                <WeatherWidget />
            </section>

            {/* Main Journey Card */}
            <section className="mb-12 relative z-10">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C44302]"></span>
                        {getStatusText()}
                    </h2>
                </div>

                {/* Card Container - Envelope Style */}
                <div className="relative group">
                    {/* Prominent Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#C44302] text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeIndex === timelineItems.length - 1}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#C44302] text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="bg-white relative rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 transition-all duration-500 overflow-visible z-10">

                        {/* Mizuhiki Knot */}
                        <MizuhikiKnot />

                        {/* Content */}
                        <div className="p-7 pt-9">
                            {/* Header: Date & Time */}
                            <div className="flex justify-between items-start mb-6 border-b border-stone-100 pb-4 border-dashed">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-serif tracking-widest text-stone-400 uppercase mb-1">
                                        {currentItem.city}
                                    </span>
                                    <span className="text-sm font-bold text-stone-800 font-display">
                                        {currentItem.dayDate} <span className="text-stone-300 font-normal">/</span> {currentItem.dayTitle}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-serif tracking-widest text-stone-400 uppercase mb-1 block">
                                        Time
                                    </span>
                                    <span className="text-2xl font-display font-medium text-[#C44302] leading-none">
                                        {currentItem.time}
                                    </span>
                                </div>
                            </div>

                            {/* Main Title */}
                            <div className="mb-6">
                                <div className="inline-block px-2 py-0.5 mb-2 border border-stone-200 rounded text-[9px] font-bold tracking-wider uppercase text-stone-500">
                                    {currentItem.type}
                                </div>
                                <h3 className="text-xl font-bold font-serif leading-snug text-stone-900 tracking-wide">
                                    {currentItem.title}
                                </h3>

                                {/* Transport Detail Box (If available) */}
                                {currentItem.transport && (
                                    <div className="mt-4 bg-stone-100 p-3 rounded-sm border-l-2 border-[#C44302]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Train className="w-3 h-3 text-[#C44302]" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Transport</span>
                                        </div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-bold text-stone-900 text-sm">{currentItem.transport.line}</span>
                                            {currentItem.transport.platform && <span className="text-[10px] bg-stone-200 px-1.5 py-0.5 rounded text-stone-600 font-bold">{currentItem.transport.platform}</span>}
                                        </div>
                                        <div className="flex items-center text-xs text-stone-600 font-serif mb-3">
                                            <span className="truncate">{currentItem.transport.station}</span>
                                            <span className="mx-1.5 opacity-50">➜</span>
                                            <span className="font-bold truncate">{currentItem.transport.destination}</span>
                                        </div>

                                        {/* Estimated Duration & Adjustment UI */}
                                        {baseDuration > 0 && (
                                            <div className="border-t border-stone-200 pt-2 flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">
                                                        <Clock className="w-3 h-3" />
                                                        <span>Travel Time</span>
                                                        <button onClick={toggleEditDuration} className="ml-1 hover:text-[#C44302] transition-colors p-1 rounded-full active:bg-stone-200">
                                                            <Edit className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {isEditingDuration ? (
                                                        <div className="flex items-baseline gap-1">
                                                            <input
                                                                type="number"
                                                                value={manualDurationInput}
                                                                onChange={(e) => setManualDurationInput(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveManualDuration()}
                                                                onBlur={handleSaveManualDuration}
                                                                autoFocus
                                                                className="w-12 bg-transparent border-b border-[#C44302] text-lg font-display font-bold text-stone-800 leading-none focus:outline-none p-0 m-0"
                                                            />
                                                            <span className="text-xs font-sans font-normal text-stone-500">min</span>
                                                        </div>
                                                    ) : (
                                                        <div className="text-lg font-display font-bold text-stone-800 leading-none cursor-pointer" onClick={toggleEditDuration}>
                                                            {finalDuration} <span className="text-xs font-sans font-normal text-stone-500">min</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Manual Adjustment Controls */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleAdjustDuration(-5)}
                                                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#C44302] hover:border-[#C44302] transition-colors active:bg-stone-50"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAdjustDuration(5)}
                                                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#C44302] hover:border-[#C44302] transition-colors active:bg-stone-50"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <div className="text-right border-l border-stone-200 pl-3">
                                                    <div className="text-[9px] uppercase font-bold tracking-wider text-stone-400 mb-0.5">Arrival</div>
                                                    <div className="text-sm font-bold text-[#C44302]">
                                                        {arrivalTime}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Description - Hidden if Transport info is shown to save space, unless short */}
                                {(!currentItem.transport || currentItem.description.length < 30) && (
                                    <p className="text-xs text-stone-500 font-serif leading-relaxed mt-3 text-justify">
                                        {currentItem.description}
                                    </p>
                                )}
                            </div>

                            {/* Footer: Action */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <MapIcon className="w-3 h-3 text-stone-300" />
                                    {currentItem.japaneseAddress ? (
                                        <div className="text-[10px] font-serif text-stone-600 truncate max-w-[140px]">
                                            {currentItem.japaneseAddress}
                                        </div>
                                    ) : (
                                        <div className="text-[10px] font-serif text-stone-600 truncate max-w-[140px]">
                                            {currentItem.address || "Kyoto, Japan"}
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={currentItem.googleMapsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-stone-900 text-[#FDFBF7] px-5 py-2.5 rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-[#C44302] transition-colors shadow-lg shadow-stone-200"
                                >
                                    <span>Navigate</span>
                                    <Navigation className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {timelineItems.slice(Math.max(0, activeIndex - 2), Math.min(timelineItems.length, activeIndex + 3)).map((item, idx) => {
                        const isCenter = idx === 2 || (activeIndex < 2 && idx === activeIndex) || (activeIndex > timelineItems.length - 3 && idx === 4 - (timelineItems.length - 1 - activeIndex));
                        return (
                            <div key={idx} className={`rounded-full transition-all duration-300 ${isCenter ? 'bg-[#C44302] w-1.5 h-1.5' : 'bg-stone-300 w-1 h-1'}`}></div>
                        )
                    })}
                </div>
            </section>

            {/* Minimalist Info Accordion */}
            <section className="space-y-1 relative z-10 pb-12">
                <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 pl-1">Essentials</h2>

                {/* Reusable Accordion Item */}
                {[
                    { id: 'hotels', num: '01', title: 'Accommodations', icon: <Star className="w-3 h-3" /> },
                    { id: 'flights', num: '02', title: 'Flight Info', icon: <Plane className="w-3 h-3" /> },
                    { id: 'todo', num: '03', title: 'Checklist', icon: <Ticket className="w-3 h-3" /> },
                    { id: 'currency', num: '04', title: 'Currency', icon: <Banknote className="w-3 h-3" /> }
                ].map((section) => (
                    <div key={section.id} className="group">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className={`w-full flex justify-between items-center py-4 px-4 border border-stone-100 bg-white transition-all duration-300 relative z-20
                        ${expandedSection === section.id ? 'shadow-lg border-l-4 border-l-[#C44302]' : 'hover:bg-stone-50 border-l-4 border-l-transparent'}
                    `}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`text-lg font-display italic transition-colors w-6 ${expandedSection === section.id ? 'text-[#C44302]' : 'text-stone-300'}`}>
                                    {section.num}
                                </span>
                                <span className="text-sm font-bold tracking-wide uppercase text-stone-800">
                                    {section.title}
                                </span>
                            </div>
                            <div className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                                {expandedSection === section.id ? <ChevronUp className="w-4 h-4 text-[#C44302]" /> : <ChevronDown className="w-4 h-4 text-stone-300" />}
                            </div>
                        </button>

                        {/* Content Area with Animation */}
                        <div
                            className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSection === section.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="bg-[#FDFBF7] border-x border-b border-stone-100 p-6 space-y-6 shadow-inner">

                                    {/* HOTELS CONTENT */}
                                    {section.id === 'hotels' && (
                                        <div className="space-y-6 animate-in fade-in duration-500">
                                            <div className="relative pl-4 border-l border-stone-300">
                                                <h4 className="font-bold text-stone-900 text-sm">{HOTELS.kyoto.name}</h4>
                                                <p className="text-[10px] text-stone-500 font-serif italic mb-2 tracking-wide">Kyoto • {HOTELS.kyoto.dates}</p>
                                                <a href={HOTELS.kyoto.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-[#C44302] hover:underline decoration-[#C44302] underline-offset-4">
                                                    View on Map
                                                </a>
                                            </div>
                                            <div className="relative pl-4 border-l border-stone-300">
                                                <h4 className="font-bold text-stone-900 text-sm">{HOTELS.osaka.name}</h4>
                                                <p className="text-[10px] text-stone-500 font-serif italic mb-2 tracking-wide">Osaka • {HOTELS.osaka.dates}</p>
                                                <a href={HOTELS.osaka.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-[#C44302] hover:underline decoration-[#C44302] underline-offset-4">
                                                    View on Map
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* FLIGHTS CONTENT */}
                                    {section.id === 'flights' && (
                                        <div className="space-y-4 animate-in fade-in duration-500">
                                            {renderFlightCard(FLIGHTS.outbound, "Outbound • 12/19")}
                                            {renderFlightCard(FLIGHTS.inbound, "Inbound • 12/24")}
                                        </div>
                                    )}

                                    {/* TODO CONTENT */}
                                    {section.id === 'todo' && (
                                        <div className="space-y-3 animate-in fade-in duration-500">
                                            <div className="flex items-start gap-3">
                                                <div className="w-3 h-3 bg-[#C44302] rounded-full flex-shrink-0 mt-1"></div>
                                                <div>
                                                    <p className="text-xs font-bold text-stone-900">Book Ajinoya FastPass</p>
                                                    <p className="text-[10px] text-[#C44302] font-mono mt-0.5">Due: 11/22</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 opacity-60">
                                                <div className="w-3 h-3 border border-stone-300 rounded-full flex-shrink-0 mt-1"></div>
                                                <div>
                                                    <p className="text-xs font-medium text-stone-800">Concierge: Yuzugen Reservation</p>
                                                    <p className="text-[10px] text-stone-400 font-mono mt-0.5">Contact Hotel ASAP</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* CURRENCY CONTENT */}
                                    {section.id === 'currency' && (
                                        <div className="space-y-6 animate-in fade-in duration-500">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-stone-400">
                                                <span>Rate: 1 JPY ≈ {exchangeRate || '...'} TWD</span>
                                                <div className="flex items-center gap-1">
                                                    <RefreshCw className="w-3 h-3" />
                                                    <span>{lastUpdated}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white p-6 rounded shadow-sm border border-stone-100 flex flex-col gap-6 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#C44302]/5 rounded-bl-full"></div>

                                                {/* Input JPY */}
                                                <div className="relative">
                                                    <label className="block text-[9px] font-serif tracking-widest text-stone-400 uppercase mb-1 absolute -top-3 left-0">JPY (Japanese Yen)</label>
                                                    <div className="flex items-baseline gap-2 border-b-2 border-stone-800 pb-1">
                                                        <span className="text-lg font-serif">¥</span>
                                                        <input
                                                            type="text"
                                                            inputMode="decimal"
                                                            pattern="[0-9]*"
                                                            value={jpyAmount}
                                                            onChange={(e) => setJpyAmount(e.target.value.replace(/[^0-9]/g, ''))}
                                                            placeholder="0"
                                                            className="w-full bg-transparent text-3xl font-display font-bold text-stone-900 focus:outline-none placeholder-stone-200"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-center -my-2 opacity-20">
                                                    <div className="w-px h-8 bg-stone-900"></div>
                                                </div>

                                                {/* Output TWD */}
                                                <div className="relative text-right">
                                                    <label className="block text-[9px] font-serif tracking-widest text-stone-400 uppercase mb-1 absolute -top-3 right-0">TWD (Taiwan Dollar)</label>
                                                    <div className="flex items-baseline justify-end gap-2 border-b border-dashed border-[#C44302]/30 pb-1">
                                                        <span className="text-lg font-serif text-[#C44302]">$</span>
                                                        <span className="text-3xl font-display font-bold text-[#C44302]">
                                                            {twdAmount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Decorative Footer - with hidden Easter egg */}
            <footer className="mt-16 text-center opacity-40 pb-4 relative z-10 group">
                <div className="w-px h-8 bg-stone-300 mx-auto mb-4"></div>
                <p className="text-[10px] font-serif italic tracking-widest text-stone-500">
                    C<span className="inline-block group-hover:text-[#C44302] transition-colors">♡</span>M • Winter 2025
                </p>
            </footer>

        </div>
    );
};

export default Dashboard;
