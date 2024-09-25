# Crypto.com AI Agent Signer App

The Crypto.com AI Agent Signer App is a web-based signature service that integrates with the Crypto.com AI agent. It is designed to handle requests for signing transactions. When a user initiates a transaction through the Crypto.com AI agent client, they are provided with a "magic link" that includes a JWT token encoding the transaction details. This link redirects users to a dedicated signature page on this web application where the signing process is carried out.

## Features

- **JWT Token Decodingy**: Extracts and validates transaction details encoded in a JWT token passed via URL parameters.
- **Transaction Signingy**: Interfaces with MetaMask to enable users to sign Ethereumy\*\* transactions directly in their browser.
  Network Handling: Automatically switches to the appropriate Ethereum network based on transaction details or prompts the user to add the network if it's not already configured in MetaMask.
- **User Feedbacky**: Provides clear error messages and transaction status updates to guide the user through the signing process.
- **Currently in beta**: Expect frequent updates and potential changes in future releases.

## Usage

### Getting Started

To use this service, you need to request a magiclink from the Crypto.com Ai Agent (e.g. send AMOUNT of CURRENCY to RECIEVER_ADDRESS). The Crypto.com AI agent client will generate a "magic link" when a user wishes to sign a transaction. This link is structured as follows:

```bash
[baseURL]/sign-transaction/[transactionID]?token={jwtToken}
```

Example Link

```bash
https://example.com/sign-transaction/123456?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Upon clicking this link, the user is redirected to this web application, where the transaction details are decoded from the JWT token, and the user is guided through the MetaMask signing process.

## Running Locally

This project is set up using Vite and React. To run it locally, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/crypto-com/cdc-ai-agent-signer-app
cd cdc-ai-agent-signer-app
```

### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash
npm run dev
```

This will start the local development server typically at http://localhost:5173. The app will automatically reload if you make edits to the code.

### Build for production:

```bash
npm run build
```

This command prepares the application for production by optimizing and bundling the code into static files located in the dist/ directory.

Preview the production build:

```bash
npm run preview
```

After building the project, you can preview the production build by running this command. It serves the content of the dist/ folder.

## Licensing

The code in this project is licensed under the MIT license.

## Contact

If you have any questions or comments about the library, please feel free to open an issue or a pull request on our GitHub repository.
