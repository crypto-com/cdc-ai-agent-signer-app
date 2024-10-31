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
  from: string;
  to: string;
  amount: number;
  contractAddress: string;
  fromContractAddress: string;
  toContractAddress: string;
  currency: string;
  chain: ChainOptions;
  exp: number;
  action: Action[];
}

/**
 * Interface defining the structure of a single action within a transaction.
 * Each action represents a step in the transaction, such as deposit, approval, or token swapping.
 *
 * @interface Action
 *
 * @property {TransactionAction} action - The type of action (e.g., 'deposit', 'approve', 'swap').
 * @property {string} amount - The amount of currency associated with this specific action.
 */
export interface Action {
  action: TransactionAction;
  amount: string;
}

/**
 * Enum representing the various types of transaction actions that can be performed.
 * Each action is part of a transaction flow, such as depositing tokens, approving a spender, or swapping tokens.
 *
 * @enum {string}
 * @property {string} Deposit - Represents the deposit action.
 * @property {string} Approve - Represents the approval action for allowing another contract to spend tokens.
 * @property {string} Swap - Represents the token swap action, typically from one token to another.
 */
export enum TransactionAction {
  Deposit = 'deposit',
  Approve = 'approve',
  Swap = 'swap',
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
  explorerUrl: string;
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

/**
 * Defines the return type of the `useSwapToken` hook, encapsulating the necessary
 * state and functions needed to manage token approval and swap transactions.
 *
 * @param approveRouter - A function to approve the router to spend Wrapped zkCRO tokens.
 * @param swapTokens - A function to swap tokens.
 * @param isApproving - A boolean indicating whether the approval transaction is being processed.
 * @param isApproved - A boolean indicating whether the router has been approved.
 * @param isSwapping - A boolean indicating whether the swap transaction is being processed.
 * @param error - A string describing any error that occurred during approval or swapping.
 * @param txHash - A string containing the transaction hash for a successful transaction, or null if not available.
 */
export interface UseSwapToken {
  approveRouter: (transactionDetails: DecodedToken) => Promise<boolean>;
  swapTokens: (transactionDetails: DecodedToken, amountOutMin: string) => Promise<void>;
  isApproving: boolean;
  isApproved: boolean;
  isSwapping: boolean;
  error: string | null;
  txHash: string | null;
}

/**
 * Defines the return type of the `useWrapToken` hook, encapsulating the necessary
 * state and functions needed to manage zkCRO to Wrapped zkCRO deposit transactions.
 *
 * @param signDeposit - A function to initiate the deposit of zkCRO to Wrapped zkCRO.
 * @param isSigning - A boolean indicating whether the deposit transaction is being processed.
 * @param error - A string describing any error that occurred during the deposit process.
 * @param txHash - A string containing the transaction hash for a successful deposit, or null if not available.
 */
export interface UseWrapToken {
  signDeposit: (transactionDetails: DecodedToken) => Promise<void>;
  isSigning: boolean;
  error: string | null;
  txHash: string | null;
}
