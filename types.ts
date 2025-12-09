

export enum ActivityType {
  FLIGHT = 'flight',
  TRAIN = 'train',
  FOOD = 'food',
  SIGHTSEEING = 'sightseeing',
  HOTEL = 'hotel',
  CHECKLIST = 'checklist'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BackupOption {
  name: string;
  description: string;
  type: string;
  isReserve?: boolean;
  googleMapsUrl?: string; // Support maps for backups too
}

export interface TransportInfo {
  line: string;      // e.g. "HARUKA 特急", "JR 嵯峨野線"
  destination?: string; // e.g. "往 京都", "往 嵯峨嵐山"
  station?: string;     // e.g. "關西機場站", "京都站"
  platform?: string;    // e.g. "4號月台", "32-33 月台"
  duration?: number;    // minutes
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  address?: string; // Human readable address
  japaneseAddress?: string; // For Taxi Mode
  googleMapsUrl?: string; // External Google Maps Link
  location?: Coordinates;
  type: ActivityType;
  tags?: string[];
  backups?: BackupOption[];
  notes?: string;
  link?: string;
  transport?: TransportInfo; // New: Specific transport details
  walkingGuide?: string;     // New: How to walk there
}

export interface DayPlan {
  date: string; // "12/19"
  dayOfWeek: string; // "Fri"
  title: string;
  theme: string; // "Sukiyaki Dreams"
  items: ItineraryItem[];
  city: 'Kyoto' | 'Osaka';
  cityChi: string; // Chinese city name
}

export interface HotelInfo {
  name: string;
  address: string;
  japaneseAddress: string;
  dates: string;
  image: string;
  googleMapsUrl: string;
}

export interface FlightEndpoint {
  airport: string;
  code: string;
  terminal: string;
  time: string;
}

export interface FlightInfo {
  code: string;
  airline: string;
  status: string;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  // Legacy fields for backward compatibility
  route?: string;
  time?: string; 
}