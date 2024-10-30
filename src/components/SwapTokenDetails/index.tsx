import { ROUTER_MAPPING } from '../../constants/global.constants';
import { useERC20Token } from '../../hooks/useERC20Token';
import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface SwapTokenDetailsProps {
  transactionDetails: DecodedToken;
}
export function SwapTokenDetails({ transactionDetails }: SwapTokenDetailsProps) {
  const fromTokenInfo = useERC20Token(transactionDetails.chain, transactionDetails.fromContractAddress);
  const toTokenInfo = useERC20Token(transactionDetails.chain, transactionDetails.toContractAddress);

  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Swapping From:</StyledTextLabel> {transactionDetails.fromContractAddress} (
        {fromTokenInfo.symbol})
      </StyledText>
      <StyledText>
        <StyledTextLabel>Swapping To:</StyledTextLabel> {transactionDetails.toContractAddress} ({toTokenInfo.symbol})
      </StyledText>
      <StyledText>
        <StyledTextLabel>Router Contract:</StyledTextLabel> {ROUTER_MAPPING[transactionDetails.chain.id]}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Swap Amount:</StyledTextLabel> {transactionDetails.action[0].amount} {fromTokenInfo.symbol}
      </StyledText>
    </StyledGrid>
  );
}
