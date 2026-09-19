import * as Notifications from "expo-notifications";
import { useEffect } from "react";
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

function getNotifications(schedule, tagsConfig) {
  const notifications = [];
  for (const dateKey in schedule) {
    for (const time in schedule[dateKey]) {
      const timeText = time.replace("-", " - ");
      const placeText = schedule[dateKey][time].place
        ? ` tại ${schedule[dateKey][time].place}`
        : "";
      const noteText = schedule[dateKey][time].note ? "\nMở ứng dụng để xem ghi chú" : "";
      const type = Notifications.SchedulableTriggerInputTypes.DATE;
      const pushNotification = (message, date) =>
        notifications.push({
          content: {
            title: `${message}: ${schedule[dateKey][time].content}`,
            body: `Thời gian ${timeText}${placeText}${noteText}`,
            sound: true,
          },
          trigger: date ? { type, date } : null,
        });

      const currentDate = new Date(`${dateKey}T${time.split("-")[0]}`);
      if (currentDate.getTime() <= Date.now()) continue;

      let pushNow = false;
      for (const adretime of tagsConfig[schedule[dateKey][time].tag].adretimes) {
        const adredate = new Date(currentDate);
        adredate.setHours(adredate.getHours() - adretime);
        if (adredate.getTime() <= Date.now()) pushNow = true;
        else pushNotification(`Còn ${adretime} giờ`, adredate);
      }
      if (pushNow) {
        const delta = currentDate.getTime() - Date.now();
        const hours = Math.floor(delta / (1000 * 60 * 60));
        if (hours) pushNotification(`Còn ${hours} giờ`);
        else {
          const minutes = Math.ceil(delta / (1000 * 60));
          pushNotification(`Còn ${minutes} phút`);
        }
      }
      pushNotification("Ngay lúc này", currentDate);
    }
  }
  notifications.sort((a, b) => {
    if (a.trigger === null && b.trigger === null) return 0;
    if (a.trigger === null) return -1;
    if (b.trigger === null) return 1;
    return a.trigger.date.getTime() - b.trigger.date.getTime();
  });
  notifications[49].content.body += "\nMở ứng dụng để cập nhật các thông báo mới";
  return notifications.slice(0, 50);
}

async function sendNotifications(notifications) {
  for (const notification of notifications)
    await Notifications.scheduleNotificationAsync(notification);
}

export default function syncScheduleNotifications(schedule, tagsConfig) {
  useEffect(() => {
    (async () => {
      await requestPermissions();
      const notifications = getNotifications(schedule, tagsConfig);
      await Notifications.cancelAllScheduledNotificationsAsync();
      await sendNotifications(notifications);
    })();
  }, [schedule, tagsConfig]);
}
