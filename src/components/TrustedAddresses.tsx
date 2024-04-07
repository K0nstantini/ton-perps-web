import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Address } from "@ton/core";
import { AddTrustedAddrBtn } from "./AddTrustedAddrBtn";
import { RemoveTrustedAddrBtn } from "./RemoveTrustedAddrBtn";
import { NotAvailable } from "./NotAvailableLabel";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
	addresses: Address[] | null | undefined,
	enabled: boolean
	addAddr: (addr: Address) => void,
	removeAddr: (addr: Address) => void,
}

export function TrustedAddresses({ addresses, enabled, addAddr, removeAddr }: Props) {
	const hasAddresses = addresses ? addresses.length > 0 : false;

	return (
		<div style={{ paddingTop: 20 }}>
			<Accordion defaultExpanded>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel-content"
					id="addresses"
				>
					<Typography variant="h6">Trusted addresses</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{addresses ?
						<List>
							{addresses?.map((item, idx) => (
								< ListItem disablePadding key={idx}>
									<ListItemText primary={item.toString()} />
								</ListItem>
							))}
						</List>
						: <NotAvailable />
					}
				</AccordionDetails>
				<AccordionActions>
					<AddTrustedAddrBtn
						sendAction={addAddr}
						enabled={enabled} />
					<RemoveTrustedAddrBtn
						sendAction={removeAddr}
						enabled={enabled && hasAddresses} />
				</AccordionActions>
			</Accordion>
		</div >

	);
};
