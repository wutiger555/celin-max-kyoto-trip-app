

export interface ScheduleItem {
  time: string;
  destination: string;
  type: string; // e.g., "Ltd. Exp. HARUKA", "Special Rapid"
  track?: string;
  status?: string; // e.g. "準點", "誤點"
  crowd?: 'High' | 'Medium' | 'Low';
}

export const generateSchedules = (routeKey: string, startTimeStr: string): ScheduleItem[] => {
  const [startHour, startMinute] = startTimeStr.split(':').map(Number);
  const schedules: ScheduleItem[] = [];
  
  // Define patterns (minutes of hour) for each route
  let patterns: number[] = [];
  let type = "";
  let destination = "";
  let track = "";

  if (routeKey === 'KIX_KYOTO') {
      patterns = [14, 44]; // Haruka approx schedule
      type = "HARUKA 特急";
      destination = "京都 (Kyoto)";
      track = "4";
  } else if (routeKey === 'KYOTO_OSAKA') {
      patterns = [0, 15, 30, 45]; // Special Rapid frequency
      type = "JR 新快速";
      destination = "大阪 / 姬路";
      track = "5";
  } else if (routeKey === 'OSAKA_KIX') {
      patterns = [3, 23, 43]; // Kansai Rapid approx
      type = "關空快速";
      destination = "關西機場";
      track = "1";
  }

  // Find next 3 trains
  let count = 0;
  let currentH = startHour;
  let currentM = startMinute;

  // Look ahead up to 24 hours (safeguard) to find next trains
  // We simulate by checking minute by minute or just finding next pattern match
  
  // Simpler approach: Iterate through next 2 hours of patterns
  for (let h = 0; h < 3; h++) {
      const checkHour = (currentH + h) % 24;
      
      // Determine crowd level based on rush hour (7-9, 17-19)
      let crowd: 'High' | 'Medium' | 'Low' = 'Medium';
      if ((checkHour >= 7 && checkHour <= 9) || (checkHour >= 17 && checkHour <= 19)) {
          crowd = 'High';
      } else if (checkHour >= 21 || checkHour <= 5) {
          crowd = 'Low';
      }

      for (const p of patterns) {
          // If in current hour, pattern must be > startMinute
          // If in future hour, take all patterns
          if (h === 0 && p < currentM) continue;

          schedules.push({
              time: `${checkHour}:${p.toString().padStart(2, '0')}`,
              destination: destination,
              type: type,
              track: track,
              status: '準點',
              crowd: crowd
          });
          count++;
          if (count >= 3) break;
      }
      if (count >= 3) break;
  }

  return schedules;
};
