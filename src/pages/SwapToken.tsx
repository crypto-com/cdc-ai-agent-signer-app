import { useState } from 'react';
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
  StyledStepTitle, // Assuming we have a style for step titles
} from './styles';
import { useTransactionDetails } from '../hooks/useTransactionDetails';
import { Alert } from '../components/Alert';
import { useSwapToken } from '../hooks/useSwapToken';
import { SwapTokenDetails } from '../components/SwapTokenDetails';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />;

/**
 * Component to handle approval and swap transactions for Wrapped zkCRO -> VUSD.
 *
 * This component walks through two steps:
 * 1. Approval of the router to spend Wrapped zkCRO.
 * 2. Swapping Wrapped zkCRO for VUSD.
 *
 * Each step is displayed sequentially, and once the approval step is complete, the swap button becomes enabled.
 *
 * @component
 * @returns {JSX.Element} The UI component for handling the approval and swap of Wrapped zkCRO tokens.
 */
export default function SwapWrappedZkCRO() {
  const { transactionDetails, error, setError, isProcessing } = useTransactionDetails();
  const {
    approveRouter,
    swapTokens,
    error: contractError,
    isApproving,
    isSwapping,
    isApproved,
    txHash,
  } = useSwapToken();

  /**
   * Handles the approval transaction to allow the router to spend Wrapped zkCRO tokens.
   *
   * @async
   * @function handleApprove
   * @returns {Promise<void>} Updates the component state based on approval success.
   */
  const handleApprove = async (): Promise<void> => {
    if (!transactionDetails) {
      setError('Transaction details are missing or invalid.');
      return;
    }

    const approvalSuccess = await approveRouter(transactionDetails);
    if (approvalSuccess) {
      console.log('Approval successful.');
    }
  };

  /**
   * Handles the swap transaction to swap Wrapped zkCRO tokens for VUSD.
   *
   * @async
   * @function handleSwap
   * @returns {Promise<void>} Initiates the swap transaction and handles any errors.
   */
  const handleSwap = async (): Promise<void> => {
    if (!transactionDetails) {
      setError('Transaction details are missing or invalid.');
      return;
    }
    await swapTokens(transactionDetails, '0');
  };

  return (
    <StyledContainer>
      <StyledCenteredDiv>
        <StyledLogo src={logo} alt="Logo" />
        <StyledTitle>Swap Token</StyledTitle>
        {error && (
          <StyledErrorText>
            <strong>Error:</strong> {error}
          </StyledErrorText>
        )}
        {contractError && (
          <StyledErrorText>
            <strong>Error:</strong> {contractError}
          </StyledErrorText>
        )}
        {isProcessing && !error && <p>Loading transaction details...</p>}
        {transactionDetails && !isProcessing && !error && (
          <>
            <SwapTokenDetails transactionDetails={transactionDetails} />
            {!isApproved && (
              <>
                <StyledStepTitle>Step 1: Approve Router</StyledStepTitle>
                <StyledButtonContainer>
                  <Button onClick={handleApprove} disabled={isApproving}>
                    <StyledButtonLabel>
                      {isApproving && <Spin indicator={antIcon} />}
                      {isApproving ? 'Approving...' : 'Approve'}
                    </StyledButtonLabel>
                  </Button>
                </StyledButtonContainer>
              </>
            )}
            {isApproved && !txHash && (
              <>
                <StyledStepTitle>Step 2: Swap Token</StyledStepTitle>
                <StyledButtonContainer>
                  <Button onClick={handleSwap} disabled={isSwapping}>
                    <StyledButtonLabel>
                      {isSwapping && <Spin indicator={antIcon} />}
                      {isSwapping ? 'Swapping...' : 'Swap'}
                    </StyledButtonLabel>
                  </Button>
                </StyledButtonContainer>
              </>
            )}
            {txHash && <Alert txHash={txHash} />}
          </>
        )}
      </StyledCenteredDiv>
    </StyledContainer>
  );
}
