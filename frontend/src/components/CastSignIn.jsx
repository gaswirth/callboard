import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { useCurrentShowSlug } from '@hooks/queries/use-current-show-slug';
import Now from '@views/Now';

export default function CastSignIn() {
	const { slug } = useParams();
	const currentShowSlug = useCurrentShowSlug();

	if (!currentShowSlug) return null;

	return currentShowSlug === slug ? (
		<Container p={3} maxWidth="xl">
			<Now signUsersIn={true} />
		</Container>
	) : (
		<div>Invalid show</div>
	);
}
