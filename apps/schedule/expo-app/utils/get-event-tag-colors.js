import databaseUrl from "../configs/database-url";
const eventTagColorsAPI = `${databaseUrl}/configs/event-tag-colors.json`;
let eventTagColorsPromise = null;
export default function getEventTagColors() {
  if (!eventTagColorsPromise)
    eventTagColorsPromise = fetch(eventTagColorsAPI).then((res) => res.json());
  return eventTagColorsPromise;
}