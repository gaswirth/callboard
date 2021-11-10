import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';

import Layout from 'components/Layout';

import { getApolloClient } from 'lib/apollo-client';

export default function Home({ page, performances }) {
  const { title, description } = page;
  console.log(performances);
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
            {performances &&
              performances.length > 0 &&
              performances.map((performance) => {
                return (
                  <li key={performance.id}>
                    <p>{`${performance.id}: ${performance.title}`}</p>
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
      performances {
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

  const performances = data?.data.performances.nodes.map((performance) => {
    return {
      ...performance,
      path: `/performances/${performance.slug}`,
    };
  });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      performances,
    },
  };
}
