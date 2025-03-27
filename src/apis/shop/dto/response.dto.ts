import { ROLE } from 'src/common/constants/enum';

export class ResCreateShopDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  verify: boolean;
  roles: ROLE;
}
