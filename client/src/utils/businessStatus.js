// Business hours configuration
export const businessHours = {
  monday: { open: '11:00', close: '21:00', isOpen: true },
  tuesday: { open: '11:00', close: '21:00', isOpen: true },
  wednesday: { open: '11:00', close: '21:00', isOpen: true },
  thursday: { open: '11:00', close: '21:00', isOpen: true },
  friday: { open: '11:00', close: '21:00', isOpen: true },
  saturday: { open: '10:00', close: '22:00', isOpen: true },
  sunday: { open: '10:00', close: '22:00', isOpen: true },
};

// Phone number for orders
export const PHONE_NUMBER = '+18137206050';
export const PHONE_DISPLAY = '(813) 720-6050';

// Delivery aggregator links (update with real URLs when available)
export const DELIVERY_LINKS = {
  doordash: 'https://www.doordash.com/store/la-vera-cruzana',
  ubereats: 'https://www.ubereats.com/store/la-vera-cruzana',
  grubhub: 'https://www.grubhub.com/restaurant/la-vera-cruzana',
};

/**
 * Get current business status
 * @returns {Object} { isOpen: boolean, message: string, nextOpening: string }
 */
export const getBusinessStatus = () => {
  // Get current time in EST/EDT timezone
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[estTime.getDay()];
  const currentTime = estTime.getHours() * 60 + estTime.getMinutes(); // Convert to minutes
  
  const todayHours = businessHours[currentDay];
  
  if (!todayHours.isOpen) {
    return {
      isOpen: false,
      message: 'Closed Today',
      nextOpening: getNextOpeningTime(estTime)
    };
  }
  
  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;
  
  const isOpen = currentTime >= openTime && currentTime < closeTime;
  
  if (isOpen) {
    return {
      isOpen: true,
      message: 'We are OPEN! Come eat.',
      closingTime: todayHours.close
    };
  } else if (currentTime < openTime) {
    return {
      isOpen: false,
      message: `Closed. Opens at ${formatTime(todayHours.open)}`,
      nextOpening: todayHours.open
    };
  } else {
    return {
      isOpen: false,
      message: 'Closed for today',
      nextOpening: getNextOpeningTime(estTime)
    };
  }
};

/**
 * Get next opening time
 */
const getNextOpeningTime = (currentDate) => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let checkDate = new Date(currentDate);
  
  for (let i = 1; i <= 7; i++) {
    checkDate.setDate(checkDate.getDate() + 1);
    const dayName = dayNames[checkDate.getDay()];
    const hours = businessHours[dayName];
    
    if (hours.isOpen) {
      const dayLabel = i === 1 ? 'Tomorrow' : dayNames[checkDate.getDay()].charAt(0).toUpperCase() + dayNames[checkDate.getDay()].slice(1);
      return `${dayLabel} at ${formatTime(hours.open)}`;
    }
  }
  
  return 'Check back soon';
};

/**
 * Format time from 24h to 12h format
 */
const formatTime = (time) => {
  const [hour, min] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${min.toString().padStart(2, '0')} ${period}`;
};

/**
 * Check if currently open (simplified version)
 */
export const isCurrentlyOpen = () => {
  const status = getBusinessStatus();
  return status.isOpen;
};
