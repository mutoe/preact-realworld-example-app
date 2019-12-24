interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface User {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
  token: string;
}
