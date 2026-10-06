export type StringCleanFor<R extends boolean> = R extends true
  ? (value: unknown) => string
  : (value: unknown) => string | undefined;
