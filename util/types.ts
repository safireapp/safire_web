export type SignupData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Error = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  website: string;
  location: string;
  imageUrl: string;
  created_at: string;
  role: string;

  confirmed: boolean;
  verified: boolean;

  username: string;
  email: string;
  password: string;

  // posts: Post[];
  // comments: Comment[];
  // likes: Like[];
};
