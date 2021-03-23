import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

/**
 * @module Auth
 * @description Authentication related methods
 */

class Auth {
  /**
   * @description Generated jwt token
   * @param {object} payload - Details to encode in the token
   * @returns {string} Generated token
   * @memberof Auth
   */

  static generateToken(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return token;
  }

  /**
   * @static
   * @description Allows a user to sign up
   * @param {String} password - Request object
   * @param {String} hashPassword - Response object
   * @returns {Boolean} Returns true if the password is correct
   * @memberof Helper
   */
  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @static
   * @description verifies a user
   * @param {String} password - Request object
   * @param {String} hashPassword - Response object
   * @returns {Boolean} Returns true if the password is correct
   * @memberof Auth
   */
  static async verifyUserToken(token, callBack) {
    return jwt.verify(token, secret, callBack);
  }
}

export default Auth;
