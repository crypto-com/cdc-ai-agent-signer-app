import { useState } from 'react';
import { ethers } from 'ethers';
import { erc20Abi } from '../constants/abi.constants';
import { DecodedToken, UseWrapToken } from '../types/global.interfaces';
import { wrappedZkcroAddress } from '../constants/global.constants';

/**
 * Custom hook for handling zkCRO -> Wrapped zkCRO deposit transactions.
 *
 * @returns {Object} An object containing the function and state for handling zkCRO deposits.
 */
export const useWrapToken = (): UseWrapToken => {
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  /**
   * Initiates the deposit transaction for zkCRO -> Wrapped zkCRO.
   *
   * @param {DecodedToken} transactionDetails - Decoded JWT token containing transaction details.
   * @returns {Promise<void>} A promise that resolves once the deposit transaction is complete.
   */
  const signDeposit = async (transactionDetails: DecodedToken): Promise<void> => {
    if (!window.ethereum || !transactionDetails) {
      setError('MetaMask is not installed or transaction details are missing.');
      return;
    }

    setIsSigning(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = wrappedZkcroAddress;
      const amount = transactionDetails.action[0].amount.toString();
      const wrappedZkCROContract = new ethers.Contract(contractAddress, erc20Abi, signer);

      const txResponse = await wrappedZkCROContract.deposit({
        value: ethers.parseEther(amount),
        gasLimit: 200000,
      });

      setTxHash(txResponse.hash);
      await txResponse.wait();
    } catch (e) {
      setError(`Deposit transaction failed: ${(e as Error).message}`);
    } finally {
      setIsSigning(false);
    }
  };

  return {
    signDeposit,
    isSigning,
    error,
    txHash,
  };
};
