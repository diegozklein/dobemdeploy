import { User } from "../../../interfaces/register_Interface";
import { api } from "../config/api";

export class UserService {
  static register(user: User): Promise<void> {
    return api.post('register', { body: user })
  }
}
