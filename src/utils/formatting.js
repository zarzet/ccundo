import { i18n } from '../i18n/i18n.js';

export function formatDistance(date) {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);
  
  if (seconds < 60) return i18n.t('time.seconds_ago', { seconds });
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return i18n.t('time.minutes_ago', { minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return i18n.t('time.hours_ago', { hours });
  const days = Math.floor(hours / 24);
  return i18n.t('time.days_ago', { days });
}