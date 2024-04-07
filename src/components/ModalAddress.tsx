import { Box, Button, Modal, TextField } from "@mui/material";
import { Address } from "@ton/core";
import { useEffect, useState } from "react";

type Props = {
	open: boolean,
	handleClose: () => void,
	onClick: (addr: Address) => void
}

export function ModalAddress({ open, handleClose, onClick }: Props) {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 700,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const [value, setValue] = useState('');
	const [addr, setAddr] = useState<Address | null>();
	const [error, setError] = useState(false);

	useEffect(() => {
		try {
			setAddr(Address.parse(value));
		} catch {
			setAddr(null);
		}
	}, [value]);

	useEffect(() => {
		setError(addr ? false : value.length > 0);
	}, [addr, value]);

	useEffect(() => {
		if (!open) {
			setValue('');
		}
	}, [open]);

	const sendAddr = () => {
		if (addr) {
			onClick(addr);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose} >

			<Box sx={style}>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
					gap: 5
				}}>
					<TextField
						label={error ? 'Invalid address' : 'Address'}
						error={error}
						variant="outlined"
						fullWidth={true}
						onChange={event => setValue(event.target.value)} />

					<Button
						variant="contained"
						disabled={error}
						onClick={sendAddr}>
						ok
					</Button>
				</div>
			</Box>
		</Modal>
	);
};
