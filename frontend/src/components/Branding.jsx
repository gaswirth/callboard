import React, { useContext } from 'react';
import { Heading } from '@chakra-ui/react';
import { generateCompanyShortName, getWordCount } from '@lib/functions';
import { AuthContext } from '@context/AuthContext';
import { useCompanyName } from '@hooks/queries/use-company-name';

export default function Branding() {
	const { user } = useContext(AuthContext);
	const { data: companyData } = useCompanyName();

	const companyShortName = () => {
		if (companyData) {
			const {
				callboardSettings: { callboardCompanyName },
			} = companyData;
			return getWordCount(callboardCompanyName) > 2
				? generateCompanyShortName(callboardCompanyName)
				: callboardCompanyName;
		}

		return '';
	};

	return (
		<Heading as="h1" textTransform="uppercase" fontSize="2xl" mr={2}>
			{companyShortName()}
		</Heading>
	);
}
