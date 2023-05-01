import { Module, forwardRef } from '@nestjs/common';
import { BorrowerModule } from '../borrower/borrower.module';
import { ScoreModule } from '../score/score.module';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
    providers: [
        ApplicationResolver,
        ApplicationService
    ],
    exports: [
        ApplicationService
    ],
    imports: [
        forwardRef(() => BorrowerModule),
        forwardRef(() => ScoreModule)
    ]
})
export class ApplicationModule { }
