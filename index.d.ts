export namespace Utilities {
  export namespace EventBus {
    export enum Topics {
      StoreChanged = 'StoreChanged',
      LoggedIn = 'LoggedIn'
    }
    export type EventData<T extends Topics> = T extends Topics.StoreChanged
      ? { userId: string }
      : T extends Topics.LoggedIn
        ? { authToken: string, userId: string }
        : never
    export interface Registry {
      [Topics.StoreChanged]: ((data: EventData<Topics.StoreChanged>) => void)[]
      [Topics.LoggedIn]: ((data: EventData<Topics.LoggedIn>) => void)[]
    }
    export interface Contract {
      register<Topic extends Topics>(
        topic: Topic,
        handle: (data: EventData<Topic>) => void
      ): void
    
      dispatch<Topic extends Topics>(
        topic: Topic,
        data: EventData<Topic>
      ): void
    }
  }
}
