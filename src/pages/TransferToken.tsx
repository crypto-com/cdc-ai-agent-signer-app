import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
import Button from '../components/Button';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  StyledButtonContainer,
  StyledButtonLabel,
  StyledCenteredDiv,
  StyledContainer,
  StyledErrorText,
  StyledLogo,
  StyledTitle,
} from './styles';
import { TransactionDetails } from '../components/TransactionDetails';
import { switchToCustomNetwork } from '../utils/switchNetworks';
import { useTransactionDetails } from '../hooks/useTransactionDetails';
import { Alert } from '../components/Alert';
import { erc20Abi } from '../constants/abi.constants';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />;

/**
 * Component to handle Ethereum transactions via MetaMask.
 *
 * This component allows users to sign a transaction by:
 * 1. Checking for MetaMask installation.
 * 2. Switching to a specific network if needed.
 * 3. Executing the transaction and handling its result.
 *
 * @component
 * @returns {JSX.Element} The UI component rendering transaction details, error handling, and action buttons.
 */
export default function TransferToken() {
  const { transactionDetails, error, setError, isProcessing } = useTransactionDetails();
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  useEffect(() => {
    console.log(transactionDetails);
  }, [transactionDetails]);
  /**
   * Initiates the transaction signing process.
   *
   * This function performs the following:
   * 1. Checks if MetaMask is installed.
   * 2. Switches to the correct network based on the transaction details.
   * 3. Sends a transaction using ethers.js and waits for it to be mined.
   *
   * @async
   * @function signTransaction
   * @returns {Promise<void>} Updates the state of the component based on the result of the transaction.
   */
  const signTransaction = async (): Promise<void> => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to proceed.');
      return;
    }

    if (!transactionDetails) {
      setError('Transaction details are missing or invalid.');
      return;
    }

    setIsSigning(true);
    setError('');

    try {
      await switchToCustomNetwork(transactionDetails, window.ethereum);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log(`Connected account: ${address}`);

      if (transactionDetails.contractAddress) {
        const contract = new ethers.Contract(transactionDetails.contractAddress, erc20Abi, signer);
        const txResponse = await contract.transfer(
          transactionDetails.to,
          ethers.parseUnits(transactionDetails.amount.toString(), 18)
        );
        setTxHash(txResponse.hash);
        await txResponse.wait();
      } else {
        const transaction = {
          to: transactionDetails.to,
          value: ethers.parseEther(transactionDetails.amount.toString()),
        };

        const txResponse = await signer.sendTransaction(transaction);
        setTxHash(txResponse.hash);
        await txResponse.wait();
      }
    } catch (e) {
      const error = e as Error;
      console.error('Transaction failed:', e);
      setError(`Transaction failed: ${error.message}`);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <StyledContainer>
      <StyledCenteredDiv>
        <StyledLogo src={logo} alt="Logo" />
        <StyledTitle>Sign Transaction</StyledTitle>
        {error && (
          <StyledErrorText>
            <strong>Error:</strong> {error}
          </StyledErrorText>
        )}
        {isProcessing && !error && <p>Loading transaction details...</p>}
        {transactionDetails && !isProcessing && !error && (
          <>
            <TransactionDetails transactionDetails={transactionDetails} />
            {txHash && <Alert txHash={txHash} />}
            {!txHash && (
              <StyledButtonContainer>
                <Button onClick={signTransaction} disabled={isSigning}>
                  <StyledButtonLabel>
                    {isSigning && <Spin indicator={antIcon} />}
                    Sign Transaction
                  </StyledButtonLabel>
                </Button>
              </StyledButtonContainer>
            )}
          </>
        )}
      </StyledCenteredDiv>
    </StyledContainer>
  );
}
