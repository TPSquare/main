import databaseUrl from "../configs/database-url";
import fetchJSON from "../utils/fetch-json";
import getKeyFromDate from "./get-key-from-date";

const getDayRange = (last) => {
  const range = Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((e) => [e, ["", ""]]));

  const nowDate = new Date();
  const lastDate = new Date(last);

  for (let i = 0; i < 7; i++) {
    const startDate = new Date(nowDate);
    startDate.setDate(startDate.getDate() + i);
    range[startDate.getDay() + 1][0] = getKeyFromDate(startDate);

    const endDate = new Date(lastDate);
    endDate.setDate(endDate.getDate() - i);
    range[endDate.getDay() + 1][1] = getKeyFromDate(endDate);
  }
  for (const day in range) if (range[day][1] < range[day][0]) range[day][1] = range[day][0];

  return range;
};

const getSchedule = async () => {
  const frequentsData = [];
  const alwaysData = {};
  const schedule = {};
  let lastDate = getKeyFromDate(new Date());

  const dataListAPI = `${databaseUrl}/configs/data-list.json`;
  const dataList = await fetchJSON(dataListAPI);
  for (const dataID of dataList) {
    const API = `${databaseUrl}/data/${dataID}.json`;
    const data = await fetchJSON(API);
    if (data.frequent) {
      frequentsData.push(data.frequent);
      delete data.frequent;
    }
    if (data.always) {
      Object.assign(alwaysData, data.always);
      delete data.always;
    }
    for (const dateKey in data) {
      if (dateKey > lastDate) lastDate = dateKey;
      if (!schedule[dateKey]) schedule[dateKey] = {};

      for (const time in data[dateKey])
        if (!data[dateKey][time].tag) data[dateKey][time].tag = "special";

      Object.assign(schedule[dateKey], data[dateKey]);
    }
  }

  for (const time in alwaysData) if (!alwaysData[time].tag) alwaysData[time].tag = "default";
  for (const dateKey in schedule) {
    for (const time in alwaysData)
      schedule[dateKey][time] = schedule[dateKey][time] || alwaysData[time];
  }

  const frequent = {};
  for (const frequentData of frequentsData)
    for (const day in frequentData) {
      for (const time in frequentData[day])
        if (!frequentData[day][time].tag) frequentData[day][time].tag = "default";
      if (!frequent[day]) frequent[day] = {};
      Object.assign(frequent[day], frequentData[day]);
    }
  if (frequent["cn"]) {
    if (!frequent["1"]) frequent["1"] = {};
    Object.assign(frequent["1"], frequent["cn"]);
    delete frequent["cn"];
  }

  const dayRange = getDayRange(lastDate);
  for (const day in frequent) {
    const currentDate = new Date(dayRange[day][0]);
    let currentDateKey;
    do {
      currentDateKey = getKeyFromDate(currentDate);
      if (!schedule[currentDateKey]) schedule[currentDateKey] = {};
      for (const time in frequent[day])
        schedule[currentDateKey][time] = schedule[currentDateKey][time] || frequent[day][time];
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
