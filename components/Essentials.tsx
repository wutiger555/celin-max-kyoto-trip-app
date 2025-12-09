import React from 'react';
import { HOTELS, FLIGHTS } from '../data/itinerary';
import { ExternalLink, BedDouble, Plane, MapIcon } from './ui/Icons';
import WeatherWidget from './WeatherWidget';

const HotelCard = ({ hotel, city }: { hotel: any, city: string }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6 group">
    <div className="h-36 bg-gray-200 relative overflow-hidden">
      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-medium tracking-wide">
        {city} • {hotel.dates}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-1 leading-tight text-gray-800">{hotel.name}</h3>
      <p className="text-xs text-gray-500 mb-3">{hotel.address}</p>
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
        <p className="text-sm font-serif text-gray-800">{hotel.japaneseAddress}</p>
      </div>
      <a 
        href={hotel.googleMapsUrl} 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
      >
        <MapIcon className="w-4 h-4" />
        查看地圖
      </a>
    </div>
  </div>
);

const FlightCard = ({ flight, title }: { flight: any, title: string }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 mb-3">
    <div className="flex items-center gap-3">
      <div className="bg-blue-50 p-2 rounded-full text-blue-600">
        <Plane className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">{title}</p>
        <p className="font-bold text-gray-800 text-lg">{flight.route}</p>
        <p className="text-xs text-gray-500">{flight.airline} • {flight.time} • {flight.code}</p>
      </div>
    </div>
  </div>
);

const Essentials: React.FC = () => {
  return (
    <div className="p-5 pb-24 space-y-8">
      <header className="pt-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">旅程資訊</h1>
        <p className="text-gray-500">Max & Celin's 2025 Winter Trip</p>
      </header>

      {/* Weather Widget Section */}
      <section>
        <WeatherWidget />
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
           <BedDouble className="w-4 h-4" /> 住宿安排
        </h2>
        <HotelCard hotel={HOTELS.kyoto} city="京都" />
        <HotelCard hotel={HOTELS.osaka} city="大阪" />
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
           <Plane className="w-4 h-4" /> 航班資訊
        </h2>
        <FlightCard flight={FLIGHTS.outbound} title="12/19 去程" />
        <FlightCard flight={FLIGHTS.inbound} title="12/24 回程" />
      </section>
      
      <section>
         <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">重要待辦事項</h2>
         <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 shadow-sm">
            <ul className="space-y-4 text-sm text-indigo-900">
                <li className="flex gap-3 items-start">
                    <span className="font-bold bg-indigo-200 px-2 py-0.5 rounded text-xs mt-0.5 text-indigo-800 whitespace-nowrap">11/22</span>
                    <span className="leading-relaxed">預約 Day 4 <span className="font-bold">味乃家</span> FastPass。</span>
                </li>
                 <li className="flex gap-3 items-start">
                    <span className="font-bold bg-red-100 px-2 py-0.5 rounded text-xs mt-0.5 text-red-800 whitespace-nowrap">盡快</span>
                    <span className="leading-relaxed">請 NOHGA Hotel 禮賓部代訂 Day 1 晚餐 <span className="font-bold">八起庵</span>。</span>
                </li>
            </ul>
         </div>
      </section>
    </div>
  );
};

export default Essentials;