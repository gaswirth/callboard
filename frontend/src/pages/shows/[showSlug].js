import Link from 'next/link';
import Layout from 'components/Layout';

import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';

export default function Show({ site, show, users }) {
  const { title, description } = site;

  return (
    <Layout title={title} description={description}>
      <h2>{show.title}</h2>

      <ul>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return <li>{user.name}</li>;
          })}
      </ul>

      <Link href="/">
        <a>&lt; Back to home</a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { showSlug } = params;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query ShowBySlug($slug: String!) {
        users(where: { role: CAST_MEMBER }) {
          nodes {
            email
            name
            userId
          }
        }
        showBy(slug: $slug) {
          showId
          title
          slug
          showData {
            showDatetime
          }
        }
        generalSettings {
          title
          description
        }
      }
    `,
    variables: {
      slug: showSlug,
    },
  });

  const show = data?.data.showBy;

  const users = data?.data.users;

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
