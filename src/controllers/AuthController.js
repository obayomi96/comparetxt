/* eslint-disable camelcase */
import models from '../database/models';
import response from '../utils/Response';
import auth from '../utils/Authorization';

/**
 * @Module UserController
 * @description Controlls all the user based activity
 */
class UserController {

  /**
   * @static
   * @description Allows a user to sign in
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} object containing user data and access Token
   * @memberof UserController
   */
  static async login(req, res) {
    const { email, password } = req.body.user;
    const user = await models.User.findOne({ where: { email } });

    if (!user)
      return response.errorStat(
        res,
        401,
        'User not found, check your login details'
      );
    const matchPasswords = auth.comparePassword(password, user.password);
    if (!matchPasswords) {
      return response.errorStat(res, 401, 'Incorrect Login information');
    }
    return response.successStat(res, 200, 'user', {
      id: user.id,
      token: await auth.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
      name: user.name,
      email: user.email,
    });
  }
}

export default UserController;
