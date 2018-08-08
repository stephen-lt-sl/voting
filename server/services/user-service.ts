import { User } from '../schemas/user';
import { IUser } from '../interfaces/user';


export class UserService {

  validateUserDomain(userDomain: string | undefined) {
    return userDomain === 'scottlogic.co.uk';
  }

  createNewUser(userDomain: string | undefined, googleId: string, name?: string): Promise<IUser> {
    if (!this.validateUserDomain(userDomain)) {
      return Promise.reject(`Invalid user domain: ${userDomain}`);
    }
    return new User({ googleId: googleId, name: name || 'Anonymous' }).save();
  }

  findOrCreateUser(userDomain: string | undefined, googleId: string, name?: string): Promise<IUser> {
    return User.findOne({ googleId: googleId }).exec()
      .then(user => {
        if (user !== null) {
          return user;
        }
        return this.createNewUser(userDomain, googleId, name);
      });
  }

}
