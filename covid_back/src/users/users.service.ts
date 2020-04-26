import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../models/user/users.dto';
import { SettingsDto } from '../models/user/settings.dto';
import { Settings } from '../models/user/settings.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>,
    @InjectRepository(Settings) public readonly settingsRepository: Repository<Settings>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['email', 'firstName', 'id', 'lastName'],
      order: { id: 'ASC' },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne(null, { where: { email } });
  }

  async findMatchEmailPassword(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(null, {
      where: { email, password },
    });
    if (!user) {
      throw new Error('Wrong email or password');
    }
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const userToDelete = await this.findOneById(id);
    if (!userToDelete) {
      return null;
    }
    return this.userRepository.remove(userToDelete);
  }

  async updateOne(userId: number, usersDto: UserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(userId);
    if (!userToUpdate) {
      return null;
    }
    const payloaderUser: UserDto = {
      ...usersDto,
      firstName: usersDto.firstName || userToUpdate.firstName,
      lastName: usersDto.lastName || userToUpdate.lastName
    };
    await this.userRepository.update(userId, payloaderUser);
    return await this.userRepository.findOne(userId);
  }

  async findOneSaltByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.salt'])
      .getOne();
  }
  async saveSettingsUser(settingsDto: SettingsDto, id: number): Promise<User> {
    const settings: Settings = {
      ...settingsDto,
      user: await this.findOneById(id)
    };
    const createdSettings = await this.settingsRepository.save(
      settings,
    );
    return createdSettings;
  }

  async getSettingsUserById(id: number): Promise<Settings[]> {
    const settings = await this.settingsRepository.find({relations: ['user'], where: [{ user: id }]});
    if (!settings) {
      throw new Error('no settings for this user');
    }
    return settings;
  }

  async updateSettingsByUserId(userId: number, settings: SettingsDto, settingsId: number): Promise<Settings> {
    const user = await this.getSettingsUserById(userId);
    if (!user) {
      throw new Error('no user with this id');
    }
    const settingsToUpdate = await this.settingsRepository.findOne(settingsId);
    if (!settingsToUpdate) {
      throw new Error('no settings with this id');
    }
    const settingsPayload: Settings = {
      type: settings.type || settingsToUpdate.type,
      options: settings.options || settingsToUpdate.options
    };
    const update = await this.settingsRepository.update(settingsId, settingsPayload);
    return await this.settingsRepository.findOne(settingsId);
  }
}
