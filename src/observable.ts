export class Observable<T1 = void, T2 = void> {
  private observers: ((param1: T1, param2: T2) => void)[] = [];

  subscribe(action: (param1: T1, param2: T2) => void) {
    const signatureAlreadyAdded = this.observers.some(p => p.toString() === action.toString());
    if (signatureAlreadyAdded) {
      throw new Error(`Function has been already "${action.toString()}" subscribed`);
    }
    this.observers.push(action);
  }

  unsubscribe(action: (param1: T1, param2: T2) => void) {
    const foundIndex = this.observers.findIndex(p => p.toString() === action.toString());
    if (foundIndex < 0) return;
    this.observers.splice(foundIndex, 1);
  }

  fire(param1: T1, param2: T2) {
    this.observers.forEach(p => p(param1, param2));
  }

  clear() {
    this.observers = [];
  }
}
