import Link from 'next/link';

import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';

import Layout from 'components/Layout';

export default function Home({ page, shows }) {
  const { title } = page;

  return (
    <Layout title={title}>
      <div className="flex content-center">
        <ul>
          {shows &&
            shows.length > 0 &&
            shows.map((show) => {
              return (
                <li key={show.id}>
                  <p>
                    <Link href={`/shows/${show.slug}`}>{show.title}</Link>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        shows {
          nodes {
            id
            title
            slug
          }
        }
        generalSettings {
          title
        }
      }
    `,
  });

  const shows = data?.data.shows.nodes.map((show) => {
    return {
      ...show,
      path: `/shows/${show.slug}`,
    };
  });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      shows,
    },
  };
}
