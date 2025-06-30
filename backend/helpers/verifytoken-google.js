const { OAuth2Client } = require('google-auth-library');
const { env } = require('../configs/environment');
const client = new OAuth2Client(env.VITE_GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: env.VITE_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
};

module.exports = verifyGoogleToken;