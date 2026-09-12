import databaseUrl from "../configs/database-url";
import fetchJSON from "./fetch-json";
const eventInfoAPI = `${databaseUrl}/configs/event-information.json`;
let eventInfoPromise = null;
export default function getEventInfo() {
  if (!eventInfoPromise) eventInfoPromise = fetchJSON(eventInfoAPI);
  return eventInfoPromise;
}
