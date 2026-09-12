import * as Notifications from "expo-notifications";
import { BackHandler, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") if (Platform.OS === "android") BackHandler.exitApp();
}

function getNotifications(schedule) {
  const notifications = [];
  for (const dateKey in schedule) {
    if (notifications.length > 50) break;
    for (const time in schedule[dateKey]) {
      const timeText = time.replace("-", " - ");
      const placeText = schedule[dateKey][time].place
        ? ` tại ${schedule[dateKey][time].place}`
        : "";
      const type = Notifications.SchedulableTriggerInputTypes.DATE;
      const pushNotification = (message, date) =>
        notifications.push({
          content: {
            title: `${message}: ${schedule[dateKey][time].content}`,
            body: `Thời gian ${timeText}${placeText}`,
            sound: true,
          },
          trigger: date ? { type, date } : null,
        });
      const createDateString = `${dateKey}T${timeText}`;

      const oneDayEarlier = new Date(createDateString);
      oneDayEarlier.setDate(oneDayEarlier.getDate() - 1);
      if (oneDayEarlier.getTime() <= Date.now()) pushNotification("Nhắc nhở lịch trình");
      else pushNotification("Còn 1 ngày nữa", oneDayEarlier);

      const oneHourEarlier = new Date(createDateString);
      oneHourEarlier.setHours(oneHourEarlier.getHours() - 1);
      if (oneHourEarlier.getTime() <= Date.now()) pushNotification("Nhắc nhở lịch trình");
      else pushNotification("Còn 1 giờ nữa", oneHourEarlier);

      pushNotification("Ngay lúc này", new Date(createDateString));
    }
  }
  return notifications.slice(0, 50);
}

async function sendNotifications(notifications) {
  for (const notification of notifications)
    await Notifications.scheduleNotificationAsync(notification);
}

export async function syncScheduleNotifications(schedule) {
  await requestPermissions();
  const notifications = getNotifications(schedule);
  await Notifications.cancelAllScheduledNotificationsAsync();
  await sendNotifications(notifications);
}
