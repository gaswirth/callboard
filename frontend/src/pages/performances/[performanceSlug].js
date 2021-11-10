import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../../styles/Home.module.css';

export default function Performance({ performance, site }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{performance.title}</title>
        <meta name="description" content={`Read more about ${performance.title} on ${site.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{performance.title}</h1>

        <div className={styles.grid}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: performance.content,
            }}
          />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>&lt; Back to home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { performanceSlug } = params;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PerformanceBySlug($slug: String!) {
        generalSettings {
          title
        }
        performanceBy(slug: $slug) {
          id
          content
          title
          slug
        }
      }
    `,
    variables: {
      slug: performanceSlug,
    },
  });

  const performance = data?.data.performanceBy;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      performance,
      site,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        performances(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const performances = data?.data.performances.edges.map(({ node }) => node);

  return {
    paths: performances.map(({ slug }) => {
      return {
        params: {
          performanceSlug: slug,
        },
      };
    }),
    fallback: false,
  };
}
