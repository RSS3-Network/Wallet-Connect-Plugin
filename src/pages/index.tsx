import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

function WalletConnectButton() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      window.parent.postMessage({ type: 'WALLET_CONNECTED', address }, '*');
    }
  }, [isConnected, address]);

  return <ConnectButton />;
}

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <WalletConnectButton />
    </div>
  );
}