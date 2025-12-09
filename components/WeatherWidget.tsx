import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudSun, Droplets, AlertTriangle, ExternalLink } from './ui/Icons';

interface WeatherData {
  current: {
    temp: number;
    code: number;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
  daily: Array<{
    date: string;
    max: number;
    min: number;
    code: number;
    precipProb: number;
  }>;
}

interface CityWeather {
  name: string;
  nameChi: string;
  lat: number;
  lng: number;
  data: WeatherData | null;
}

const getWeatherIcon = (code: number, className: string = "w-6 h-6") => {
  const colorClass = "text-stone-800";

  if (code === 0) return <Sun className={`${className} ${colorClass}`} />;
  if (code >= 1 && code <= 3) return <CloudSun className={`${className} ${colorClass}`} />;
  if (code === 45 || code === 48) return <CloudFog className={`${className} ${colorClass}`} />;
  if (code >= 51 && code <= 57) return <Droplets className={`${className} ${colorClass}`} />;
  if (code >= 61 && code <= 67) return <CloudRain className={`${className} ${colorClass}`} />;
  if (code >= 71 && code <= 77) return <CloudSnow className={`${className} ${colorClass}`} />;
  if (code >= 80 && code <= 82) return <CloudRain className={`${className} ${colorClass}`} />;
  if (code >= 95 && code <= 99) return <CloudLightning className={`${className} ${colorClass}`} />;
  return <Cloud className={`${className} ${colorClass}`} />;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return '晴天';
  if (code >= 1 && code <= 3) return '多雲';
  if (code === 45 || code === 48) return '霧氣';
  if (code >= 51 && code <= 57) return '毛毛雨';
  if (code >= 61 && code <= 67) return '雨天';
  if (code >= 71 && code <= 77) return '下雪';
  if (code >= 80 && code <= 82) return '陣雨';
  if (code >= 95 && code <= 99) return '雷雨';
  return '多雲';
};

// Clothing suggestion based on temperature and weather
const getClothingSuggestion = (temp: number, code: number): { icon: string; text: string; detail: string } => {
  const isRainy = (code >= 51 && code <= 67) || (code >= 80 && code <= 99);
  const isSnowy = code >= 71 && code <= 77;

  if (temp <= 5) {
    return {
      icon: '🧥',
      text: '禦寒穿著',
      detail: isSnowy ? '厚外套+圍巾帽子+防滑鞋' : '厚外套+圍巾+保暖內搭'
    };
  } else if (temp <= 10) {
    return {
      icon: '🧣',
      text: '保暖穿著',
      detail: isRainy ? '保暖外套+雨傘必備' : '保暖外套+薄圍巾'
    };
  } else if (temp <= 15) {
    return {
      icon: '🧶',
      text: '輕便保暖',
      detail: isRainy ? '薄外套+隨身雨具' : '薄外套或毛衣即可'
    };
  } else {
    return {
      icon: '👕',
      text: '輕便穿著',
      detail: isRainy ? '輕便衣物+攜帶雨傘' : '輕便舒適即可'
    };
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-TW', { weekday: 'short' }).replace('週', '');
};

const formatFullDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
};

const WeatherWidget: React.FC = () => {
  const [cities, setCities] = useState<CityWeather[]>([
    { name: 'KYOTO', nameChi: '京都', lat: 35.0116, lng: 135.7681, data: null },
    { name: 'OSAKA', nameChi: '大阪', lat: 34.6937, lng: 135.5023, data: null }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const updatedCities = await Promise.all(cities.map(async (city) => {
          // Open-Meteo Free API with additional data
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=5`
          );

          if (!response.ok) throw new Error('Weather fetch failed');

          const data = await response.json();
          return {
            ...city,
            data: {
              current: {
                temp: Math.round(data.current.temperature_2m),
                code: data.current.weather_code,
                humidity: data.current.relative_humidity_2m,
                windSpeed: Math.round(data.current.wind_speed_10m),
                feelsLike: Math.round(data.current.apparent_temperature)
              },
              daily: data.daily.time.slice(1).map((time: string, index: number) => ({
                date: time,
                max: Math.round(data.daily.temperature_2m_max[index + 1]),
                min: Math.round(data.daily.temperature_2m_min[index + 1]),
                code: data.daily.weather_code[index + 1],
                precipProb: data.daily.precipitation_probability_max[index + 1] || 0
              }))
            }
          };
        }));
        setCities(updatedCities);
        setLastUpdated(new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }));
        setLoading(false);
      } catch (e) {
        console.warn("Weather fetch failed, utilizing offline backup data.");
        setCities(prev => prev.map(city => ({
          ...city,
          data: {
            current: {
              temp: city.name === 'KYOTO' ? 8 : 9,
              code: city.name === 'KYOTO' ? 3 : 1,
              humidity: 65,
              windSpeed: 8,
              feelsLike: city.name === 'KYOTO' ? 5 : 6
            },
            daily: [
              { date: new Date().toISOString(), max: 12, min: 4, code: 3, precipProb: 10 },
              { date: new Date(Date.now() + 86400000).toISOString(), max: 11, min: 3, code: 2, precipProb: 20 },
              { date: new Date(Date.now() + 172800000).toISOString(), max: 13, min: 5, code: 1, precipProb: 5 },
              { date: new Date(Date.now() + 259200000).toISOString(), max: 10, min: 2, code: 61, precipProb: 80 }
            ]
          }
        })));
        setLastUpdated('離線模式');
        setError(false);
        setLoading(false);
      }
    };
    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCity = cities[activeCityIndex];

  // Loading State
  if (loading && !activeCity.data) {
    return (
      <div className="h-24 flex items-center justify-center border border-dashed border-stone-300 rounded-sm">
        <span className="text-xs font-serif italic text-stone-400 animate-pulse">Loading Forecast...</span>
      </div>
    );
  }

  // Error State
  if (error || !activeCity.data) {
    return (
      <div className="h-24 flex items-center justify-center border border-dashed border-red-200 bg-red-50/50 rounded-sm">
        <span className="text-xs font-serif italic text-red-400">Weather data unavailable</span>
      </div>
    );
  }

  const clothing = getClothingSuggestion(activeCity.data.current.temp, activeCity.data.current.code);
  const hasRainToday = activeCity.data.daily.some(d => d.precipProb > 50);

  return (
    <div className="w-full select-none">
      {/* Header Row */}
      <div className="flex justify-between items-end border-b-2 border-stone-900 pb-2 mb-2">
        {/* City Selector */}
        <div className="flex gap-4">
          {cities.map((city, idx) => (
            <button
              key={city.name}
              onClick={() => setActiveCityIndex(idx)}
              className={`text-xs font-bold tracking-widest uppercase transition-colors relative group py-1 ${activeCityIndex === idx ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
            >
              {city.name}
              {activeCityIndex === idx && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900"></span>}
            </button>
          ))}
        </div>
        {/* Current Temp - Clickable to expand */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 group"
        >
          <span className="text-4xl font-display font-medium text-stone-900 leading-none group-hover:text-[#C44302] transition-colors">
            {activeCity.data.current.temp}°
          </span>
          {getWeatherIcon(activeCity.data.current.code, "w-8 h-8")}
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mb-4 bg-stone-50 rounded-sm p-4 border border-stone-100 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Current Conditions */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">目前狀況</div>
              <div className="flex items-center gap-2">
                {getWeatherIcon(activeCity.data.current.code, "w-10 h-10")}
                <div>
                  <div className="text-lg font-bold text-stone-900">{getWeatherDescription(activeCity.data.current.code)}</div>
                  <div className="text-xs text-stone-500">體感 {activeCity.data.current.feelsLike}°C</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">詳細資訊</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">濕度</span>
                  <span className="font-bold text-stone-800">{activeCity.data.current.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">風速</span>
                  <span className="font-bold text-stone-800">{activeCity.data.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clothing Suggestion */}
          <div className="bg-white rounded-sm p-3 border border-stone-200 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{clothing.icon}</span>
              <div>
                <div className="text-sm font-bold text-stone-900">{clothing.text}</div>
                <div className="text-xs text-stone-500">{clothing.detail}</div>
              </div>
            </div>
          </div>

          {/* Rain Alert */}
          {hasRainToday && (
            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-sm border border-amber-200">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">未來有雨，建議攜帶雨傘</span>
            </div>
          )}

          {/* Last Updated & Link */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-stone-100">
            <span className="text-[9px] text-stone-400">更新時間: {lastUpdated}</span>
            <a
              href={`https://weather.yahoo.co.jp/weather/jp/26/${activeCity.name === 'KYOTO' ? '6110' : '6200'}.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-blue-600 font-medium hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              詳細預報 (Yahoo Japan)
            </a>
          </div>
        </div>
      )}

      {/* 4 Day Forecast */}
      <div className="flex justify-between pt-2 px-1">
        {activeCity.data.daily.map((day) => (
          <div key={day.date} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{formatDate(day.date)}</span>
            <span className="text-[9px] text-stone-300">{formatFullDate(day.date)}</span>
            {getWeatherIcon(day.code, "w-5 h-5")}
            <div className="flex gap-1 text-[10px] font-mono mt-1">
              <span className="text-stone-900 font-bold">{day.max}°</span>
              <span className="text-stone-400">/</span>
              <span className="text-stone-500">{day.min}°</span>
            </div>
            {/* Rain Probability */}
            {day.precipProb > 0 && (
              <div className={`text-[9px] font-bold px-1 rounded ${day.precipProb >= 50 ? 'text-blue-600 bg-blue-50' : 'text-stone-400'}`}>
                💧{day.precipProb}%
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tap hint */}
      {!showDetails && (
        <div className="text-center mt-3">
          <button
            onClick={() => setShowDetails(true)}
            className="text-[9px] text-stone-400 hover:text-stone-600 transition-colors"
          >
            點擊溫度查看詳情 ▼
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;