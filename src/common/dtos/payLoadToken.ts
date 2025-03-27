import { ROLE } from 'src/common/constants/enum';

export type JwtPayload = {
  sub: string;
  name: string;
  roles: ROLE;
};
