import databaseUrl from "../configs/database-url";
import fetchJSON from "../utils/fetch-json";

const getDayRange = (last) => {
  const range = Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((e) => [e, ["", ""]]));

  const nowDate = new Date();
  const lastDate = new Date(last);

  for (let i = 0; i < 7; i++) {
    const startDate = new Date(nowDate);
    startDate.setDate(startDate.getDate() + i);
    range[startDate.getDay() + 1][0] = startDate.toISOString().slice(0, 10);

    const endDate = new Date(lastDate);
    endDate.setDate(endDate.getDate() - i);
    range[endDate.getDay() + 1][1] = endDate.toISOString().slice(0, 10);
  }
  for (const day in range) if (range[day][1] < range[day][0]) range[day][1] = range[day][0];

  return range;
};

const getSchedule = async () => {
  const frequentsData = [];
  const schedule = {};
  let lastDate = new Date().toISOString().slice(0, 10);

  const dataListAPI = `${databaseUrl}/configs/data-list.json`;
  const dataList = await fetchJSON(dataListAPI);
  for (const dataID of dataList) {
    const API = `${databaseUrl}/data/${dataID}.json`;
    const data = await fetchJSON(API);
    if (data.frequent) {
      frequentsData.push(data.frequent);
      delete data.frequent;
    }
    for (const dateKey in data) {
      if (dateKey > lastDate) lastDate = dateKey;
      if (!schedule[dateKey]) schedule[dateKey] = {};

      for (const time in data[dateKey])
        if (!data[dateKey][time].tag) data[dateKey][time].tag = "special";

      Object.assign(schedule[dateKey], data[dateKey]);
    }
  }

  const frequent = {};
  for (const frequentData of frequentsData)
    for (const day in frequentData) {
      for (const time in frequentData[day])
        if (!frequentData[day][time].tag) frequentData[day][time].tag = "default";

      if (!frequent[day]) frequent[day] = {};
      Object.assign(frequent[day], frequentData[day]);
    }
  if (frequent["cn"] && !frequent["1"]) frequent["1"] = {};
  if (frequent["cn"]) {
    frequent["1"] = frequent["cn"];
    delete frequent["cn"];
  }

  const dayRange = getDayRange(lastDate);
  for (const day in frequent) {
    const currentDate = new Date(dayRange[day][0]);
    let currentDateKey;
    do {
      currentDateKey = currentDate.toISOString().slice(0, 10);
      if (!schedule[currentDateKey]) schedule[currentDateKey] = {};
      Object.assign(schedule[currentDateKey], frequent[day]);
      currentDate.setDate(currentDate.getDate() + 7);
    } while (currentDateKey <= dayRange[day][1]);
  }

  return schedule;
};

const sortSchedule = (schedule) => {
  for (const date in schedule) {
    const compare = ([key1], [key2]) => key1.localeCompare(key2);
    const entries = Object.entries(schedule[date]).sort(compare);
    schedule[date] = Object.fromEntries(entries);
  }
  const entries = Object.entries(schedule).sort(([key1], [key2]) => key1.localeCompare(key2));
  for (const key in schedule) delete schedule[key];
  Object.assign(schedule, Object.fromEntries(entries));
};

const deletePastDate = (schedule) => {
  for (const dateKey in schedule) {
    const lastTime = Object.keys(schedule[dateKey]).pop().split("-").pop();
    const date = new Date(`${dateKey}T${lastTime}`);
    if (date.getTime() < Date.now()) delete schedule[dateKey];
    else return;
  }
};

export default async () => {
  const schedule = await getSchedule();
  sortSchedule(schedule);
  deletePastDate(schedule);
  return schedule;
};
