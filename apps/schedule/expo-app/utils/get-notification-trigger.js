export default function getNotificationTrigger(date) {
  return date
    ? { type: DATE_TYPE, date, channelId: "notification" }
    : { type: INTERVAL_TYPE, seconds: 1, channelId: "notification" };
}
