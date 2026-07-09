import { getEvents } from "@/lib/content";
import { EventsStripClient } from "./EventsStripClient";

/** Server wrapper: fetches upcoming events, hands them to the client strip. */
export async function EventsStrip() {
  const events = await getEvents();
  if (!events.length) return null;
  return <EventsStripClient events={events} />;
}
