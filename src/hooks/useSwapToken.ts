import { ethers } from 'ethers';
import { useState } from 'react';
import { erc20Abi, routerAbi } from '../constants/abi.constants';
import { ROUTER_MAPPING } from '../constants/global.constants';
import { DecodedToken, UseSwapToken } from '../types/global.interfaces';

/**
 * Custom hook for handling approval and swap transactions.
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
      const wrappedZkCROContract = new ethers.Contract(transactionDetails.fromContractAddress, erc20Abi, signer);
      const amountInWei = ethers.parseEther(transactionDetails.action[0].amount.toString());
      const allowance = await wrappedZkCROContract.allowance(from, ROUTER_MAPPING[transactionDetails.chain.id]);

      if (allowance < amountInWei) {
        const approveTx = await wrappedZkCROContract.approve(ROUTER_MAPPING[transactionDetails.chain.id], amountInWei, {
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
   * Swaps `fromContractAddress` for `toContractAddress`.
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
      const routerContract = new ethers.Contract(ROUTER_MAPPING[transactionDetails.chain.id], routerAbi, signer);
      const amountInWei = ethers.parseEther(transactionDetails.action[0].amount.toString());
      const amountOutMinWei = ethers.parseEther(amountOutMin);

      const swapTx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        amountOutMinWei,
        [transactionDetails.fromContractAddress, transactionDetails.toContractAddress],
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
