# Email Automation Tool

This project is an email automation tool that integrates with Gmail, Outlook, and OpenAI to categorize incoming emails and send automated replies based on their content.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting Redis Server](#starting-redis-server)
  - [Building and Running the Project](#building-and-running-the-project)
  - [Initial Setup and Authorization](#initial-setup-and-authorization)

---

## Prerequisites

Before starting, ensure you have the following installed and set up:

- **Node.js and npm (or yarn):**
  - [Download and install Node.js](https://nodejs.org/)
  - Verify installation:
    ```bash
    node --version
    npm --version
    ```

- **Redis server (version 5.0.0 or higher):**
  - [Download and install Redis](https://redis.io/download)
  - Verify installation:
    ```bash
    redis-server --version
    ```

- **Google Cloud Platform project:**
  - Create a project and enable the Gmail API.
  - Create OAuth 2.0 credentials for a web application.
  - Set the redirect URI to `http://localhost:3000/oauth2callback`.

- **Microsoft Azure project:**
  - Create a project and enable the Outlook API.
  - Register a new application and generate client ID, client secret, and tenant ID.

- **OpenAI API key:**
  - [Sign up for OpenAI](https://platform.openai.com/signup)
  - Obtain your API key from the dashboard.

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Vivek-Soni-5/reachinbox_task.git
   cd email-automation-tool
   npm install

2. **Set up environment variables:**
   Create a .env file in the root directory based on the provided .env.example. Update the variables with your actual credentials and settings:
   ```bash
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback
    
    OUTLOOK_CLIENT_ID=your-outlook-client-id
    OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
    OUTLOOK_TENANT_ID=your-outlook-tenant-id
    
    OPENAI_API_KEY=your-openai-api-key
    REDIS_HOST=localhost
    REDIS_PORT=6379
3. **Starting Redis Server**
   ```bash
    npm run dev
4. **Initial Setup and Authorization**
   - On the first run, the application will prompt you to authorize access to your Gmail and Outlook accounts. Follow the authorization URL provided in the console and complete the authorization flow.

   - Once authorized, the application will start processing emails from your connected accounts, categorizing them based on content and sending automated replies using OpenAI.
