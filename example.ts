import { Utilities } from "./index.d";
import eventBus from ".";

eventBus.register(Utilities.EventBus.Topics.StoreChanged, ({ userId }) => {
  // do whatever you want with this
  console.log(userId)
})

// multiples!
eventBus.register(Utilities.EventBus.Topics.StoreChanged, ({ userId }) => {
  console.log('this is the other one!')
  // console.log(userId * 2) // type safe!
})

eventBus.dispatch(Utilities.EventBus.Topics.StoreChanged, {
  userId: 'hahah look this is cool.'
})

eventBus.dispatch(Utilities.EventBus.Topics.StoreChanged, {
  // userId: 1234 // typesafety!
  userId: 'this is also cool'
})