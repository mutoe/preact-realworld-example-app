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

interface LoginUser {
    email: string;
    password: string;
}

interface RegistrationUser {
    username: string;
    email: string;
    password: string;
}
