export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
};
