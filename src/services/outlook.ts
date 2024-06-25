import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import { config } from '../config';

const cca = new ConfidentialClientApplication({
    auth: {
        clientId: config.outlook.clientId,
        authority: `https://login.microsoftonline.com/${config.outlook.tenantId}`,
        clientSecret: config.outlook.clientSecret,
    },
});

async function getAccessToken(): Promise<string> {
    const clientCredentialRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
    };

    const authResult = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    return authResult!.accessToken;
}

export async function getOutlookClient() {
    const accessToken = await getAccessToken();
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
}
