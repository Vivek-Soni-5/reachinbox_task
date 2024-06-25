import { gmail_v1 } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';
import { getGmailClient } from '../services/gmail';
import { getOutlookClient } from '../services/outlook';

export async function fetchGmailEmails() {
    const gmail = await getGmailClient();
    const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
    return res.data.messages || [];
}

export async function fetchOutlookEmails() {
    const client = await getOutlookClient();
    const messages = await client.api('/me/messages').filter('isRead eq false').get();
    return messages.value || [];
}

export async function getEmailText(id: string, service: 'gmail' | 'outlook'): Promise<string> {
    if (service === 'gmail') {
        const gmail = await getGmailClient();
        const res = await gmail.users.messages.get({ userId: 'me', id });
        return res.data.snippet!;
    } else {
        const client = await getOutlookClient();
        const message = await client.api(`/me/messages/${id}`).get();
        return message.body.content;
    }
}

export async function sendGmailReply(emailId: string, replyText: string) {
    const gmail = await getGmailClient();
    const message = `Subject: Re: \n\n${replyText}`;
    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage,
        },
    });
}

export async function sendOutlookReply(emailId: string, replyText: string) {
    const client = await getOutlookClient();
    await client.api(`/me/messages/${emailId}/reply`).post({ comment: replyText });
}
