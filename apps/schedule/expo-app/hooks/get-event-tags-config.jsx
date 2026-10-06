import { useEffect } from "react";

import databaseUrl from "../configs/database-url";
import fetchJSON from "../utils/fetch-json";

const eventTagsAPI = `${databaseUrl}/configs/event-tags.json`;
export default function (setEventTagsConfig) {
  useEffect(() => {
    (async () => {
      const tagsConfig = await fetchJSON(eventTagsAPI);
      for (const key in tagsConfig) tagsConfig[key].adretimes.push(0.1);
      setEventTagsConfig(tagsConfig);
    })();
  }, []);
}
