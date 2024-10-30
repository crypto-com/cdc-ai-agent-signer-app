import { CHAINS } from '../../constants/chain.constants';
import { WRAPPED_ADDRESS_MAPPING } from '../../constants/global.constants';
import { useERC20Token } from '../../hooks/useERC20Token';
import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface WrapTokenDetailsProps {
  transactionDetails: DecodedToken;
}
export function WrapTokenDetails({ transactionDetails }: WrapTokenDetailsProps) {
  const toTokenInfo = useERC20Token(transactionDetails.chain, WRAPPED_ADDRESS_MAPPING[transactionDetails.chain.id]);
  const nativeTokenSymbol = CHAINS.find((chain) => chain.chainId === transactionDetails.chain.id)?.nativeCurrency
    .symbol;
  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Contract address:</StyledTextLabel> {toTokenInfo.address} {toTokenInfo.symbol}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Wrap Amount:</StyledTextLabel> {transactionDetails.action[0].amount} {nativeTokenSymbol}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Action:</StyledTextLabel> Wrap {transactionDetails.action[0].amount} {nativeTokenSymbol} to{' '}
        {toTokenInfo.symbol}
      </StyledText>
    </StyledGrid>
  );
}
