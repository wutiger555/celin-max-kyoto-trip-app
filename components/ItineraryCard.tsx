
import React, { useState } from 'react';
import { ItineraryItem, ActivityType } from '../types';
import { ActivityIcon, ChevronDown, ChevronUp, Car, MapIcon, Navigation, Train, Footprints, Clock, Star, ExternalLink, Share } from './ui/Icons';

interface ItineraryCardProps {
  item: ItineraryItem;
  isActive: boolean;
  onClick?: () => void;
}

// Decorative Asanoha (Hemp Leaf) Pattern
const AsanohaPattern = () => (
  <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] pointer-events-none overflow-hidden">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <pattern id="asanoha" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M10 0 L10 20 M0 10 L20 10 M0 0 L20 20 M20 0 L0 20"
          stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  </div>
);

// Small Hanko (Stamp) for card type
const TypeHanko = ({ type }: { type: ActivityType }) => {
  const getTypeLabel = () => {
    switch (type) {
      case ActivityType.FOOD: return '食';
      case ActivityType.SIGHTSEEING: return '観';
      case ActivityType.TRAIN: return '駅';
      case ActivityType.FLIGHT: return '空';
      case ActivityType.HOTEL: return '宿';
      default: return '旅';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case ActivityType.FOOD: return 'border-red-400 text-red-400 bg-red-50/50';
      case ActivityType.SIGHTSEEING: return 'border-blue-400 text-blue-400 bg-blue-50/50';
      case ActivityType.TRAIN: return 'border-emerald-500 text-emerald-500 bg-emerald-50/50';
      case ActivityType.FLIGHT: return 'border-slate-500 text-slate-500 bg-slate-50/50';
      case ActivityType.HOTEL: return 'border-purple-400 text-purple-400 bg-purple-50/50';
      default: return 'border-stone-400 text-stone-400 bg-stone-50/50';
    }
  };

  return (
    <div className={`w-9 h-9 rounded border-[1.5px] flex items-center justify-center rotate-6 ${getTypeColor()}`}>
      <span className="text-sm font-bold font-serif">{getTypeLabel()}</span>
    </div>
  );
};

// Estimated cost component
const EstimatedCost = ({ type }: { type: ActivityType }) => {
  const getCostEstimate = () => {
    switch (type) {
      case ActivityType.FOOD: return '¥1,500 ~ ¥3,000';
      case ActivityType.SIGHTSEEING: return '¥400 ~ ¥800';
      case ActivityType.HOTEL: return '已預付';
      case ActivityType.TRAIN: return '交通卡扣';
      default: return null;
    }
  };

  const cost = getCostEstimate();
  if (!cost) return null;

  return (
    <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
      <span className="font-medium">預估費用:</span>
      <span className="font-bold text-stone-600">{cost}</span>
    </div>
  );
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({ item, isActive, onClick }) => {
  const [showTaxi, setShowTaxi] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const [copied, setCopied] = useState(false);

  // Share/Copy function
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `📍 ${item.title}\n⏰ ${item.time}\n${item.address || ''}\n${item.googleMapsUrl || ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareText,
          url: item.googleMapsUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Styling based on activity type
  const getAccentColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FOOD: return '#D44A28'; // Vermilion red
      case ActivityType.SIGHTSEEING: return '#2E5A8A'; // Indigo blue
      case ActivityType.TRAIN: return '#1B7340'; // Matcha green
      case ActivityType.FLIGHT: return '#555555'; // Charcoal
      case ActivityType.HOTEL: return '#6B4C9A'; // Fuji purple
      default: return '#8B7355'; // Warm brown
    }
  };

  const accentColor = getAccentColor(item.type);

  // Taxi Card Overlay
  if (showTaxi && item.japaneseAddress) {
    return (
      <div className="fixed inset-0 z-[3000] bg-stone-900/98 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200" onClick={(e) => { e.stopPropagation(); setShowTaxi(false); }}>
        <p className="text-stone-400 mb-4 text-sm tracking-wide font-serif">タクシー運転手に見せてください</p>
        <p className="text-stone-500 mb-6 text-xs">請出示給司機看</p>

        <div className="bg-[#FDFBF7] p-8 rounded-sm w-full max-w-sm shadow-2xl relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#C44302]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#C44302]"></div>

          <p className="text-2xl font-bold text-stone-900 leading-relaxed font-serif py-8 tracking-wider">
            {item.japaneseAddress}
          </p>

          {item.address && (
            <p className="text-xs text-stone-400 mt-4 border-t border-stone-100 pt-4">{item.address}</p>
          )}
        </div>

        <button className="mt-8 text-white/80 px-8 py-3 rounded-full border border-white/20 active:bg-white/10 transition-colors text-sm tracking-widest">
          閉じる / 關閉
        </button>
      </div>
    );
  }

  // Special Hotel Style
  const isHotel = item.type === ActivityType.HOTEL;

  return (
    <div
      className={`relative pl-5 pb-8 border-l-2 last:border-l-0 transition-all duration-300 ${isActive ? 'border-[#C44302]' : 'border-stone-200'}`}
      onClick={onClick}
    >
      {/* Timeline Dot - Styled like a small lantern */}
      <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-2 border-[#FDFBF7] shadow-md transition-all duration-300 flex items-center justify-center
        ${isActive ? 'bg-[#C44302] scale-110' : isHotel ? 'bg-purple-400' : 'bg-stone-300'}`}>
        {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
      </div>

      {/* Time Badge */}
      <div className={`inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 rounded-full border text-xs font-bold tracking-wide transition-colors duration-300
        ${isActive ? 'border-[#C44302] text-[#C44302] bg-[#C44302]/5' : 'border-stone-200 text-stone-400 bg-white'}`}>
        <Clock className="w-3 h-3" />
        {item.time}
      </div>

      {/* Card Body */}
      <div className={`
        relative rounded-sm p-5 transition-all duration-300 border overflow-hidden
        ${isActive
          ? 'bg-white border-l-4 shadow-lg transform scale-[1.01]'
          : 'bg-white/80 border-stone-100 hover:bg-white hover:shadow-sm'}
        ${isHotel ? 'border-l-purple-400' : ''}
      `}
        style={{ borderLeftColor: isActive ? accentColor : undefined }}
      >
        <AsanohaPattern />

        {/* Header Row */}
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex-1 pr-3">
            <h3 className="font-bold text-stone-800 text-lg leading-snug tracking-tight font-serif">{item.title}</h3>

            {/* Address with subtle styling */}
            {item.address && (
              <p className="text-[11px] text-stone-400 mt-1 flex items-center gap-1 font-medium">
                <MapIcon className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{item.address}</span>
              </p>
            )}
          </div>

          {/* Type Hanko */}
          <TypeHanko type={item.type} />
        </div>

        {/* Transport Dashboard - Enhanced with Wabi-Sabi aesthetics */}
        {item.transport && (
          <div className="my-4 bg-gradient-to-br from-stone-800 to-stone-900 rounded-sm p-4 text-white shadow-inner relative overflow-hidden">
            {/* Subtle wave pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M0,15 Q25,5 50,15 T100,15" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="flex justify-between items-center mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <Train className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold">交通方式</span>
              </div>
              {item.transport.platform && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
                  {item.transport.platform}
                </span>
              )}
            </div>

            <div className="relative z-10">
              <p className="text-base font-bold leading-tight mb-2">{item.transport.line}</p>

              <div className="flex items-center gap-2 text-xs text-stone-300">
                <span className="border border-stone-600 px-1.5 py-0.5 rounded-sm text-[10px]">{item.transport.station}</span>
                <span className="text-emerald-400">→</span>
                <span className="font-bold text-white">{item.transport.destination}</span>
              </div>

              {item.transport.duration && (
                <div className="mt-3 pt-2 border-t border-stone-700 flex items-center gap-1.5 text-stone-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-medium">約 {item.transport.duration} 分鐘</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-stone-600 mb-4 leading-relaxed tracking-wide font-serif text-justify">
          {item.description}
        </p>

        {/* Walking Guide Box - Zen garden inspired */}
        {item.walkingGuide && (isActive || item.transport) && (
          <div className="mb-4 bg-gradient-to-r from-[#FDFBF7] to-stone-50 border border-stone-200 rounded-sm p-3 relative overflow-hidden">
            {/* Sand ripple pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 200 4" preserveAspectRatio="none">
                <path d="M0,2 Q10,0 20,2 T40,2 T60,2 T80,2 T100,2 T120,2 T140,2 T160,2 T180,2 T200,2"
                  fill="none" stroke="#8B7355" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 text-stone-400 flex-shrink-0">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">步行指南</p>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {item.walkingGuide}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Info Row - Enhanced with dynamic data */}
        {isActive && (
          <div className="mb-4 bg-stone-50/50 rounded-sm p-3 border border-stone-100">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-stone-500">
              {/* Estimated Cost - Use item data if available, otherwise fallback */}
              {(item.estimatedCost || item.type === ActivityType.FOOD || item.type === ActivityType.SIGHTSEEING) && (
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-400">💰</span>
                  <span className="font-medium">{item.estimatedCost || (item.type === ActivityType.FOOD ? '¥1,500~3,000' : '¥400~800')}</span>
                </div>
              )}

              {/* Business Hours */}
              {item.businessHours && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span className="font-medium">{item.businessHours}</span>
                </div>
              )}

              {/* Closed Days */}
              {item.closedDays && (
                <div className="flex items-center gap-1.5 text-red-500">
                  <span>🚫</span>
                  <span className="font-medium">{item.closedDays}</span>
                </div>
              )}

              {/* Reservation Required */}
              {(item.reservationRequired || item.type === ActivityType.FOOD) && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <span>📝</span>
                  <span className="font-medium">建議預約</span>
                </div>
              )}

              {/* Popular Spot Indicator */}
              {item.type === ActivityType.SIGHTSEEING && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span className="font-medium text-amber-600">熱門景點</span>
                </div>
              )}
            </div>

            {/* Extended Info Links */}
            {(item.phone || item.website || item.instagramTag) && (
              <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-stone-100">
                {/* Phone Link */}
                {item.phone && (
                  <a
                    href={`tel:${item.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[10px] text-blue-600 font-medium hover:underline"
                  >
                    📞 {item.phone}
                  </a>
                )}

                {/* Website Link */}
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[10px] text-blue-600 font-medium hover:underline"
                  >
                    🌐 官方網站
                  </a>
                )}

                {/* Instagram Tag */}
                {item.instagramTag && (
                  <a
                    href={`https://www.instagram.com/explore/tags/${item.instagramTag.replace('#', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-[10px] text-pink-600 font-medium hover:underline"
                  >
                    📸 {item.instagramTag}
                  </a>
                )}
              </div>
            )}

            {/* Tips Section */}
            {item.tips && item.tips.length > 0 && (
              <div className="mt-2 pt-2 border-t border-stone-100">
                <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1">小提示</p>
                <ul className="space-y-1">
                  {item.tips.map((tip, idx) => (
                    <li key={idx} className="text-[10px] text-stone-600 flex items-start gap-1.5">
                      <span className="text-amber-500">✦</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex gap-2 flex-wrap">
          {item.japaneseAddress && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowTaxi(true); }}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-white text-xs font-bold rounded-sm active:scale-95 transition-all shadow-sm tracking-wide"
            >
              <Car className="w-3.5 h-3.5" />
              <span>給司機看</span>
            </button>
          )}

          {item.googleMapsUrl && (
            <a
              href={item.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-sm active:scale-95 transition-all border border-blue-100 tracking-wide"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>導航</span>
            </a>
          )}

          {/* Share Button - New Feature */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 text-stone-600 text-xs font-medium rounded-sm active:scale-95 transition-all border border-stone-200"
          >
            <Share className="w-3.5 h-3.5" />
            <span>{copied ? '已複製!' : '分享'}</span>
          </button>

          {item.backups && item.backups.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowBackups(!showBackups); }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-sm transition-all border ${showBackups ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-white text-stone-600 border-stone-200'}`}
            >
              <span>{showBackups ? '隱藏備案' : `備案 (${item.backups.length})`}</span>
              {showBackups ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Notes & Backups Section - Enhanced with better styling */}
        {((item.notes && isActive) || showBackups) && (
          <div className="mt-4 pt-4 border-t border-stone-100 animate-in slide-in-from-top-2">
            {item.notes && isActive && (
              <div className="mb-3 text-xs bg-amber-50/70 text-amber-800 p-3 rounded-sm border-l-2 border-amber-400 leading-relaxed">
                <span className="font-bold mr-1">💡 筆記:</span> {item.notes}
              </div>
            )}

            {showBackups && item.backups?.map((backup, idx) => (
              <div key={idx} className="mb-2 last:mb-0 bg-stone-50 p-3 rounded-sm border border-stone-100 group hover:bg-white transition-colors">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-sm font-bold text-stone-700">{backup.name}</span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded-sm bg-white font-medium">
                    {backup.type}
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed mb-2">{backup.description}</p>

                {/* Backup Map Link */}
                {backup.googleMapsUrl && (
                  <a
                    href={backup.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-medium hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    在地圖上查看
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
