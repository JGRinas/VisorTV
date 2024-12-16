import { Subject } from "rxjs";

interface EventBusEvent {
  type: "online" | "offline";
  isOnline: boolean;
}

const eventBus = new Subject<EventBusEvent>();

export default eventBus;
