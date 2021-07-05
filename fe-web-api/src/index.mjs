import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

import ProxyFactory from './proxies.mjs';

// Initialize from any environment variables first.

const port = process.env.FE_WEB_API_PORT || 9000;

const jwt_secret = process.env.JWT_SECRET;

const proxyUrlAuthorization = process.env.BE_AUTH_URL || 'http://localhost:9001';
const proxyUrlCampaigns = process.env.BE_CAMPAIGNS_URL || 'http://localhost:9002';

// Now, initialize the other variables/constants.

const app = express();

// Create and register cors

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Prepare any common middleware.

const verifyJwt = (req, res, next) => {
    const token = req.headers['authorization'];

    if( token && jwt.verify(token, jwt_secret)) {
        next();
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).end();
    }
};

// Create and register the proxies.

app.use( ProxyFactory.createCampaignProxy( proxyUrlCampaigns ) );
app.use( ProxyFactory.createAuthorizationProxy( proxyUrlAuthorization ) );

app.use( verifyJwt, ProxyFactory.createUserCampaignProxy( proxyUrlCampaigns ) );

// Register any local handles.

app.get( '/', (req, res) => {
    // Joke response mainly to see if the micro-service is alive or not.
    //
    // It is also less likely to be consumed and interpreted by accident as the
    // status code is a joke code.
    
    res.status( StatusCodes.IM_A_TEAPOT )
       .send( "Ask me nicely and I may brew coffee" );
} );

// Finally, listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
