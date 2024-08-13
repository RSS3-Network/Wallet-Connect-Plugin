import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, sepolia } from 'wagmi/chains';
import type { AppProps } from 'next/app';

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";
const SEPOLIA_RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "";

const { connectors } = getDefaultWallets({
  appName: "OpenAgent Widget",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
});

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors,
  ssr: true,
  transports: {
    [mainnet.id]: http(MAINNET_RPC_URL, { batch: true }),
    [sepolia.id]: http(SEPOLIA_RPC_URL, { batch: true }),
  },
  syncConnectedChain: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;