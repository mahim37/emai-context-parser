# Email-Context-Parser

## Overview

This project aims to build a tool that will parse and check emails in both Google and Outlook accounts, and respond to these emails based on their context using AI. This tool utilizes BullMQ as the task scheduler and is built using TypeScript.

![alt text](<./frontend//public/Screenshot from 2024-06-27 17-44-05.png>)

## Features
1. **OAuth Setup for Gmail and Outlook**
   - Securely connects and authenticates with Google and Outlook email accounts using OAuth.

2. **Email Context Understanding**
   - Uses OpenAI to analyze and understand the context of incoming emails.
   - Automatically assigns labels to emails based on their content.

3. **Automated Responses**
   - Generates and sends automated replies to emails based on the context, using OpenAI.

4. **Task Scheduling**
   - Uses BullMQ to schedule and manage email parsing and response tasks.

![alt text](<./frontend//public/Screenshot from 2024-06-27 18-33-49.png>)

## Prerequisites
- Node.js and npm
- TypeScript
- Google Cloud Platform and Microsoft Azure accounts
- OpenAI API key
- Redis server for BullMQ

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mahim37/email-context-parser.git
cd email-parser-autoresponse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup OAuth Access

#### Gmail OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the Gmail API.
4. Create OAuth 2.0 credentials.

#### Outlook OAuth
1. Go to the [Azure Portal](https://portal.azure.com/).
2. Register a new application.
3. Configure API permissions for Microsoft Graph (Mail.Read and Mail.Send).
4. Create OAuth 2.0 credentials.

### 4. Environment Configuration
Create a `.env` file in the project root and add the following environment variables:
```env
GMAIL_CLIENT_ID=<your-gmail-client-id>
GMAIL_CLIENT_SECRET=<your-gmail-client-secret>
GMAIL_REDIRECT_URI=<your-gmail-redirect-uri>

OUTLOOK_CLIENT_ID=<your-outlook-client-id>
OUTLOOK_CLIENT_SECRET=<your-outlook-client-secret>
OUTLOOK_TENANT_ID=<your-outlook-tenant-id>
OUTLOOK_REDIRECT_URI=<your-outlook-redirect-uri>

OPENAI_API_KEY=<your-openai-api-key>
REDIS_URL=<your-redis-url>
```

### 5. Build the Project
```bash
npm run build
```

### 6. Run the Backend
```bash
npm start
```
### 7. Run the Front-end
```bash
cd frontend/
npm i
npm run dev
```
## Usage

### Connecting New Email Accounts
1. Navigate to `localhost:5173`.
2. Connect your Google or Outlook email accounts using OAuth.


### Demonstration Workflow
1. **Send an Email**: From another account, send an email to the connected Google or Outlook account.
2. **Email Parsing**: The tool will read incoming emails automatically.
3. **Categorize Email**: Emails are categorized based on their content and assigned one of the following labels:
   - Interested
   - Not Interested
   - More Information
4. **Automated Response**: Based on the email context, the tool suggests an appropriate response and sends it. For example:
   - If the email expresses interest in more information, the tool will suggest scheduling a demo call and provide available times.


