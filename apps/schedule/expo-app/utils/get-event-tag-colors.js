import databaseUrl from "../configs/database-url";
import fetchJSON from "./fetch-json";
const eventTagColorsAPI = `${databaseUrl}/configs/event-tag-colors.json`;
let eventTagColorsPromise = null;
export default function getEventTagColors() {
  if (!eventTagColorsPromise) eventTagColorsPromise = fetchJSON(eventTagColorsAPI);
  return eventTagColorsPromise;
}
