import { useEffect, useState } from 'react';
import Main from '../contracts/main';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';
import { useTonConnect } from './useTonConnect';

export function useMainContract() {
	const address = import.meta.env.VITE_MAIN_CONTRACT;
	if (!address) throw new Error("Main address is not set in .env file");

	const client = useTonClient();
	const { sender } = useTonConnect();

	const [info, setInfo] = useState<null | {
		address: Address,
		owner: Address,
		balance: BigInt,
		trustedAddresses: Address[]
	}>();


	const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

	const mainContract = useAsyncInitialize(async () => {
		if (!client) return;
		const contract = new Main(
			Address.parse(address)
		);
		return client.open(contract) as OpenedContract<Main>;
	}, [client]);

	useEffect(() => {
		async function getValue() {
			if (!mainContract) return;
			const address = mainContract.address;
			const owner = await mainContract.getOwner();
			const balance = await mainContract.getBalance();
			const trustedAddresses = await mainContract.getTrustedAddresses();
			setInfo({ address, owner, balance, trustedAddresses });

			await sleep(5000); // sleep 5 seconds and poll value again
			getValue();
		}
		getValue();
	}, [mainContract]);

	const send = {
		sendChangeOnwer: (addr: Address) => {
			return mainContract?.sendChangeOwner(sender, addr);
		},
		sendAddTrustedAddr: (addr: Address) => {
			return mainContract?.sendAddTrustedAddr(sender, addr);
		},
		sendRemoveTrustedAddr: (addr: Address) => {
			return mainContract?.sendRemoveTrustedAddr(sender, addr);
		},
	};

	return { info, send };
}
