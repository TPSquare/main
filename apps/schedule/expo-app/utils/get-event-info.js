import databaseUrl from "../configs/database-url";
const eventInfoAPI = `${databaseUrl}/configs/event-information.json`;
let eventInfoPromise = null;
export default function getEventInfo() {
  if (!eventInfoPromise) eventInfoPromise = fetch(eventInfoAPI).then((res) => res.json());
  return eventInfoPromise;
}
