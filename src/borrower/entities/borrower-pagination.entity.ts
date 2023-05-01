import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../types/paginated';
import { Borrower } from './borrower.entity';

@ObjectType()
export class BorrowerPagination extends Paginated(Borrower) { }
