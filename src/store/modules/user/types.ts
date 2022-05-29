export type TRoleType = 0 | 1 | 2;
export interface IUserState {
  name?: string;
  avatar?: string;
  email?: string;
  role: TRoleType;
}
