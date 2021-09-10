export interface Motion {
  start(): Promise<unknown>;
  stop(): void;
}
