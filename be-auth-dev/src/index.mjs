import express from 'express';
import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.BE_AUTH_DEV_PORT || 9001;

const secret = process.env.JWT_SECRET;

// Register the parsers.

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ));

// Register the handlers.

app.post( '/login', (req, res ) => {
    const requestData = req.body;

    const userEmail = requestData.email;

    if(userEmail) {
        const clearToken = {
            email: userEmail
        };

        const options = {
            expiresIn: "2h"
        };

        const token = jwt.sign( clearToken, secret, options );

        res.set({
            "Authorization": token
        });

        res.status( StatusCodes.OK );
    }
    else {
        res.status( StatusCodes.FORBIDDEN );
    }

    res.end();
} );

// Finally, listen on the port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
