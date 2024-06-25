import dotenv from 'dotenv';
import { config } from './config'; // Ensure you have a config file to manage environment variables
import { startEmailProcessing } from './jobs/emailProcessor';

// Load environment variables from .env file
dotenv.config();

// Main function to start the application
async function main() {
    try {
        // Initialize services or connections here
        console.log('Starting email processing...');
        await startEmailProcessing();
        console.log('Email processing started.');
    } catch (error) {
        console.error('Error starting application:', error);
    }
}

// Start the main function
main();
