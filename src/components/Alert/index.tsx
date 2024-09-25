import { StyledAlert } from './styles';

interface TransactionDetailsProps {
  txHash: string;
}

export function Alert({ txHash }: TransactionDetailsProps) {
  return (
    <StyledAlert
      message={'Transaction Successful'}
      description={
        <div>
          <p>
            <strong>Transaction Hash:</strong> {txHash}
          </p>
          <a href={`https://explorer.zkevm.cronos.org/testnet/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View on Explorer
          </a>
        </div>
      }
      type="info"
    />
  );
}
