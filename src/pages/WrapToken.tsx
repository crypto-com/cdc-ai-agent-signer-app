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
import { useTransactionDetails } from '../hooks/useTransactionDetails';
import { Alert } from '../components/Alert';
import { useWrapToken } from '../hooks/useWrapToken';
import { WrapTokenDetails } from '../components/WrapTokenDetails';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />;

/**
 * Component to handle zkCRO -> Wrapped zkCRO deposit (wrapping token process).
 * This component performs the token deposit to wrap zkCRO tokens into Wrapped zkCRO.
 *
 * Steps:
 * - Display transaction details.
 * - Enable deposit action via MetaMask.
 * - Show the transaction status and hash upon completion.
 *
 * @component
 * @returns {JSX.Element} The UI component for handling token wrapping (deposit) transactions.
 */
export default function WrapToken() {
  const { transactionDetails, error, setError, isProcessing } = useTransactionDetails();
  const { signDeposit, error: contractError, isSigning, txHash } = useWrapToken();

  /**
   * Handles the deposit process, allowing zkCRO to be wrapped as Wrapped zkCRO.
   * It validates that the transaction details are present and calls the contract to execute the deposit.
   *
   * @async
   * @function handleDeposit
   * @returns {Promise<void>} Initiates the deposit process and manages errors.
   */
  const handleDeposit = async (): Promise<void> => {
    if (!transactionDetails) {
      setError('Transaction details are missing or invalid.');
      return;
    }

    await signDeposit(transactionDetails);
  };

  return (
    <StyledContainer>
      <StyledCenteredDiv>
        <StyledLogo src={logo} alt="Logo" />
        <StyledTitle>Wrap Token</StyledTitle>
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
            <WrapTokenDetails transactionDetails={transactionDetails} />
            {txHash && <Alert txHash={txHash} />}
            {!txHash && (
              <StyledButtonContainer>
                <Button onClick={handleDeposit} disabled={isSigning}>
                  <StyledButtonLabel>
                    {isSigning && <Spin indicator={antIcon} />}
                    {isSigning ? 'Depositing...' : 'Deposit'}
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
