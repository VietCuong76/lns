import { ROLE } from 'src/common/constants/enum';

export class CreateShopDTO {
  name: string;
  password: string;
  email: string;
  roles?: ROLE;
}
