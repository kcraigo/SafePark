

export default function config()
{

    const baseURL = '[YOUR SHAREPOINT URL]';
    const appID = '[APPID FROM AZURE ACTIVE DIRECTORY REGISTRATION STEP]';
    const tenant = '[YOUR TENANT URL]'
    const tenantID ='[TENANTID OR DIRECTORYID FROM AZURE ACTIVE DIRECTORY REGISTRATION STEP]'; // found in Overview Blade of your app's registration
    const authority = 'https://login.microsoftonline.com/'+tenantID+'/oauth2/v2.0/authorize?';
    const responseType =  'code';
    const responseMode = 'query';
    const state = '12345';

    const redirectUri ='https://[YOUR TENANT].sharepoint.com/[YOUR FOLDER URL]/index.aspx';

    const scopes = [
                        'user.read.all',
                        'calendars.read'
                    ];

    return {appID: appID, baseURL: baseURL, redirectUri: redirectUri, scopes: scopes, tenant: tenant, tenantID: tenantID, authority: authority, responseMode: responseMode, responseType: responseType, state: state};

}
