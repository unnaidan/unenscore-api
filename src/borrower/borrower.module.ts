import { Module, forwardRef } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { OrganizationModule } from '../organization/organization.module';
import { BorrowerResolver } from './borrower.resolver';
import { BorrowerService } from './borrower.service';

@Module({
    providers: [
        BorrowerResolver,
        BorrowerService
    ],
    exports: [
        BorrowerService
    ],
    imports: [
        forwardRef(() => ApplicationModule),
        forwardRef(() => OrganizationModule)
    ]
})
export class BorrowerModule { }
