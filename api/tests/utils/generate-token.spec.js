import { generateToken } from '../../utils/generate-token';
import jwt from 'jsonwebtoken';

describe('Generate JWT', () => {
  it('should generate valid JWT', () => {
    const testSecret = 'testing_jwt_secret';
    const token = generateToken({ id: 0, fullName: 'Test User', email: 'test@email.com' }, testSecret, '10m');

    const user = jwt.verify(token, testSecret);

    expect(user.id).toBe(0);
    expect(user.fullName).toBe('Test User');
    expect(user.email).toBe('test@email.com');
  });
});
