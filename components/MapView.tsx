
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { DayPlan, ActivityType, ItineraryItem } from '../types';
import { ActivityIcon, Train, ArrowRight, Route, Navigation, ExternalLink, Clock, Crosshair, ChevronLeft, ChevronRight, Navigation2, Footprints } from './ui/Icons';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix Leaflet icon issue by using CDN URLs directly
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Custom Icons ---

const createCustomIcon = (type: ActivityType, isDimmed: boolean, isHighlighted: boolean, sequence: number) => {
  const colorMap = {
    [ActivityType.FOOD]: '#ef4444',
    [ActivityType.SIGHTSEEING]: '#3b82f6',
    [ActivityType.HOTEL]: '#a855f7',
    [ActivityType.TRAIN]: '#10b981',
    [ActivityType.FLIGHT]: '#64748b',
    [ActivityType.CHECKLIST]: '#f59e0b',
  };

  const color = colorMap[type] || '#64748b';
  const opacity = isDimmed ? 0.4 : 1;
  const filter = isDimmed ? 'grayscale(100%)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
  const zIndex = isHighlighted ? 50 : 1;
  
  const svgIcon = renderToStaticMarkup(
    <div className="relative group">
      <div style={{
        backgroundColor: color,
        width: isHighlighted ? '48px' : '40px',
        height: isHighlighted ? '48px' : '40px',
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: isHighlighted ? '3px solid white' : '2px solid white',
        opacity: opacity,
        filter: filter,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHighlighted ? `0 0 0 4px ${color}40` : 'none'
      }}>
        <div style={{ transform: 'rotate(45deg)' }}>
             <ActivityIcon type={type} className={`${isHighlighted ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
        </div>
      </div>
      
      <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: '#1c1917',
          color: '#FDFBF7',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '11px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #FDFBF7',
          zIndex: 20
      }}>
        {sequence}
      </div>
    </div>
  );

  return L.divIcon({
    html: svgIcon,
    className: `custom-leaflet-icon transition-all z-[${zIndex}]`,
    iconSize: isHighlighted ? [48, 48] : [40, 40],
    iconAnchor: isHighlighted ? [24, 50] : [20, 42],
    popupAnchor: [0, -40]
  });
};

const UserLocationIcon = L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-6 h-6">
        <div class="absolute w-full h-full bg-blue-500 rounded-full opacity-30 animate-ping"></div>
        <div class="relative w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>
      </div>
    `,
    className: 'custom-user-location-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// --- Map Logic Components ---

const MapController = ({ 
    center, 
    activeItem, 
    items 
}: { 
    center: { lat: number, lng: number }, 
    activeItem: ItineraryItem | undefined,
    items: ItineraryItem[] 
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (!activeItem || !activeItem.location) {
        // Fallback to center if no active item
        map.flyTo([center.lat, center.lng], 14, { duration: 1.5 });
        return;
    }

    // Smart Routing Zoom: Find current and next item to frame both
    const currentIndex = items.findIndex(i => i.id === activeItem.id);
    const nextItem = items[currentIndex + 1];

    if (nextItem && nextItem.location) {
        // Create bounds containing current and next
        const bounds = L.latLngBounds(
            [activeItem.location.lat, activeItem.location.lng],
            [nextItem.location.lat, nextItem.location.lng]
        );
        map.flyToBounds(bounds, { 
            padding: [50, 50], 
            maxZoom: 15,
            duration: 1.2
        });
    } else {
        // Just fly to current
        map.flyTo([activeItem.location.lat, activeItem.location.lng], 15, { duration: 1.2 });
    }

  }, [activeItem, center, items, map]);

  return null;
};

// --- Main Component ---

interface MapViewProps {
  dayPlan: DayPlan;
  activeItemId?: string;
  onActiveItemChange: (id: string | null) => void;
}

const MapView: React.FC<MapViewProps> = ({ dayPlan, activeItemId, onActiveItemChange }) => {
  const [userPos, setUserPos] = useState<{ lat: number, lng: number } | null>(null);
  
  // Geolocation - Keeps updating userPos, causing re-renders. 
  // We use useMemo below to ensure expensive map calculations aren't redone unnecessarily.
  useEffect(() => {
      if ('geolocation' in navigator) {
          const watchId = navigator.geolocation.watchPosition(
              (position) => {
                  setUserPos({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  });
              },
              (error) => console.warn('Geolocation error:', error),
              { enableHighAccuracy: true }
          );
          return () => navigator.geolocation.clearWatch(watchId);
      }
  }, []);

  // Determine active item and index - Memoized
  const activeItem = useMemo(() => 
    dayPlan.items.find(i => i.id === activeItemId) || dayPlan.items[0]
  , [dayPlan, activeItemId]);

  const activeIndex = useMemo(() => 
    dayPlan.items.findIndex(i => i.id === activeItem.id)
  , [dayPlan, activeItem]);

  const nextItem = dayPlan.items[activeIndex + 1];
  
  const center = useMemo(() => 
    activeItem?.location || dayPlan.items.find(i => i.location)?.location || { lat: 34.9858, lng: 135.7588 }
  , [activeItem, dayPlan]);

  // Generate Segments - Memoized
  const routeSegments = useMemo(() => {
    return dayPlan.items.reduce((acc: any[], item, index, array) => {
        if (index === array.length - 1) return acc;
        const next = array[index + 1];
        
        if (item.location && next.location) {
            const isTransportLeg = next.type === ActivityType.TRAIN || next.type === ActivityType.FLIGHT;
            const isActivePath = activeItem.id === item.id;
            
            acc.push({
                positions: [[item.location.lat, item.location.lng], [next.location.lat, next.location.lng]],
                color: isTransportLeg ? '#10b981' : (isActivePath ? '#C44302' : '#94a3b8'), // Highlights active path in Vermilion
                dashArray: isTransportLeg ? undefined : (isActivePath ? '1, 6' : '6, 8'),
                weight: isActivePath ? 6 : (isTransportLeg ? 5 : 3),
                opacity: isActivePath ? 0.9 : (isTransportLeg ? 0.8 : 0.4),
                from: item,
                to: next,
                mode: isTransportLeg ? 'TRANSIT' : 'WALKING',
                transportInfo: next.transport
            });
        }
        return acc;
    }, []);
  }, [dayPlan, activeItem.id]);

  const handleNext = () => {
      if (activeIndex < dayPlan.items.length - 1) {
          onActiveItemChange(dayPlan.items[activeIndex + 1].id);
      }
  };

  const handlePrev = () => {
      if (activeIndex > 0) {
          onActiveItemChange(dayPlan.items[activeIndex - 1].id);
      }
  };
  
  const getGoogleNavUrl = (to: ItineraryItem, from?: ItineraryItem) => {
      if (!to.location) return '#';
      if (from && from.location) {
         // Direction mode
         const mode = to.type === ActivityType.TRAIN ? 'transit' : 'walking';
         return `https://www.google.com/maps/dir/?api=1&origin=${from.location.lat},${from.location.lng}&destination=${to.location.lat},${to.location.lng}&travelmode=${mode}`;
      }
      // Just point mode
      return `https://www.google.com/maps/search/?api=1&query=${to.location.lat},${to.location.lng}`;
  };

  // Memoize Marker Elements to avoid re-creating L.DivIcons every render
  const markerElements = useMemo(() => {
      return dayPlan.items.map((item, index) => {
          if (!item.location) return null;
          const isActive = item.id === activeItem.id;
          
          return (
            <Marker 
              key={item.id} 
              position={[item.location.lat, item.location.lng]}
              icon={createCustomIcon(item.type, activeItem.id !== item.id, isActive, index + 1)}
              zIndexOffset={isActive ? 1000 : 0}
              eventHandlers={{
                  click: () => onActiveItemChange(item.id)
              }}
            >
              {isActive && (
                  <Popup className="font-serif" offset={[0, -45]} closeButton={false}>
                     <div className="text-center">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Step {index + 1}</div>
                        <div className="text-sm font-bold text-stone-900 leading-tight">{item.title}</div>
                     </div>
                  </Popup>
              )}
            </Marker>
          );
      });
  }, [dayPlan, activeItem.id, onActiveItemChange]);

  return (
    <div className="w-full h-full relative z-0 bg-stone-100">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController center={center} activeItem={activeItem} items={dayPlan.items} />
        
        {/* User Location - Updates freely without forcing recalc of other elements */}
        {userPos && <Marker position={[userPos.lat, userPos.lng]} icon={UserLocationIcon} />}

        {/* Route Paths */}
        {routeSegments.map((segment, idx) => (
             <Polyline 
                key={`${idx}-${segment.color}`} // Stable key
                positions={segment.positions}
                pathOptions={{ 
                    color: segment.color, 
                    dashArray: segment.dashArray,
                    weight: segment.weight,
                    opacity: segment.opacity,
                    lineCap: 'round'
                }}
            />
        ))}
        
        {/* Itinerary Markers */}
        {markerElements}

      </MapContainer>

      {/* Guide HUD (Heads-Up Display) */}
      <div className="absolute bottom-6 left-4 right-4 z-[500] flex flex-col gap-3">
          
          {/* Controls & Locate Me */}
          <div className="flex justify-end mb-2">
               <button 
                  onClick={() => userPos && onActiveItemChange(null)} 
                  className="bg-white p-3 rounded-full shadow-lg border border-stone-200 text-stone-600 active:bg-stone-50 transition-colors"
                  title="My Location"
               >
                   <Crosshair className="w-5 h-5" />
               </button>
          </div>

          {/* Navigation Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/50 p-5 relative overflow-hidden">
               {/* Progress Bar */}
               <div className="absolute top-0 left-0 h-1 bg-stone-100 w-full">
                   <div 
                      className="h-full bg-[#C44302] transition-all duration-500"
                      style={{ width: `${((activeIndex + 1) / dayPlan.items.length) * 100}%` }}
                   ></div>
               </div>

               <div className="flex justify-between items-start mb-4 pt-2">
                   <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                           Step {activeIndex + 1} <span className="text-stone-300 mx-1">/</span> {dayPlan.items.length}
                       </span>
                       <h3 className="text-lg font-bold font-serif text-stone-900 leading-tight mt-1 truncate max-w-[200px]">
                           {activeItem.title}
                       </h3>
                   </div>
                   
                   <a 
                      href={nextItem ? getGoogleNavUrl(nextItem, activeItem) : getGoogleNavUrl(activeItem)}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-stone-900 text-white rounded-full p-3 shadow-lg hover:bg-[#C44302] transition-colors active:scale-95"
                   >
                       <Navigation2 className="w-5 h-5" />
                   </a>
               </div>

               {/* Next Stop Preview */}
               {nextItem && (
                   <div className="bg-stone-50 rounded-xl p-3 flex items-center justify-between border border-stone-100">
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
                                {nextItem.type === ActivityType.TRAIN ? <Train className="w-4 h-4 text-emerald-500"/> : <Footprints className="w-4 h-4 text-stone-400"/>}
                           </div>
                           <div className="min-w-0">
                               <div className="text-[10px] font-bold uppercase text-stone-400 tracking-wide">Next Stop</div>
                               <div className="text-xs font-bold text-stone-800 truncate">{nextItem.title}</div>
                           </div>
                       </div>
                       
                       <div className="text-right">
                           {nextItem.transport ? (
                               <div className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">{nextItem.transport.duration}m</div>
                           ) : (
                               <div className="text-[10px] font-mono text-stone-400">Walk</div>
                           )}
                       </div>
                   </div>
               )}

               {/* Navigation Controls */}
               <div className="flex justify-between items-center mt-5 pt-3 border-t border-dashed border-stone-200">
                   <button 
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 disabled:opacity-20 transition-colors"
                   >
                       <ChevronLeft className="w-4 h-4" /> Prev
                   </button>
                   
                   <button 
                      onClick={handleNext}
                      disabled={activeIndex === dayPlan.items.length - 1}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-[#C44302] disabled:opacity-20 transition-colors"
                   >
                       Next <ChevronRight className="w-4 h-4" />
                   </button>
               </div>
          </div>
      </div>
    </div>
  );
};

export default MapView;
