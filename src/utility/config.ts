

export default function config()
{

    const baseURL = '[YOUR SHAREPOINT URL]';
    
    // Get AppID from your Azure Portal  - Active Directory - App Registrations - App Overview Page
    const appID = '[APPID FROM AZURE ACTIVE DIRECTORY REGISTRATION STEP]';
    
    // Find in many locations, i.e. Branding - Publisher Domain
    const tenant = '[YOUR TENANT URL]'

    // Get Tenant ID from your Azure Portal  - Active Directory - Properties OR App Registrations - App Overview Page
    const tenantID ='[TENANTID OR DIRECTORYID FROM AZURE ACTIVE DIRECTORY REGISTRATION STEP]'; 

    const authority = 'https://login.microsoftonline.com/'+tenantID+'/oauth2/v2.0/authorize?';
    const responseType =  'code';
    const responseMode = 'query';
    const state = '12345';

    // Where should Azure Active Directory return the Access and Refresh Tokens
    const redirectUri ='https://[YOUR TENANT].sharepoint.com/[YOUR FOLDER URL]/index.aspx';

    // Requested Permissions
    const scopes = [
                        'user.read.all',
                        'calendars.read'
                    ];

    return {appID: appID, baseURL: baseURL, redirectUri: redirectUri, scopes: scopes, tenant: tenant, tenantID: tenantID, authority: authority, responseMode: responseMode, responseType: responseType, state: state};

}
