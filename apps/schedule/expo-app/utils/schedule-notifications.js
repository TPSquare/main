import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";

import getNotificationTrigger from "./get-notification-trigger";

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
  const DATE_TYPE = Notifications.SchedulableTriggerInputTypes.DATE;
  const INTERVAL_TYPE = Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL;
  const notifications = [];
  for (const dateKey in schedule) {
    for (const time in schedule[dateKey]) {
      const timeText = time.replace("-", " - ");
      const placeText = schedule[dateKey][time].place
        ? ` tại ${schedule[dateKey][time].place}`
        : "";
      const noteText = schedule[dateKey][time].note ? "\nMở ứng dụng để xem ghi chú" : "";
      const pushNotification = (message, date) =>
        notifications.push({
          content: {
            title: `${message}: ${schedule[dateKey][time].content}`,
            body: `Thời gian ${timeText}${placeText}${noteText}`,
            sound: "notification.wav",
          },
          trigger: getNotificationTrigger(date),
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
    const aIsDate = a.trigger.type === DATE_TYPE;
    const bIsDate = b.trigger.type === DATE_TYPE;
    if (!aIsDate && !bIsDate) return 0;
    if (!aIsDate) return -1;
    if (!bIsDate) return 1;
    return a.trigger.date.getTime() - b.trigger.date.getTime();
  });
  notifications.splice(60, notifications.length - 60);

  const lastNotiDate = notifications[notifications.length - 1].trigger.date;
  if (lastNotiDate) {
    const emptyNotiDate = new Date(lastNotiDate);
    emptyNotiDate.setMinutes(lastNotiDate.getMinutes() + 1);
    notifications.push({
      content: { title: "Mở ứng dụng để cập nhật các thông báo mới!" },
      trigger: getNotificationTrigger(emptyNotiDate),
    });
  }
  return notifications;
}

async function sendNotifications(notifications) {
  await Promise.all(notifications.map((e) => Notifications.scheduleNotificationAsync(e)));
}

const setNotificationChannelAsync = async () => {
  await Notifications.setNotificationChannelAsync("notification", {
    name: "Chuông thông báo",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "notification.wav",
    vibrationPattern: [0, 100, 100, 100, 100, 100],
  });
};

export default function syncScheduleNotifications(schedule, tagsConfig) {
  useEffect(() => {
    (async () => {
      await requestPermissions();
      if (Platform.OS === "android") await setNotificationChannelAsync();
      const notifications = getNotifications(schedule, tagsConfig);
      await Notifications.cancelAllScheduledNotificationsAsync();
      await sendNotifications(notifications);
    })();
  }, [schedule, tagsConfig]);
}
