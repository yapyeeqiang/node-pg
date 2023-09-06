import { AppDataSource } from "../data-source";
import { User } from "./entity";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async one(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async save(payload: User) {
    const user = Object.assign(new User(), payload);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) return;

    const user = await this.userRepository.remove(userToRemove);

    return user;
  }
}
