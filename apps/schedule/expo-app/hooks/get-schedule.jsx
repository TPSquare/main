import { useEffect } from "react";

import getSchedule from "../utils/get-schedule";

export default function (appKey, setSchedule) {
  useEffect(() => {
    (async () => {
      const schedule = await getSchedule();
      setSchedule(schedule);
    })();
  }, [appKey]);
}
