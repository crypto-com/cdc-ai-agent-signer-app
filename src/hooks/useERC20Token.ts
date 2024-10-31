import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { erc20Abi } from '../constants/abi.constants';
import { ChainOptions } from '../types/global.interfaces';

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  address: string;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching ERC20 token information.
 * @param chain - The blockchain network to use
 * @param tokenAddress - The address of the ERC20 token contract
 * @returns Token information including name, symbol, decimals, and total supply
 */
export const useERC20Token = (chain: ChainOptions, tokenAddress: string): TokenInfo => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    name: '',
    symbol: '',
    decimals: 18,
    totalSupply: '0',
    address: tokenAddress,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!tokenAddress) {
        setTokenInfo((prev) => ({
          ...prev,
          loading: false,
          error: 'Invalid token address or chain configuration',
        }));
        return;
      }

      try {
        const provider = new ethers.JsonRpcProvider(chain.rpc, {
          chainId: chain.id,
          name: chain.name,
        });

        const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

        const [name, symbol, decimals, totalSupply] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.totalSupply(),
        ]);

        setTokenInfo({
          name,
          symbol,
          decimals,
          totalSupply: totalSupply.toString(),
          address: tokenAddress,
          loading: false,
          error: null,
        });
      } catch (error) {
        setTokenInfo((prev) => ({
          ...prev,
          loading: false,
          error: `Failed to fetch token info: ${(error as Error).message}`,
        }));
      }
    };

    fetchTokenInfo();
  }, [chain, tokenAddress]);

  return tokenInfo;
};
