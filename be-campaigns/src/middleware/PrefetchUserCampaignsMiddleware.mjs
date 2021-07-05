import StatusCodes from 'http-status-codes';

export default function preFetchUserCampaigns(req, res, next) {
    if( req.dbContext ) {
        const userId = req.userIdentity.email;

        if( userId ) {
            req.dbContext
               .Campaigns
               .find( { email: userId } )
               .then((matches) => {
                   req.existingData = matches;

                   next();
               })
               .catch((err) => {
                   console.log(err);

                   res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                      .send(err);
               });
        }
        else {
            res.status(StatusCodes.BAD_REQUEST)
               .send("Invalid parameters");
        }
    }
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
           .send("No context provided");
    }
}
