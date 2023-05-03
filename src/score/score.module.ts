import { Module, forwardRef } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { BorrowerModule } from '../borrower/borrower.module';
import { ScoreResolver } from './score.resolver';
import { ScoreService } from './score.service';

@Module({
    providers: [
        ScoreResolver,
        ScoreService
    ],
    exports: [
        ScoreService
    ],
    imports: [
        forwardRef(() => ApplicationModule),
        forwardRef(() => BorrowerModule)
    ]
})
export class ScoreModule { }
