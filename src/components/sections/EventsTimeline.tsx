import { getEvents, getGuests } from "@/lib/content";
import { EventsTimelineClient } from "./EventsTimelineClient";

/** Server wrapper: fetches events + guests, hands them to the client timeline. */
export async function EventsTimeline() {
  const [events, guests] = await Promise.all([getEvents(), getGuests()]);
  return <EventsTimelineClient events={events} guests={guests} />;
}
