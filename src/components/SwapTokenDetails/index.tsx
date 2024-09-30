import { routerAddress, tokenAddress, wrappedZkcroAddress } from '../../constants/global.constants';
import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface SwapTokenDetailsProps {
  transactionDetails: DecodedToken;
}
export function SwapTokenDetails({ transactionDetails }: SwapTokenDetailsProps) {
  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Swapping From:</StyledTextLabel> {wrappedZkcroAddress} (Wrapped zkCRO)
      </StyledText>
      <StyledText>
        <StyledTextLabel>Swapping To:</StyledTextLabel> {tokenAddress} (VUSD)
      </StyledText>
      <StyledText>
        <StyledTextLabel>Router Contract:</StyledTextLabel> {routerAddress}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Amount:</StyledTextLabel> {transactionDetails.action[0].amount} Wrapped zkCRO
      </StyledText>
    </StyledGrid>
  );
}
