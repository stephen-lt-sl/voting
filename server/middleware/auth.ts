import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { RequestHandler } from 'express';

export class VotingAuth {

  private authClient: OAuth2Client;

  constructor(private clientId: string) {
    this.authClient = new OAuth2Client(clientId);
  }

  verifyToken(idToken: string): Promise<TokenPayload> {
    return this.authClient.verifyIdToken({ idToken: idToken, audience: this.clientId })
      .then(ticket => {
        if (ticket === null) {
          return Promise.reject('Empty ticket.');
        }
        const payload = ticket.getPayload();
        if (payload === undefined) {
          return Promise.reject('Empty payload.');
        }
        return Promise.resolve(payload);
      });
  }

  authenticateUser: RequestHandler = (req, res, next) => {
    Promise.resolve(req.headers['authorization'])
      .then(authorizationHeader => {
        if (typeof authorizationHeader === 'string') {
          return Promise.resolve(authorizationHeader);
        }
        if (authorizationHeader !== undefined && authorizationHeader[0] !== undefined) {
          return Promise.resolve(authorizationHeader[0]);
        }
        return Promise.resolve(undefined);
      })
      .then(authorizationToken => {
        return authorizationToken !== undefined ?
          this.verifyToken(authorizationToken)
            .then(verifiedToken => {
              console.log(`Verified token: ${JSON.stringify(verifiedToken)}`);
              req.params.AuthenticatedUserId = verifiedToken;
            }) :
          Promise.resolve();
      })
      .catch(err => {
        console.error(err);
      })
      .then(next);
  }
}
