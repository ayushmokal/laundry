export const formatHours = (hoursString: string): string => {
  if (!hoursString) return "Hours not available";
  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  
  try {
    // Split hours string into array and handle empty/malformed strings
    const hoursArray = hoursString.split(',').filter(Boolean);
    if (!hoursArray.length) return "Hours not available";
    
    // Find today's schedule with null check
    const todaySchedule = hoursArray.find(schedule => schedule?.trim()?.startsWith(today));
    if (!todaySchedule) return "Hours not available";
    
    // Split schedule parts with null check
    const scheduleParts = todaySchedule.split(': ');
    if (scheduleParts.length < 2) return "Hours not available";
    
    const times = scheduleParts[1]?.trim();
    if (!times) return "Closed";
    
    // Split times with null check
    const [open, close] = times.split(' - ').map(time => time?.trim()).filter(Boolean);
    if (!open || !close || open === '-' || close === '-') return "Closed";
    
    // Safely match time components with null checks
    const openMatch = open.match(/(\d+):(\d+)\s*(AM|PM)/);
    const closeMatch = close.match(/(\d+):(\d+)\s*(AM|PM)/);
    
    if (!openMatch || !closeMatch) return "Invalid hours format";
    
    const [, openHour, openMinute, openPeriod] = openMatch;
    const [, closeHour, closeMinute, closePeriod] = closeMatch;
    
    if (!openHour || !openMinute || !openPeriod || !closeHour || !closeMinute || !closePeriod) {
      return "Invalid hours format";
    }
    
    const openTime = convertTo24Hour(parseInt(openHour), parseInt(openMinute), openPeriod);
    const closeTime = convertTo24Hour(parseInt(closeHour), parseInt(closeMinute), closePeriod);
    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();
    
    const isOpen = currentTime >= openTime && currentTime <= closeTime;
    
    return isOpen 
      ? `Open · Closes ${close}`
      : `Closed · Opens ${open}`;
  } catch (error) {
    console.error('Error formatting hours:', error);
    return "Hours not available";
  }
};

const convertTo24Hour = (hour: number, minute: number, period: string): number => {
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 100 + minute;
};