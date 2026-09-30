/**
 * Calculates human-readable time remaining OR time elapsed for an offer date string or timestamp.
 * Handled gracefully for client-side rendering & hydration.
 * 
 * Examples:
 * - Future: "1 day left", "5 hours remaining", "45 mins left"
 * - Past: "Ended 3 days ago", "Ended 2 hours ago"
 * 
 * @param {string | number | Date} endDate 
 * @returns {string}
 */
export function calculateTimeRemaining(endDate) {
  if (!endDate) return '';

  const targetTime = new Date(endDate).getTime();
  if (isNaN(targetTime)) return '';

  const now = new Date().getTime();
  const diff = targetTime - now;

  // Handle Past Dates (Elapsed Time)
  if (diff < 0) {
    const elapsedMs = Math.abs(diff);
    const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
    const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
    const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

    if (elapsedDays > 0) {
      return `Ended ${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
    }
    if (elapsedHours > 0) {
      return `Ended ${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
    }
    if (elapsedMinutes > 0) {
      return `Ended ${elapsedMinutes} min${elapsedMinutes > 1 ? 's' : ''} ago`;
    }
    return 'Offer Expired';
  }

  // Handle Future Dates (Time Remaining)
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} left`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  }
  if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? 's' : ''} left`;
  }

  return 'Ending soon';
}
