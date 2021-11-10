import Link from 'next/link';
import Layout from 'components/Layout';

import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';

export default function Show({ show }) {
  return (
    <Layout>
      <h1>{show.title}</h1>

      <p>
        <Link href="/">
          <a>&lt; Back to home</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { showSlug } = params;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query ShowBySlug($slug: String!) {
        generalSettings {
          title
        }
        showBy(slug: $slug) {
          id
          title
          slug
        }
      }
    `,
    variables: {
      slug: showSlug,
    },
  });

  const show = data?.data.showBy;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      show,
      site,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        shows(first: 10000) {
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

  const shows = data?.data.shows.edges.map(({ node }) => node);

  return {
    paths: shows.map(({ slug }) => {
      return {
        params: {
          showSlug: slug,
        },
      };
    }),
    fallback: false,
  };
}
