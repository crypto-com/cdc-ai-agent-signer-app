import { wrappedZkcroAddress } from '../../constants/global.constants';
import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface WrapTokenDetailsProps {
  transactionDetails: DecodedToken;
}
export function WrapTokenDetails({ transactionDetails }: WrapTokenDetailsProps) {
  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Wrapping zkCRO To:</StyledTextLabel> {wrappedZkcroAddress} (Wrapped zkCRO Contract)
      </StyledText>
      <StyledText>
        <StyledTextLabel>Amount:</StyledTextLabel> {transactionDetails.action[0].amount} zkCRO
      </StyledText>
    </StyledGrid>
  );
}
