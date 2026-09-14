import { useMemo } from "react";

import DayBlock from "../components/DayBlock";

export default function (schedule) {
  return useMemo(
    () =>
      Object.entries(schedule).map(([key, data]) => {
        return <DayBlock dateKey={key} dateData={data} key={key} />;
      }),
    [schedule],
  );
}
