import { useState } from 'react';
import {
	Container,
	Stack,
	Skeleton,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Box,
	Heading,
} from '@chakra-ui/react';
import { SlPrinter } from 'react-icons/sl';
import { useLatestShow } from '@hooks/queries/use-latest-show';
import { useSigninURL } from '@hooks/hooks';
import ShowTable from '@components/ShowTable';
import NewShow from '@components/NewShow';
import QRCode from '@components/QRCode';

export default function ShowControl() {
	const [{ loading: showLoading }, show] = useLatestShow();
	const [QROpen, setQROpen] = useState(false);
	const [actionsOpen, setExportOpen] = useState(false);

	const signinURL = useSigninURL(show?.slug);

	const handleQROpen = () => setQROpen(true);
	const handleQRClose = () => setQROpen(false);
	const handleExportOpen = () => setExportOpen(true);
	const handleExportClose = () => setExportOpen(false);

	const handlePrint = () => {
		alert('Le print, she goes!');
	};

	return (
		<Container maxW="container.sm">
			<Stack spacing={4}>
				{show ? (
					<>
						<Heading as="h6">Current Show</Heading>
						<Stack direction="row" justifyContent="space-between">
							<Button onClick={handleQROpen} colorScheme="teal">
								QR Code
							</Button>
							<Button onClick={handleExportOpen} colorScheme="teal">
								Export
							</Button>
						</Stack>

						{/* TODO Print! */}
						<Modal onClose={handleQRClose} isOpen={QROpen} isCentered>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader textAlign="center">Sign-In</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Text textAlign="center">{show.datetime}</Text>
									<QRCode string={signinURL} size={300} />
								</ModalBody>
								<ModalFooter>
									<Button colorScheme="teal" onClick={handlePrint} rightIcon={<SlPrinter />}>
										Print
									</Button>
									<Button colorScheme="teal" onClick={handleQRClose}>
										Close
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>

						{/* TODO Export! */}
						<Modal onClose={handleExportClose} isOpen={actionsOpen} isCentered>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader textAlign="center">Export</ModalHeader>
								<ModalBody>
									<Stack spacing={4}>
										<Button colorScheme="teal" onClick={() => alert('Google')}>
											Export Google Sheet
										</Button>
										<Button colorScheme="teal" onClick={() => alert('Excel')}>
											Export Excel
										</Button>
										<Button colorScheme="teal" onClick={() => alert('CSV')}>
											Export CSV
										</Button>
									</Stack>
								</ModalBody>
							</ModalContent>
						</Modal>
						{showLoading ? (
							<Skeleton>
								<Box />
							</Skeleton>
						) : (
							<ShowTable show={show} allowStatusChanges allowAddCompanyMember />
						)}
					</>
				) : null}
				<NewShow />
			</Stack>
		</Container>
	);
}
