interface User {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface UserWithToken {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
  token: string;
}
