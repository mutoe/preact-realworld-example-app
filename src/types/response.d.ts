interface ResponseError {
  [field: string]: string[];
}

interface Response {
  errors: ResponseError;
}

interface ProfileResponse {
  profile: User
}
