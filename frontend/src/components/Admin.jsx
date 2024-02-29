import { useContext } from 'react';
import { Box, Tabs, TabList, TabPanels, TabPanel, TabIndicator, Tab, Text, Flex, Spacer } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { useCompanyName } from '@hooks/queries/use-company-name';
import Roster from '@views/Roster';
import History from '@views/History';
import Now from '@views/Now';
import ShowControl from '@views/ShowControl';
import Branding from '@components/Branding';
import Logout from '@components/Logout';

export default function Admin() {
	const { user } = useContext(AuthContext);
	const { error: backendError } = useCompanyName();

	return backendError ? (
		<Text fontSize="2xl" textAlign="center" my={2}>
			Could not initialize Callboard. Please ensure the database server is running and the Callboard plugin is active.
		</Text>
	) : (
		<>
			{user?.isAdmin ? (
				<Tabs isLazy>
					<Flex alignItems="center" bg="gray.300" py={2} gap={4} px={8}>
						<TabList gap={4} fontSize="xl">
							<Tab>Show</Tab>
							<Tab>Roster</Tab>
							<Tab>History</Tab>
						</TabList>
						<Spacer />
						<Branding />
						<Logout />
					</Flex>
					<TabPanels p={6} maxW="container.xl">
						<TabPanel>
							<ShowControl />
						</TabPanel>
						<TabPanel>
							<Box>
								<Roster />
							</Box>
						</TabPanel>
						<TabPanel>
							<Box my={6}>
								<History />
							</Box>
						</TabPanel>
					</TabPanels>
				</Tabs>
			) : (
				<Now />
			)}
		</>
	);
}
