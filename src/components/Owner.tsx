import { Address } from "@ton/core";
import { ChangeOwnerBtn } from "./ChangeOwnerBtn";
import { Typography } from "@mui/material";
import { NotAvailable } from "./NotAvailableLabel";

type Props = {
	addr: Address | null | undefined,
	enabled: boolean
	changeOwner: (addr: Address) => void,
}

export function Owner({ addr, changeOwner, enabled }: Props) {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			gap: 17,
		}}>
			<Typography variant="h6"> Owner:</Typography>
			{
				addr ?
					<div style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10
					}}>
						<Typography>{addr.toString()}</Typography>
						<ChangeOwnerBtn
							sendAction={changeOwner}
							enabled={enabled} />
					</div >
					: <NotAvailable />
			}
		</div >
	);
};
