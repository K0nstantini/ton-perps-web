import { IconButton } from "@mui/material";
import { Address } from "@ton/core";
import { ModalAddress } from "./ModalAddress";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

type Props = {
	sendAction: (addr: Address) => void,
	enabled: boolean
}

export function ChangeOwnerBtn({ sendAction, enabled }: Props) {
	const [openModal, setOpenModal] = useState(false);

	const onClick = (addr: Address) => {
		setOpenModal(false);
		sendAction(addr);
	};

	return (
		<div>
			<IconButton
				disabled={!enabled}
				onClick={() => setOpenModal(true)}
			>
				<EditOutlinedIcon />
			</IconButton>
			<ModalAddress
				open={openModal}
				handleClose={() => setOpenModal(false)}
				onClick={onClick}
			/>
		</div>

	);
}
