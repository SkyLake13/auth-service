import { sign } from 'jsonwebtoken';

export default function createToken(payload: {}): string {
    const privateKey = 'jkshdasldhlaksdsa';

    return sign(payload, privateKey, { expiresIn: 60 * 60 });
}
