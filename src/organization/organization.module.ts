import { Module, forwardRef } from '@nestjs/common';
import { BorrowerModule } from '../borrower/borrower.module';
import { UserModule } from '../user/user.module';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
    providers: [
        OrganizationResolver,
        OrganizationService
    ],
    exports: [
        OrganizationService
    ],
    imports: [
        forwardRef(() => BorrowerModule),
        forwardRef(() => UserModule)
    ]
})
export class OrganizationModule { }
