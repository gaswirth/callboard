import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';

import Layout from 'components/Layout';

import { getApolloClient } from 'lib/apollo-client';

export default function Home({ page, shows }) {
  const { title, description } = page;
  console.log(shows);
  return (
    <div className="box-border mx-auto w-2/3 py-12 px-6">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title={title} description={description}>
        <div className="flex content-center">
          <ul>
            {shows &&
              shows.length > 0 &&
              shows.map((show) => {
                return (
                  <li key={show.id}>
                    <p>{`${show.id}: ${show.title}`}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </Layout>
    </div>
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
        description
      }
    }`,
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
