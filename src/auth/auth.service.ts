import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Validate user password.
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise}
     */
    async validate(email: string, password: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !!user && compareSync(password, user.password);
    }

    /**
     * Generate jwt token.
     *
     * @param {string} email
     * @returns {Promise}
     */
    async signIn(email: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        const accessToken = this.jwtService.sign({
            id: user.id
        });
        return {
            accessToken,
            user
        };
    }
}
