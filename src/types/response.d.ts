interface ResponseError {
  [field: string]: string[];
}

interface Response {
  errors: ResponseError;
}
