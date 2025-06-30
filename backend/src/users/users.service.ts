import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitiy/user.entitiy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(username: string, email: string, password: string) {
    const user = this.usersRepository.create({ username, email, password });
    return await this.usersRepository.save(user);
  }

  async findUserByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

 async updateUser(id: number, updateData: Partial<User>) {
  await this.usersRepository.update(id, updateData);
  return this.usersRepository.findOne({ where: { id } });
}
}