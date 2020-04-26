import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from './users.entity';

export class SettingsDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    options: string;
}