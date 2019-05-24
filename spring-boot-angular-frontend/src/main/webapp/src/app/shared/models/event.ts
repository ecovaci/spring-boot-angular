export class EventModel {

  constructor(readonly eventType: EventType,readonly content?: any) {
  }
}

export const enum EventType { OpenLoginDialog, CloseLoginDialog }
