import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../types/paginated';
import { Score } from './score.entity';

@ObjectType()
export class ScorePagination extends Paginated(Score) { }
