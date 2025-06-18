import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: typeof User) {}

  async create(data: CreateUserDto): Promise<string> {
    await this.validateByEmail(data.email);
    try {
      const dataValues = await this.userRepository.create({ ...data });
      return dataValues.id;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<UserDto> {
    const dataValues = await this.findUserByPk(id);
    return {
      id: dataValues.id,
      email: dataValues.email,
      username: dataValues.username,
    };
  }

  async update(id: string, data: UpdateUserDto): Promise<void> {
    if (data.email) {
      await this.validateByEmail(data.email);
    }
    try {
      await this.userRepository.update({ ...data }, { where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    // Check user exist
    await this.findUserByPk(id);
    await this.userRepository.destroy({ where: { id } });
  }

  private async findUserByPk(id: string) {
    const dataValues = await this.userRepository.findByPk(id);
    if (!dataValues) {
      throw new NotFoundException('User not found');
    }
    return dataValues;
  }

  // Used for validation email (in db his unique)
  private async validateByEmail(email: string) {
    const dataValues = await this.userRepository.findOne({ where: { email } });
    if (dataValues) {
      throw new ConflictException('This email is already in use');
    }
    return dataValues;
  }
}
