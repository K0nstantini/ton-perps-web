import { Button } from "@mui/material";
import { Address } from "@ton/core";
import { ModalAddress } from "./ModalAddress";
import { useState } from "react";

type Props = {
	sendAction: (addr: Address) => void,
	enabled: boolean
}

export function AddTrustedAddrBtn({ sendAction, enabled }: Props) {
	const [openModal, setOpenModal] = useState(false);

	const onClick = (addr: Address) => {
		setOpenModal(false);
		sendAction(addr);
	};

	return (
		<div>
			<Button
				sx={{ color: 'seagreen' }}
				disabled={!enabled}
				size="small"
				onClick={() => setOpenModal(true)}>
				add
			</Button>
			<ModalAddress
				open={openModal}
				handleClose={() => setOpenModal(false)}
				onClick={onClick}
			/>
		</div>

	);
};
