
import React, { useState, useEffect } from 'react';
import { TrainFront, Clock, AlertCircle, ChevronDown, ChevronUp, MapPin, Route, CreditCard, Ticket, Smartphone, AlertTriangle, Calculator, Map, Users, ChevronsRight, Monitor, ArrowRight, Zap, Maximize, Minimize, X, Info, Home, Navigation2 } from './ui/Icons';
import { generateSchedules, ScheduleItem } from '../data/schedules';

// --- Improved Tool Components ---

const InteractiveMetroMap = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Detailed schematic map data
  const lines = [
      { id: 'midosuji', color: '#E5171F', path: 'M 200 50 L 200 450', name: '御堂筋線' }, // Red (Central Vertical)
      { id: 'yotsubashi', color: '#0078BA', path: 'M 140 80 L 140 380', name: '四橋線' }, // Blue (Left Vertical)
      { id: 'tanimachi', color: '#522886', path: 'M 260 80 L 260 420', name: '谷町線' }, // Purple (Right Vertical)
      { id: 'chuo', color: '#009E52', path: 'M 80 200 L 320 200', name: '中央線' }, // Green (Horizontal)
      { id: 'nagahori', color: '#A9CC51', path: 'M 80 260 L 320 260', name: '長堀鶴見綠地線' }, // Lime (Horizontal)
      { id: 'sennichimae', color: '#E95496', path: 'M 80 320 L 320 320', name: '千日前線' }, // Pink (Horizontal)
  ];

  const stations = [
      // Midosuji (Red)
      { id: 'shin_osaka', name: '新大阪', x: 200, y: 50, line: 'midosuji', important: true },
      { id: 'umeda', name: '梅田', x: 200, y: 110, line: 'midosuji', important: true },
      { id: 'yodoyabashi', name: '淀屋橋', x: 200, y: 150, line: 'midosuji', important: true },
      { id: 'hommachi', name: '本町', x: 200, y: 200, line: 'midosuji' },
      { id: 'shinsaibashi', name: '心齋橋', x: 200, y: 260, line: 'midosuji', important: true },
      { id: 'namba', name: '難波', x: 200, y: 320, line: 'midosuji', important: true },
      { id: 'daikokucho', name: '大國町', x: 200, y: 380, line: 'midosuji' },
      { id: 'tennoji', name: '天王寺', x: 200, y: 420, line: 'midosuji', important: true },

      // Yotsubashi (Blue)
      { id: 'nishi_umeda', name: '西梅田', x: 140, y: 110, line: 'yotsubashi' },
      { id: 'higobashi', name: '肥後橋', x: 140, y: 150, line: 'yotsubashi', important: true }, // Near Candeo
      { id: 'yotsubashi_stn', name: '四橋', x: 140, y: 260, line: 'yotsubashi' },

      // Tanimachi (Purple)
      { id: 'higashi_umeda', name: '東梅田', x: 260, y: 110, line: 'tanimachi' },
      { id: 'temmabashi', name: '天滿橋', x: 260, y: 150, line: 'tanimachi' },
      { id: 'tanimachi4', name: '谷町四丁目', x: 260, y: 200, line: 'tanimachi' },
      
      // Intersections (already defined in Midosuji, but logically shared)
  ];

  const stationData: Record<string, { title: string, exits: string, spots: string, transfer: string }> = {
      '梅田': { title: '梅田 (Umeda)', exits: '往藍天大廈請走【中央北口】或【Exit 5】。', spots: '藍天大廈、LUCUA、大丸百貨', transfer: 'JR 大阪站、阪急線' },
      '淀屋橋': { title: '淀屋橋 (Yodoyabashi)', exits: '往 Candeo Hotel 請走【Exit 7】步行約 10 分鐘，或轉乘四橋線。', spots: '中之島光之饗宴、大阪市役所', transfer: '京阪電車' },
      '肥後橋': { title: '肥後橋 (Higobashi)', exits: 'Candeo Hotel 最近車站。請走【Exit 2】或【Exit 3】。', spots: 'Candeo Hotel, Festival Hall', transfer: '四橋線' },
      '心齋橋': { title: '心齋橋 (Shinsaibashi)', exits: '往 PARCO/大丸請走【Exit 4】直結。往北村壽喜燒走【Exit 5/6】。', spots: 'PARCO, 大丸, 商店街', transfer: '長堀鶴見綠地線' },
      '難波': { title: '難波 (Namba)', exits: '往八阪神社走【Exit 32】。往道頓堀走【Exit 14/15】。', spots: '八阪神社, 道頓堀, 高島屋', transfer: '南海電鐵 (去機場), 千日前線, 近鐵' },
      '天王寺': { title: '天王寺 (Tennoji)', exits: '往 Harukas 300 走【Exit 9/10】。往公園走【Exit 21】。', spots: 'Harukas 300, Ten-Shiba', transfer: 'JR 環狀線, 谷町線' },
  };

  const activeInfo = selectedStation ? stationData[selectedStation] : null;

  return (
    <div className="bg-[#FDFBF7] p-0 rounded-xl border border-stone-200 shadow-sm mb-6 overflow-hidden flex flex-col relative h-[500px]">
      {/* Header */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-2">
         <Map className="w-3 h-3 text-[#C44302]" />
         <span className="text-xs font-bold text-stone-800">大阪地鐵導航</span>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button onClick={() => setScale(s => Math.min(s + 0.5, 3))} className="p-2 bg-white rounded-full shadow border border-stone-200 active:bg-stone-50">
              <Maximize className="w-4 h-4 text-stone-600" />
          </button>
          <button onClick={() => setScale(s => Math.max(s - 0.5, 1))} className="p-2 bg-white rounded-full shadow border border-stone-200 active:bg-stone-50">
              <Minimize className="w-4 h-4 text-stone-600" />
          </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing bg-stone-50" style={{ touchAction: 'none' }}>
         <div 
            className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
         >
             <svg viewBox="0 0 400 500" className="w-full h-full max-w-[400px]">
                {/* Draw Lines */}
                {lines.map(line => (
                    <path 
                        key={line.id} 
                        d={line.path} 
                        stroke={line.color} 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        fill="none" 
                        className="opacity-80"
                    />
                ))}

                {/* Draw Stations */}
                {stations.map(st => (
                    <g 
                        key={st.id} 
                        onClick={() => setSelectedStation(st.name)} 
                        className="cursor-pointer transition-all hover:opacity-80"
                    >
                        {/* Connection Circle */}
                        <circle 
                            cx={st.x} 
                            cy={st.y} 
                            r={st.important ? 8 : 5} 
                            fill="white" 
                            stroke={lines.find(l => l.id === st.line)?.color} 
                            strokeWidth={selectedStation === st.name ? 4 : 2}
                            className="transition-all duration-300"
                        />
                        
                        {/* Home Icon for Candeo (Higobashi) */}
                        {st.id === 'higobashi' && (
                             <foreignObject x={st.x + 12} y={st.y - 10} width="20" height="20">
                                 <Home className="w-4 h-4 text-[#C44302]" />
                             </foreignObject>
                        )}

                        {/* Labels */}
                        <text 
                            x={st.x + (st.important ? 14 : 10)} 
                            y={st.y + 4} 
                            fontSize={st.important ? "14" : "10"} 
                            fontWeight={st.important ? "bold" : "normal"}
                            fill="#1c1917"
                            className="select-none font-sans"
                            style={{ textShadow: '0px 0px 4px white' }}
                        >
                            {st.name}
                        </text>
                    </g>
                ))}
             </svg>
         </div>
      </div>

      {/* Bottom Sheet Detail */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out z-30 ${selectedStation ? 'translate-y-0' : 'translate-y-full'}`}>
          {activeInfo ? (
              <div className="p-5 pb-8 relative">
                  <button onClick={() => setSelectedStation(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800">
                      <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-6 bg-[#C44302] rounded-full"></div>
                      <h3 className="text-lg font-bold font-display text-stone-900">{activeInfo.title}</h3>
                  </div>

                  <div className="space-y-4">
                      {/* Exits */}
                      <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                          <div className="flex items-center gap-1.5 mb-1.5 text-[#C44302] font-bold text-xs uppercase tracking-wider">
                              <Navigation2 className="w-3 h-3" />
                              出口攻略
                          </div>
                          <p className="text-sm text-stone-700 leading-relaxed font-bold">
                              {activeInfo.exits}
                          </p>
                      </div>

                      {/* Spots */}
                      <div className="flex gap-4">
                          <div className="flex-1">
                              <div className="text-[10px] text-stone-400 font-bold uppercase mb-1">周邊景點</div>
                              <div className="text-xs text-stone-800">{activeInfo.spots}</div>
                          </div>
                          <div className="flex-1 border-l border-stone-100 pl-4">
                              <div className="text-[10px] text-stone-400 font-bold uppercase mb-1">可轉乘</div>
                              <div className="text-xs text-stone-800">{activeInfo.transfer}</div>
                          </div>
                      </div>
                  </div>
              </div>
          ) : (
              <div className="p-8 text-center text-stone-400 text-sm">請點擊車站查看詳情</div>
          )}
      </div>
    </div>
  );
};

const FareCalculator = () => {
  const [route, setRoute] = useState('kyoto_arashiyama');
  
  const routes = {
    'kyoto_arashiyama': { name: '京都 → 嵐山 (JR)', price: 240, time: 16 },
    'kyoto_osaka': { name: '京都 → 大阪 (JR 新快速)', price: 580, time: 29 },
    'osaka_nara': { name: '大阪難波 → 奈良 (近鐵)', price: 680, time: 40 },
    'osaka_kix': { name: '大阪 → 關西機場 (關空快速)', price: 1210, time: 65 },
    'subway_base': { name: '大阪地鐵 (1-3站)', price: 190, time: 5 },
    'subway_mid': { name: '大阪地鐵 (跨區)', price: 240, time: 15 },
  };

  const selected = routes[route as keyof typeof routes];

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mb-6">
      <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-[#C44302]" />
        票價計算機 (ICOCA)
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">選擇路線</label>
          <div className="relative">
            <select 
              value={route} 
              onChange={(e) => setRoute(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded p-2 text-sm font-bold text-stone-800 appearance-none focus:outline-none focus:border-[#C44302]"
            >
              {Object.entries(routes).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-4">
           <div className="flex-1 bg-stone-50 rounded p-3 text-center border border-stone-100">
              <div className="text-[9px] text-stone-400 font-bold uppercase">單程票價</div>
              <div className="text-xl font-display font-bold text-stone-900">¥{selected.price}</div>
           </div>
           <div className="flex-1 bg-stone-50 rounded p-3 text-center border border-stone-100">
              <div className="text-[9px] text-stone-400 font-bold uppercase">預估時間</div>
              <div className="text-xl font-display font-bold text-stone-900">{selected.time} <span className="text-xs text-stone-500 font-sans">min</span></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const BestCarGuide = () => {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm mb-6">
       <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
        <ChevronsRight className="w-4 h-4 text-indigo-600" />
        最佳車廂建議 (避開人潮/轉乘)
      </h3>
      <div className="space-y-3">
         <div className="flex gap-3 items-start">
             <div className="bg-white p-1 rounded border border-indigo-200 text-[10px] font-bold text-indigo-600 w-12 text-center mt-0.5">HARUKA</div>
             <p className="text-xs text-indigo-800 leading-relaxed">
                <span className="font-bold">自由席在 5-6 號車廂</span>。如果是指定席通常在 1-4 號。行李架通常在車廂前後端。
             </p>
         </div>
         <div className="flex gap-3 items-start">
             <div className="bg-white p-1 rounded border border-indigo-200 text-[10px] font-bold text-indigo-600 w-12 text-center mt-0.5">御堂筋線</div>
             <p className="text-xs text-indigo-800 leading-relaxed">
                <span className="font-bold">建議搭乘 6 號或 10 號車廂</span> (中間偏後)。這兩節車廂通常離梅田、心齋橋的手扶梯/電梯最近。
             </p>
         </div>
         <div className="flex gap-3 items-start">
             <div className="bg-white p-1 rounded border border-indigo-200 text-[10px] font-bold text-indigo-600 w-12 text-center mt-0.5">新幹線</div>
             <p className="text-xs text-indigo-800 leading-relaxed">
                若需在新大阪轉乘，請盡量搭乘 <span className="font-bold">中間車廂 (8-10號)</span>，離轉乘閘門最近。
             </p>
         </div>
      </div>
    </div>
  );
};

// --- Existing Components (Updated with Crowd Logic) ---

const RouteVisual = ({ stops, color }: { stops: string[], color: string }) => (
    <div className="flex items-center justify-between relative px-4 py-6">
        {/* Line */}
        <div className="absolute left-4 right-4 top-1/2 h-1 bg-stone-200 -z-10"></div>
        <div className={`absolute left-4 right-4 top-1/2 h-1 ${color} -z-10 opacity-40`}></div>

        {stops.map((stop, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 bg-[#FDFBF7] px-2 z-10">
                <div className={`w-3 h-3 rounded-full border-2 ${idx === 0 || idx === stops.length -1 ? `bg-white ${color.replace('bg-', 'border-')}` : 'bg-stone-200 border-stone-300'}`}></div>
                <span className={`text-[10px] font-bold ${idx === 0 || idx === stops.length -1 ? 'text-stone-900' : 'text-stone-400'}`}>{stop}</span>
            </div>
        ))}
    </div>
);

const TrainFormation = () => (
    <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 mb-6">
        <h4 className="text-xs font-bold text-stone-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            注意：列車分離作業 (關空快速)
        </h4>
        <div className="flex items-center overflow-x-auto pb-2 gap-1">
            {/* Cars 1-4 */}
            <div className="flex gap-0.5">
                {[4, 3, 2, 1].map(num => (
                    <div key={num} className="w-10 h-14 bg-blue-50 border border-blue-200 rounded-sm flex flex-col items-center justify-center relative">
                        <span className="text-[10px] font-bold text-blue-800">{num}</span>
                        <span className="text-[8px] text-blue-500">機場</span>
                        {/* Connector */}
                        <div className="absolute -right-1 top-1/2 w-1 h-2 bg-stone-400"></div>
                    </div>
                ))}
            </div>
            
            {/* Split Indicator */}
            <div className="mx-2 flex flex-col items-center justify-center">
                <div className="h-full border-l border-dashed border-stone-400 h-10"></div>
                <span className="text-[9px] text-stone-400 my-1">日根野站分離</span>
            </div>

            {/* Cars 5-8 */}
            <div className="flex gap-0.5 opacity-60">
                {[8, 7, 6, 5].map(num => (
                    <div key={num} className="w-10 h-14 bg-stone-100 border border-stone-200 rounded-sm flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-stone-600">{num}</span>
                        <span className="text-[8px] text-stone-400">和歌山</span>
                    </div>
                ))}
            </div>
        </div>
        <p className="text-[10px] text-stone-500 mt-2 leading-relaxed">
            從大阪出發時是 8 節車廂，但在「日根野站」會分開。請務必搭乘 <span className="font-bold text-blue-600">第 1 ~ 4 號車廂</span> 才能抵達關西機場。
        </p>
    </div>
);

const ScheduleBoard = ({ routeKey, title, from, to }: { routeKey: string, title: string, from: string, to: string }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const generated = generateSchedules(routeKey, timeStr);
        setSchedules(generated);
        return () => clearInterval(timer);
    }, [routeKey, currentTime.getMinutes()]); 

    const getCountdown = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        const now = new Date();
        const trainTime = new Date();
        trainTime.setHours(h, m, 0, 0);
        if (trainTime.getTime() < now.getTime()) trainTime.setDate(trainTime.getDate() + 1);
        const diffMs = trainTime.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins <= 0) return 'Departing';
        return `${diffMins} min`;
    };

    const getCrowdIcon = (crowd?: string) => {
        if (crowd === 'High') return <Users className="w-3 h-3 text-red-500" />;
        if (crowd === 'Medium') return <Users className="w-3 h-3 text-yellow-500" />;
        return <Users className="w-3 h-3 text-emerald-500" />;
    };

    return (
        <div className="bg-stone-900 text-white rounded-lg p-4 shadow-xl mb-6 border border-stone-700">
            <div className="flex justify-between items-end mb-4 border-b border-stone-700 pb-2">
                <div>
                    <h3 className="text-[#C44302] font-bold text-xs tracking-widest uppercase mb-1 flex items-center gap-1">
                        <Monitor className="w-3 h-3 animate-pulse" />
                        即時發車看板
                    </h3>
                    <div className="text-xl font-bold font-display">{title}</div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-stone-400 font-mono">現在時間</div>
                    <div className="text-2xl font-mono font-bold leading-none text-emerald-400">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-6 text-[9px] uppercase tracking-widest text-stone-500 mb-1 px-2">
                    <div>發車</div>
                    <div className="col-span-2">車種 / 目的地</div>
                    <div className="text-center">狀態</div>
                    <div className="text-center">擁擠</div>
                    <div className="text-right">月台</div>
                </div>
                {schedules.map((item, idx) => {
                    const countdown = getCountdown(item.time);
                    const isImminent = countdown === 'Departing' || (parseInt(countdown) < 5);

                    return (
                        <div key={idx} className={`grid grid-cols-6 items-center bg-stone-800/50 rounded px-2 py-2 border-l-2 ${idx === 0 ? 'border-emerald-500 bg-stone-800' : 'border-transparent'}`}>
                            <div className={`font-mono font-bold ${idx === 0 ? 'text-white' : 'text-stone-400'}`}>{item.time}</div>
                            <div className="col-span-2">
                                <div className="text-xs font-bold text-stone-200">{item.type}</div>
                                <div className="text-[10px] text-stone-500">往 {item.destination}</div>
                            </div>
                            <div className={`text-center text-[10px] font-bold ${isImminent ? 'text-yellow-400 animate-pulse' : 'text-emerald-500'}`}>
                                {countdown}
                            </div>
                            <div className="flex justify-center" title={`Crowd: ${item.crowd}`}>
                                {getCrowdIcon(item.crowd)}
                            </div>
                            <div className="text-right">
                                <span className="bg-stone-700 text-stone-300 text-[10px] font-bold px-1.5 py-0.5 rounded">{item.track}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-3 flex items-start gap-2 text-[10px] text-stone-400 bg-stone-800 p-2 rounded">
                 <Clock className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                 <span>建議發車前 15 分鐘抵達月台候車。擁擠度為系統預測。</span>
            </div>
        </div>
    );
};

const GuideCard = ({ title, color, steps }: { title: string, color: string, steps: {icon?: any, text: string, detail?: string}[] }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm mb-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-stone-50 border-b border-stone-100">
                <div className="flex items-center gap-3">
                    <div className={`w-1 h-6 rounded-full ${color}`}></div>
                    <h3 className="font-bold text-stone-800 text-sm">{title}</h3>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400"/> : <ChevronDown className="w-4 h-4 text-stone-400"/>}
            </button>
            
            {isOpen && (
                <div className="p-5 space-y-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative pl-6 pb-2 last:pb-0">
                            {idx !== steps.length - 1 && <div className="absolute left-[9px] top-2 bottom-0 w-px bg-stone-200 border-l border-dashed border-stone-300"></div>}
                            <div className="absolute left-0 top-1 w-5 h-5 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 shadow-sm z-10 text-[10px] font-bold">
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-stone-900 mb-1 flex items-center gap-2">
                                    {step.icon}
                                    {step.text}
                                </h4>
                                {step.detail && <p className="text-xs text-stone-500 leading-relaxed font-serif bg-stone-50 p-2 rounded border border-stone-100">{step.detail}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TicketInfo = ({ type, price, tips }: { type: string, price: string, tips: string }) => (
    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-4 flex items-start gap-3">
        <div className="bg-white p-2 rounded-full border border-emerald-200 text-emerald-600 mt-1">
            <Ticket className="w-4 h-4" />
        </div>
        <div>
            <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1">{type}</h5>
            <p className="text-sm font-bold text-emerald-700 mb-1">{price}</p>
            <p className="text-[10px] text-emerald-600 leading-relaxed">{tips}</p>
        </div>
    </div>
);

// --- Main Component ---

const TransportGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'KIX_IN' | 'KYO_OSA' | 'KIX_OUT' | 'TOOLS'>('KIX_IN');

  return (
    <div className="p-5 pb-24 min-h-full bg-[#FDFBF7]">
      <header className="mb-6">
        <h1 className="text-3xl font-bold font-display text-stone-900 mb-2">Traffic Guide</h1>
        <p className="text-stone-500 text-xs font-serif italic">關西交通完全攻略 • 時刻表</p>
      </header>

      {/* Navigation Pills */}
      <div className="flex bg-stone-200 p-1 rounded-lg mb-6 shadow-inner overflow-x-auto">
          <button onClick={() => setActiveTab('KIX_IN')} className={`flex-1 py-2 px-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'KIX_IN' ? 'bg-white text-[#C44302] shadow-sm scale-[1.02]' : 'text-stone-500 hover:text-stone-700'}`}>機場 → 京都</button>
          <button onClick={() => setActiveTab('KYO_OSA')} className={`flex-1 py-2 px-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'KYO_OSA' ? 'bg-white text-[#C44302] shadow-sm scale-[1.02]' : 'text-stone-500 hover:text-stone-700'}`}>京都 → 大阪</button>
          <button onClick={() => setActiveTab('KIX_OUT')} className={`flex-1 py-2 px-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'KIX_OUT' ? 'bg-white text-[#C44302] shadow-sm scale-[1.02]' : 'text-stone-500 hover:text-stone-700'}`}>回程機場</button>
          <button onClick={() => setActiveTab('TOOLS')} className={`flex-1 py-2 px-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'TOOLS' ? 'bg-white text-[#C44302] shadow-sm scale-[1.02]' : 'text-stone-500 hover:text-stone-700'}`}>工具箱 Tools</button>
      </div>

      {activeTab === 'KIX_IN' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <RouteVisual stops={['KIX 機場', '天王寺', '新大阪', '京都車站']} color="bg-blue-500" />
               <ScheduleBoard routeKey="KIX_KYOTO" title="HARUKA 特急" from="Kansai Airport" to="Kyoto Station" />
               <TicketInfo type="HARUKA 優惠票 (Klook)" price="¥2,900" tips="找「白色自動兌換機」領取實體車票。亦可使用 ICOCA 直接進站 (需另補特急券)。" />
               <GuideCard title="如何搭乘 HARUKA" color="bg-blue-500" steps={[
                  { icon: <MapPin className="w-3 h-3"/>, text: "抵達關西機場 T1", detail: "入境後搭手扶梯上 2F，通過空橋走到對面的「關西機場車站」。" },
                  { icon: <Smartphone className="w-3 h-3"/>, text: "B 閘口進站 (JR 線)", detail: "請認明「藍色」的 JR 改札口 (不要走去紅色的南海電鐵)。" },
                  { icon: <TrainFront className="w-3 h-3"/>, text: "4 號月台候車", detail: "搭手扶梯下樓至 4 號月台。尋找白色車身、有 Hello Kitty 彩繪的列車。" }
               ]} />
          </div>
      )}

      {activeTab === 'KYO_OSA' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <RouteVisual stops={['京都', '高槻', '新大阪', '大阪 (梅田)']} color="bg-indigo-500" />
               <ScheduleBoard routeKey="KYOTO_OSAKA" title="JR 京都線 (新快速)" from="Kyoto Station" to="Osaka Station" />
               <TicketInfo type="使用 ICOCA 刷卡" price="¥580" tips="直接刷卡進出站，不需劃位。請搭乘「新快速」最快。" />
               <GuideCard title="搭乘 JR 新快速 (Special Rapid)" color="bg-indigo-500" steps={[
                  { icon: <MapPin className="w-3 h-3"/>, text: "京都車站進站", detail: "建議由「中央口」進站。尋找「JR 京都線 (往大阪/姬路)」。通常在 4 或 5 號月台。" },
                  { icon: <Zap className="w-3 h-3"/>, text: "確認車種", detail: "務必搭乘「新快速 (藍色字)」(29分)。不要搭「普通 (黃色字)」(45分+)。" }
               ]} />
          </div>
      )}

      {activeTab === 'KIX_OUT' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <RouteVisual stops={['大阪', '西九條', '天王寺', '日根野', '關西機場']} color="bg-orange-500" />
               <ScheduleBoard routeKey="OSAKA_KIX" title="JR 關空快速" from="Osaka Station" to="Kansai Airport" />
               <TrainFormation />
               <GuideCard title="搭乘關空快速" color="bg-orange-500" steps={[
                  { icon: <MapPin className="w-3 h-3"/>, text: "大阪站 1 號月台", detail: "前往大阪環狀線 1 號月台。電子看板顯示「關空快速」。" },
                  { icon: <AlertTriangle className="w-3 h-3 text-red-500"/>, text: "檢查車廂號碼", detail: "請務必走到「前 4 節車廂」。後 4 節會在日根野分離往和歌山。" }
               ]} />
          </div>
      )}

      {activeTab === 'TOOLS' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="mb-4">
                  <h2 className="text-xl font-bold font-display text-stone-900">Travel Tools</h2>
                  <p className="text-xs text-stone-500">實用交通小工具</p>
               </div>
               
               <InteractiveMetroMap />
               <FareCalculator />
               <BestCarGuide />
          </div>
      )}

    </div>
  );
};

export default TransportGuide;