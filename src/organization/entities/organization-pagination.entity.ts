import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../types/paginated';
import { Organization } from './organization.entity';

@ObjectType()
export class OrganizationPagination extends Paginated(Organization) { }
