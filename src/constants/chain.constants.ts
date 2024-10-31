// Obtained from https://chainid.network/chains.json
export const CHAINS = [
  {
    name: 'Cronos Mainnet',
    chain: 'CRO',
    rpc: [
      'https://evm.cronos.org',
      'https://cronos-evm-rpc.publicnode.com',
      'wss://cronos-evm-rpc.publicnode.com',
      'https://cronos.drpc.org',
      'wss://cronos.drpc.org',
    ],
    features: [
      {
        name: 'EIP1559',
      },
    ],
    faucets: [],
    nativeCurrency: {
      name: 'Cronos',
      symbol: 'CRO',
      decimals: 18,
    },
    infoURL: 'https://cronos.org/',
    shortName: 'cro',
    chainId: 25,
    networkId: 25,
    explorers: [
      {
        name: 'Cronos Explorer',
        url: 'https://explorer.cronos.org',
        standard: 'none',
      },
    ],
  },
  {
    name: 'Cronos Testnet',
    chain: 'CRO',
    rpc: ['https://evm-t3.cronos.org', 'https://cronos-testnet.drpc.org', 'wss://cronos-testnet.drpc.org'],
    faucets: ['https://cronos.org/faucet'],
    nativeCurrency: {
      name: 'Cronos Test Coin',
      symbol: 'TCRO',
      decimals: 18,
    },
    infoURL: 'https://cronos.org',
    shortName: 'tcro',
    chainId: 338,
    networkId: 338,
    slip44: 1,
    explorers: [
      {
        name: 'Cronos Testnet Explorer',
        url: 'https://explorer.cronos.org/testnet',
        standard: 'none',
      },
    ],
  },
  {
    name: 'Cronos zkEVM Mainnet',
    chain: 'CronosZkEVMMainnet',
    rpc: ['https://mainnet.zkevm.cronos.org'],
    faucets: [],
    nativeCurrency: {
      name: 'Cronos zkEVM CRO',
      symbol: 'zkCRO',
      decimals: 18,
    },
    infoURL: 'https://cronos.org/zkevm',
    shortName: 'zkCRO',
    chainId: 388,
    networkId: 388,
    explorers: [
      {
        name: 'Cronos zkEVM (Mainnet) Chain Explorer',
        url: 'https://explorer.zkevm.cronos.org',
        standard: 'none',
      },
    ],
  },
  {
    name: 'Cronos zkEVM Testnet',
    chain: 'CronosZkEVMTestnet',
    rpc: ['https://testnet.zkevm.cronos.org'],
    faucets: ['https://zkevm.cronos.org/faucet'],
    nativeCurrency: {
      name: 'Cronos zkEVM Test Coin',
      symbol: 'zkTCRO',
      decimals: 18,
    },
    infoURL: 'https://docs-zkevm.cronos.org',
    shortName: 'zkTCRO',
    chainId: 240,
    networkId: 240,
    slip44: 1,
    explorers: [
      {
        name: 'Cronos zkEVM Testnet Explorer',
        url: 'https://explorer.zkevm.cronos.org/testnet',
        standard: 'none',
      },
    ],
  },
];
