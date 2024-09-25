import { MetaMaskInpageProvider } from '@metamask/providers';
import { MetamaskError } from '../types/error.interfaces';
import { DecodedToken } from '../types/global.interfaces';

/**
 * Switches the MetaMask network to the one required for the transaction. If the network
 * is not available in the user's MetaMask, it attempts to add it.
 *
 * @param {DecodedToken} transactionDetails - The transaction details including network information.
 * @param {MetaMaskInpageProvider} ethereum - The MetaMask provider object.
 * @throws Will throw an error if the network cannot be switched or added.
 */
export const switchToCustomNetwork = async (transactionDetails: DecodedToken, ethereum?: MetaMaskInpageProvider) => {
  const chainIdHex = `0x${transactionDetails.chain.id.toString(16)}`;
  try {
    await ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (e) {
    const error = e as MetamaskError;
    if (error.code === 4902) {
      try {
        await ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdHex,
              chainName: transactionDetails.chain.name,
              nativeCurrency: {
                name: transactionDetails.currency,
                symbol: transactionDetails.currency,
                decimals: 18,
              },
              rpcUrls: [transactionDetails.chain.rpc],
            },
          ],
        });
      } catch (addError) {
        throw new Error('Failed to add custom network');
      }
    } else {
      throw new Error('Failed to switch to custom network');
    }
  }
};
