export class Observable<T = void> {
  private observers: ((param: T) => void)[] = [];

  subscribe(action: (param: T) => void) {
    const signatureAlreadyAdded = this.observers.some(p => p.toString() === action.toString());
    if (signatureAlreadyAdded) {
      throw new Error(`Function has been already "${action.toString()}" subscribed`);
    }
    this.observers.push(action);
  }

  unsubscribe(action: (param: T) => void) {
    const foundIndex = this.observers.findIndex(p => p.toString() === action.toString());
    if (foundIndex < 0) return;
    this.observers.splice(foundIndex, 1);
  }

  fire(param: T) {
    this.observers.forEach(p => p(param));
  }

  clear() {
    this.observers = [];
  }
}
