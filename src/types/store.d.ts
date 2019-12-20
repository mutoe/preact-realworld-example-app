interface RootState {
  user: UserWithToken | null;
  errors: ResponseError;
}

interface Action<T = any> {
  type: string;
  payload: T;
}
