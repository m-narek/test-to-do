export function getDayOrNight(timezoneOffset) {
  const timezoneInHours = timezoneOffset / 3600;

  const now = new Date();

  const localTime = new Date(now.getTime() + timezoneInHours * 3600000);

  const hour = localTime.getUTCHours();

  if (hour >= 6 && hour < 18) {
    return 'day';
  } else {
    return 'night';
  }
}

export function getIconUrl(icon) {
  return icon
    ? `${process.env.VUE_APP_WEATHER_API_URL}/img/w/${icon}.png`
    : null;
}

export function convertTemperature(tempK, unit) {
  if (unit === 'celsius') {
    return `${Math.floor(tempK - 273.15)}°C`;
  } else if (unit === 'fahrenheit') {
    return `${Math.floor(((tempK - 273.15) * 9) / 5 + 32)}°F`;
  } else {
    throw new Error('Invalid temperature unit. Use "Celsius" or "Fahrenheit".');
  }
}

export function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  if (date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    throw new Error('Incorrect date');
  }
}

export function metersToKilometers(meters) {
  return `${(meters / 1000).toFixed(2)} km`;
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
