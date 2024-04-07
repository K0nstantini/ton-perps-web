import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useMainContract } from './hooks/useMainContract';
import { useTonConnect } from './hooks/useTonConnect';
import { Header } from './components/Header';
import { AddressLabel } from './components/AddressLabel';
import { BalanceLabel } from './components/BalanceLabel';
import { Owner } from './components/Owner';
import { TrustedAddresses } from './components/TrustedAddresses';
import { Divider } from '@mui/material';

function App() {
	const { connected } = useTonConnect();
	const { info, send } = useMainContract();

	return (
		<div className="App">
			<Header />

			<div style={{
				textAlign: "left",
				paddingTop: 20,
			}}>
				<AddressLabel addr={info?.address} />
				<BalanceLabel balance={info?.balance} />
				<Owner
					addr={info?.owner}
					enabled={connected}
					changeOwner={send.sendChangeOnwer}
				/>
				<TrustedAddresses
					addresses={info?.trustedAddresses}
					enabled={connected}
					addAddr={send.sendAddTrustedAddr}
					removeAddr={send.sendRemoveTrustedAddr}
				/>
			</div>
			<div className="ConnectBtn">
				<TonConnectButton />
			</div>
		</div >
	);

}

export default App

