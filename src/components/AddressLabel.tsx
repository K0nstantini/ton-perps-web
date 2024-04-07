import { Typography } from "@mui/material";
import { Address } from "@ton/core";
import { NotAvailable } from "./NotAvailableLabel";

type Props = {
	addr: Address | null | undefined
}

export function AddressLabel({ addr }: Props) {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: 5
		}}>
			<Typography variant="h6">Address:</Typography>
			{addr ? <Typography>{addr.toString()} </Typography> : <NotAvailable />}
		</div>

	);
};
