import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../types/paginated';
import { User } from './user.entity';

@ObjectType()
export class UserPagination extends Paginated(User) { }
