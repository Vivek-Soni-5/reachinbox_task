import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function authorize(): Promise<OAuth2Client> {
    const oAuth2Client = new google.auth.OAuth2(
        config.google.clientId,
        config.google.clientSecret,
        config.google.redirectUri
    );

    let token;
    try {
        token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    } catch (err) {
        token = await getNewToken(oAuth2Client);
    }
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
}

async function getNewToken(oAuth2Client: OAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this URL:', authUrl);
    // Handle the authorization code and get tokens here.
}

export async function getGmailClient() {
    const auth = await authorize();
    return google.gmail({ version: 'v1', auth });
}
