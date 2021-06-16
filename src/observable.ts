export class Observable {
  #observers: (() => void)[] = [];

  subscribe(action: () => void) {
    this.#observers.push(action);
  }

  unsubscribe(action: () => void) {
    const foundIndex = this.#observers.indexOf(action);
    this.#observers.splice(foundIndex, 1);
  }

  fire() {
    this.#observers.forEach(p => p());
  }

  clear() {
    this.#observers = [];
  }
}
