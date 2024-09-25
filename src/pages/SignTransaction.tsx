import { useState } from 'react';
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

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />;

/**
 * Component to handle Ethereum transactions via MetaMask.
 * Allows users to sign a transaction by connecting to MetaMask,
 * switching networks if necessary, and then executing a transaction.
 *
 * @returns {JSX.Element} The UI component with transaction details and actions.
 */
export default function SignTransaction() {
  const { transactionDetails, error, setError, isProcessing } = useTransactionDetails();
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  /**
   * Initiates the transaction signing process by checking for MetaMask,
   * setting the network, and sending the transaction.
   * Updates the component state based on the outcome of these operations.
   */
  const signTransaction = async () => {
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

      const transaction = {
        to: transactionDetails.toAddress,
        value: ethers.parseEther(transactionDetails.amount.toString()),
        currency: transactionDetails.currency,
      };

      const txResponse = await signer.sendTransaction(transaction);
      setTxHash(txResponse.hash);
      await txResponse.wait();
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
