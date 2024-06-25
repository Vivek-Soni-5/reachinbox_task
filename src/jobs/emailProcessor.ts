import { Queue, Worker, Job, RepeatOptions } from 'bullmq';
import { fetchGmailEmails, fetchOutlookEmails, getEmailText, sendGmailReply, sendOutlookReply } from '../utils/emailutils';
import { categorizeEmail, generateReply } from '../services/openai';
import { config } from '../config';

const emailQueue = new Queue('emailQueue', {
    connection: {
        host: config.redis.host,
        port: config.redis.port
    }
});

// Example: Run every minute
const repeatOptions: RepeatOptions = { every: 60000 };

emailQueue.add('checkEmails', {}, { repeat: repeatOptions });

new Worker('emailQueue', async (job: Job) => {
    if (job.name === 'checkEmails') {
        await startEmailProcessing();
    }
}, {
    connection: {
        host: config.redis.host,
        port: config.redis.port
    }
});

export async function startEmailProcessing() {
    const gmailEmailIds = await fetchGmailEmails();
    const outlookEmailIds = await fetchOutlookEmails();

    for (const { id } of gmailEmailIds) {
        if (id) { // Check if id is not null or undefined
            const text = await getEmailText(id, 'gmail');
            const label = await categorizeEmail(text);
            const reply = await generateReply(text);
            await sendGmailReply(id, reply);
        }
    }

    for (const { id } of outlookEmailIds) {
        if (id) { // Check if id is not null or undefined
            const text = await getEmailText(id, 'outlook');
            const label = await categorizeEmail(text);
            const reply = await generateReply(text);
            await sendOutlookReply(id, reply);
        }
    }
}
