export class Observable<T = void> {
  private observers: ((param: T) => void)[] = [];

  subscribe(action: (param: T) => void) {
    this.observers.push(action);
  }

  unsubscribe(action: (param: T) => void) {
    const foundIndex = this.observers.indexOf(action);
    this.observers.splice(foundIndex, 1);
  }

  fire(param: T) {
    this.observers.forEach(p => p(param));
  }

  clear() {
    this.observers = [];
  }
}
