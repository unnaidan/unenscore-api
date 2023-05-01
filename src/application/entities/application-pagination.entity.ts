import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../types/paginated';
import { Application } from './application.entity';

@ObjectType()
export class ApplicationPagination extends Paginated(Application) { }
