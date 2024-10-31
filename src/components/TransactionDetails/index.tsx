import { CHAINS } from '../../constants/chain.constants';
import { useERC20Token } from '../../hooks/useERC20Token';
import { StyledGrid, StyledText, StyledTextLabel } from '../../pages/styles';
import { DecodedToken } from '../../types/global.interfaces';

interface TransactionDetailsProps {
  transactionDetails: DecodedToken;
}
export function TransactionDetails({ transactionDetails }: TransactionDetailsProps) {
  const toTokenInfo = useERC20Token(transactionDetails.chain, transactionDetails.contractAddress);
  const nativeTokenSymbol = CHAINS.find((chain) => chain.chainId === transactionDetails.chain.id)?.nativeCurrency
    .symbol;

  return (
    <StyledGrid>
      <StyledText>
        <StyledTextLabel>Chain:</StyledTextLabel> {transactionDetails.chain.name}
      </StyledText>
      <StyledText>
        <StyledTextLabel>Recipient Address:</StyledTextLabel> {transactionDetails.to}
      </StyledText>
      {transactionDetails.contractAddress ? (
        <>
          <StyledText>
            <StyledTextLabel>Currency:</StyledTextLabel> {transactionDetails.contractAddress} {toTokenInfo.symbol}
          </StyledText>
          <StyledText>
            <StyledTextLabel>Transfer Amount:</StyledTextLabel> {transactionDetails.amount} {toTokenInfo.symbol}
          </StyledText>
        </>
      ) : (
        <>
          <StyledText>
            <StyledTextLabel>Currency:</StyledTextLabel> Native Token ({nativeTokenSymbol})
          </StyledText>
          <StyledText>
            <StyledTextLabel>Transfer Amount:</StyledTextLabel> {transactionDetails.amount} {nativeTokenSymbol}
          </StyledText>
        </>
      )}
    </StyledGrid>
  );
}
