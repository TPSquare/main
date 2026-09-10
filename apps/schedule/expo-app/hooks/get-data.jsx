import { useCallback } from "react";

const fetchJSON = async (API) => await fetch(API).then((res) => res.json());

export default () =>
  useCallback(async () => {
    const frequentsData = [];
    const schedule = {};

    const listAPI = "https://tpsquare.github.io/main/apps/schedule/data/list.json";
    const dataList = await fetchJSON(listAPI);
    for (const data of dataList) {
      if (data.frequent) {
        frequentsData.push(data.frequent);
        delete data.frequent;
      }
      for (const dateKey in data) {
        if (!schedule[dateKey]) schedule[dateKey] = {};
        Object.assign(schedule[dateKey], data[dateKey]);
      }
    }
  }, []);
