import response from '../utils/Response';
import auth from '../utils/Authorization';
import models from '../database/models';

const { errorStat } = response;

/**
 * @Module Authenticate
 * @description Authentication related methods
 */
class Authenticate {
  /**
   * @static
   * @description Authenticate the routes
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Object} next - Next function call
   * @returns {object} Json
   * @memberof Authenticate
   */
  static async verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return errorStat(res, 401, 'Authorization error');
    const token =
      req.headers.authorization.split(' ')[1] || authorizationHeader;
    let verifiedUser;
    try {
      verifiedUser = await auth.verifyUserToken(token, async (err, decoded) => {
        if (err) {
          throw new Error();
        }
        return decoded;
      });
    } catch (err) {
      return errorStat(res, 401, 'invalid token');
    }
    const { id } = verifiedUser;
    const user = await models.User.findByPk(id);
    if (!user) {
      return errorStat(res, 404, 'user not found');
    }
    req.user = user;
    return next();
  }
}

export default Authenticate;
