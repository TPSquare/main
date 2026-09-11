import databaseUrl from "../configs/database-url";

const getDayRange = (maxDate) => {
  const now = Date.now();
};

export default async () => {
  const frequentsData = [];
  const schedule = {};

  const dataListAPI = `${databaseUrl}/configs/data-list.json`;
  const dataList = await fetch(dataListAPI).then((res) => res.json());
  for (const dataID of dataList) {
    const API = `${databaseUrl}/data/${dataID}.json`;
    const data = await fetch(API).then((res) => res.json());
    if (data.frequent) {
      frequentsData.push(data.frequent);
      delete data.frequent;
    }
    for (const dateKey in data) {
      if (!schedule[dateKey]) schedule[dateKey] = {};
      Object.assign(schedule[dateKey], data[dateKey]);
    }
  }

  const entries = Object.entries(schedule).sort(([key1], [key2]) => key1.localeCompare(key2));
  const sortedSchedule = Object.fromEntries(entries);

  console.log(entries.map((e) => e[0]).join("\n"));

  return sortedSchedule;
};
