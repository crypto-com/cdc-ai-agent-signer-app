import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface TransactionDetailsProps {
  transactionDetails: DecodedToken;
}
export function TransactionDetails({ transactionDetails }: TransactionDetailsProps) {
  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Recipient Address:</StyledTextLabel> {transactionDetails.toAddress}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Amount:</StyledTextLabel> {transactionDetails.amount} {transactionDetails.currency}
      </StyledText>
    </StyledGrid>
  );
}
