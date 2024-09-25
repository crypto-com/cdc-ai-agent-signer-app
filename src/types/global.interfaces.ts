import { MetaMaskInpageProvider } from '@metamask/providers';

/**
 * Extension of the global Window interface to include MetaMask's provider API.
 * This allows for type-safe usage of MetaMask's Ethereum provider across the application.
 *
 * @property ethereum - The MetaMask in-page provider, which enables interaction with Ethereum blockchain and accounts.
 */
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

/**
 * Interface defining the structure of a decoded JWT token used for transaction purposes.
 * Contains all necessary details required to process a transaction.
 *
 * @param toAddress - The Ethereum address of the transaction recipient.
 * @param amount - The amount of currency to be sent.
 * @param currency - The type of currency used in the transaction (e.g., ETH).
 * @param chain - Detailed information about the blockchain network used for the transaction.
 * @param exp - The expiry timestamp of the token, indicating when it becomes invalid.
 */
export interface DecodedToken {
  toAddress: string;
  amount: number;
  currency: string;
  chain: ChainOptions;
  exp: number;
}

/**
 * Provides detailed information about a specific blockchain network configuration.
 *
 * @param id - The unique identifier for the blockchain network (e.g., Ethereum mainnet, Ropsten testnet).
 * @param name - The name of the blockchain network.
 * @param rpc - The RPC URL used to communicate with the network.
 */
export interface ChainOptions {
  id: number;
  name: string;
  rpc: string;
}

/**
 * Defines the return type of the `useTransactionDetails` hook, encapsulating the necessary
 * state and functions needed to manage transaction-related details.
 *
 * @param transactionDetails - The transaction details object or null if not present.
 * @param error - A string describing any error that occurred while fetching or processing transaction details.
 * @param isProcessing - A boolean indicating whether the transaction details are currently being processed.
 * @param setError - A function to update the error state.
 */
export interface UseTransactionDetails {
  transactionDetails: DecodedToken | null;
  error: string;
  isProcessing: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
