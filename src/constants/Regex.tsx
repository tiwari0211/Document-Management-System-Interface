import moment from "moment";

export const isPhoneNumberValid = (phoneNumber: string) => {
  // Regular expression for validating a phone number
  // This regex matches a phone number with optional country code, optional area code, and mandatory phone number
  const phoneRegex = /^\+?\d{0,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

export const StopScroll = (e: {
  target: {
    addEventListener: (
      arg0: string,
      arg1: (e: any) => void,
      arg2: { passive: boolean }
    ) => void;
  };
}) => {
  e.target.addEventListener(
    "wheel",
    function (e: { preventDefault: () => void }) {
      e.preventDefault();
    },
    { passive: false }
  );
};
export function formatTimestamp(timestamp: any, onlyDate?: any) {
  const date = moment(timestamp);
  const now = moment();
  const diffMinutes = now.diff(date, "minutes");
  if (onlyDate) {
    return date.format("MMM D, YYYY");
  } else if (now.isSame(date, "day")) {
    // Show time if it's today
    if ((diffMinutes < 60 && diffMinutes > 0) || diffMinutes === 0) {
      // If within 2 hours, show minutes ago
      return diffMinutes === 0
        ? "Just Now"
        : `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
    } else {
      // Otherwise, show time
      return date.format("h:mm A");
    }
  } else if (now.clone().subtract(1, "days").isSame(date, "day")) {
    // Show yesterday if it was yesterday
    return "Yesterday";
  } else {
    // Show date and time for other dates
    return date.format("MMM D, h:mm A");
  }
}