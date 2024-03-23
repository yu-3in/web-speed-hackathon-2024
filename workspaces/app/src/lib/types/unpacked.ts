export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
