// TODO: test this thing given time
export const uuidParamRouterMatch =
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

export const isStrictlyAlphabetic = (input: string): boolean =>
  /^[a-zA-Z\-\s]+$/.test(input);
