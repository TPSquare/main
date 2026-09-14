import { useEffect } from "react";

import databaseUrl from "../configs/database-url";
import fetchJSON from "../utils/fetch-json";

const eventTagsAPI = `${databaseUrl}/configs/event-tags.json`;
export default function (setEventTagsConfig) {
  useEffect(() => {
    (async () => setEventTagsConfig(await fetchJSON(eventTagsAPI)))();
  }, []);
}
