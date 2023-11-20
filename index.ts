import { Utilities } from './index.d'

const INSTANCE = Symbol.for('INSTANCE')
const REGISTRY = Symbol.for('REGISTRY')
const defaultRegistry: Utilities.EventBus.Registry = {
  [Utilities.EventBus.Topics.StoreChanged]: [],
  [Utilities.EventBus.Topics.LoggedIn]: []
}

export class EventBus implements Utilities.EventBus.Contract {
  private [REGISTRY]: Utilities.EventBus.Registry = defaultRegistry
  private static [INSTANCE]: EventBus

  private constructor () {}

  static get instance() {
    if (!this[INSTANCE]) {
      this[INSTANCE] = new this()
    }

    return this[INSTANCE]
  }

  register<Topic extends Utilities.EventBus.Topics>(
    topic: Topic,
    handle: (data: Utilities.EventBus.EventData<Topic>) => void
  ) {
    // @ts-ignore
    this[REGISTRY][topic].push(handle)
  }

  dispatch<Topic extends Utilities.EventBus.Topics>(
    topic: Topic,
    data: Utilities.EventBus.EventData<Topic>
  ) {
    this[REGISTRY][topic].forEach(handle => {
      // @ts-ignore
      handle(data)
    })
  }
}

export default EventBus.instance
