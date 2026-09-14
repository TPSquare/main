import { useEffect } from "react";

import databaseUrl from "../configs/database-url";
import fetchJSON from "../utils/fetch-json";

const eventInfoAPI = `${databaseUrl}/configs/event-information.json`;
export default function (setEventInformationConfig) {
  useEffect(() => {
    (async () => setEventInformationConfig(await fetchJSON(eventInfoAPI)))();
  }, []);
}
