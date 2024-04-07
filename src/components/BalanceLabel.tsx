import { Typography } from "@mui/material";
import { NotAvailable } from "./NotAvailableLabel";

type Props = {
	balance: BigInt | null | undefined
}

export function BalanceLabel({ balance }: Props) {
	const nBalance = balance && Number(balance);
	const balanceColor = nBalance
		? (nBalance > 0 ? 'green' : (nBalance < 0 ? 'red' : 'gray'))
		: 'gray';

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: 5
		}}>
			<Typography variant="h6">Balance:</Typography>
			{nBalance
				? <Typography color={balanceColor}>{(nBalance / 1_000_000_000).toString() + ' TON'} </Typography>
				: <NotAvailable />}
		</div>
	);
};
