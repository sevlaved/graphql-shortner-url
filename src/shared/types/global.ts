export type ProjectionType<T> = {
  [K in keyof T]?: 0 | 1;
};
