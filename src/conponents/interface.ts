
export interface IUser {
  admin: boolean;
  username: string;
  userId: string;
}

export interface IContext {
  isAuthorized: [
    boolean,
    (login: boolean)=> void
];
  user: IUser;
}

export interface IGroup {
  create: string;
  description: string;
  name: string;
  users: number;
  _id: string;
}