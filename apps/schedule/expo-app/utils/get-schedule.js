const fetchData = async (API) => await fetch(API).then((res) => res.json());

export default async () => {
  const frequentsData = [];
  const schedule = {};

  const dataListAPI = "https://tpsquare.github.io/main/apps/schedule/configs/data-list.json";
  const dataList = await fetchData(dataListAPI);
  for (const dataID of dataList) {
    const API = `https://tpsquare.github.io/main/apps/schedule/data/${dataID}.json`;
    const data = await fetchData(API);
    if (data.frequent) {
      frequentsData.push(data.frequent);
      delete data.frequent;
    }
    for (const dateKey in data) {
      if (!schedule[dateKey]) schedule[dateKey] = {};
      Object.assign(schedule[dateKey], data[dateKey]);
    }
  }

  return schedule;
};
