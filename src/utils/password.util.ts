import * as bcrypt from 'bcrypt';

export class PasswordUtil {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(storedPassword: string, suppliedPassword) {
        return await bcrypt.compare(suppliedPassword, storedPassword);
    }
}
