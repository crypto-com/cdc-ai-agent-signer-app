import { useState } from 'react';
import { ethers } from 'ethers';
import { erc20Abi, routerAbi } from '../constants/abi.constants';
import { DecodedToken, UseSwapToken } from '../types/global.interfaces';
import { routerAddress, tokenAddress, wrappedZkcroAddress } from '../constants/global.constants';

/**
 * Custom hook for handling approval and swap transactions for Wrapped zkCRO to VUSD.
 *
 * @returns {Object} An object containing functions and state for handling token approval and swapping.
 */
export const useSwapToken = (): UseSwapToken => {
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  /**
   * Approves the router contract to spend Wrapped zkCRO tokens.
   *
   * @param {DecodedToken} transactionDetails - Decoded JWT token containing transaction details.
   * @returns {Promise<boolean>} A promise that resolves to true if the approval is successful.
   */
  const approveRouter = async (transactionDetails: DecodedToken): Promise<boolean> => {
    if (!window.ethereum || !transactionDetails) {
      setError('MetaMask is not installed or transaction details are missing.');
      return false;
    }

    setIsApproving(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const from = await signer.getAddress();
      const wrappedZkCROContract = new ethers.Contract(wrappedZkcroAddress, erc20Abi, signer);
      const amountInWei = ethers.parseEther(transactionDetails.action[0].amount.toString());
      const allowance = await wrappedZkCROContract.allowance(from, routerAddress);

      if (allowance < amountInWei) {
        const approveTx = await wrappedZkCROContract.approve(routerAddress, amountInWei, {
          gasLimit: 200000,
          gasPrice: ethers.parseUnits('5000', 'gwei'),
        });
        setTxHash(approveTx.hash);
        await approveTx.wait();
        setIsApproved(true);
        return true;
      } else {
        setIsApproved(true);
        return true;
      }
    } catch (e) {
      setError(`Transaction failed: ${(e as Error).message}`);
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  /**
   * Swaps Wrapped zkCRO for VUSD tokens using the router contract.
   *
   * @param {DecodedToken} transactionDetails - Decoded JWT token containing transaction details.
   * @param {string} amountOutMin - Minimum amount of tokens to receive from the swap.
   * @returns {Promise<void>} A promise that resolves once the swap transaction is complete.
   */
  const swapTokens = async (transactionDetails: DecodedToken, amountOutMin: string): Promise<void> => {
    if (!window.ethereum || !transactionDetails) {
      setError('MetaMask is not installed or transaction details are missing.');
      return;
    }

    setIsSwapping(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const from = await signer.getAddress();
      const routerContract = new ethers.Contract(routerAddress, routerAbi, signer);
      const amountInWei = ethers.parseEther(transactionDetails.action[0].amount.toString());
      const amountOutMinWei = ethers.parseEther(amountOutMin);

      const swapTx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        amountOutMinWei,
        [wrappedZkcroAddress, tokenAddress],
        from,
        {
          gasLimit: 1000000,
          gasPrice: ethers.parseUnits('5000', 'gwei'),
        }
      );

      setTxHash(swapTx.hash);
      await swapTx.wait();
    } catch (e) {
      setError(`Swap transaction failed: ${(e as Error).message}`);
    } finally {
      setIsSwapping(false);
    }
  };

  return {
    approveRouter,
    swapTokens,
    isApproving,
    isApproved,
    isSwapping,
    error,
    txHash,
  };
};
