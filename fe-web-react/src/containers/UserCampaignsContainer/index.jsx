import { Fragment, useEffect, useState } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';

import WebApi from '../../web-api';

const UserCampaignsContainer = (props) => {
    const [isLoading, setIsLoading] = useState( true );
    const [campaigns, setCampaigns] = useState( [] );

    const { getToken } = useAuthorization();

    useEffect(() => {
        WebApi.getUserCampaigns( getToken() )
              .then((response) => {
                    setIsLoading( false );

                    setCampaigns( response.data );
              })
              .catch((err) => {
                  console.log(err);
              });
    });

    const addCampaign = () => {
        alert( "add campaign" );
    };

    const editCampaign = (campaign) => {
        alert( "Sorry, not implemented yet." );
    };

    const deleteCampaign = (campaign) => {
        alert( "delete campaign" );
    };

    return(
        <Fragment>
            {isLoading && 
                <CampaignTableLoading />}

            {!isLoading &&
                <CampaignTable
                    campaigns={campaigns}
                    canModify={true}
                    addCampaign={addCampaign}
                    editCampaign={editCampaign}
                    deleteCampaign={deleteCampaign} />}
        </Fragment>
    );
};

export default UserCampaignsContainer;