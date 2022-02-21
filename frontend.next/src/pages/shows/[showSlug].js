import Layout from 'components/Layout';
import BackHome from 'components/BackHome';

import { showAttendedBy, decodeHtml } from 'lib/utils';

import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';

export default function Show({ site, show, castList }) {
  const { title } = site;

  const attendance = showAttendedBy(show.showData.attendance);

  return (
    <Layout title={title}>
      <h2 className="font-bold text-2xl">Performance: {show.showData.showDatetime}</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Signed In</th>
          </tr>
        </thead>
        <tbody>
          {castList &&
            castList.length > 0 &&
            castList.map((castMember) => {
              return (
                <tr key={castMember.castMemberId}>
                  <td>{castMember.title}</td>
                  <td>{attendance.includes(castMember.castMemberId) ? decodeHtml('&check;') : ''}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <BackHome />
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
        castMembers {
          nodes {
            castMemberData {
              email
              fieldGroupName
            }
            title
            castMemberId
          }
        }
        showBy(slug: $slug) {
          showData {
            showDatetime
            attendance {
              castMember {
                ... on CastMember {
                  castMemberId
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: showSlug,
    },
  });

  const show = data?.data.showBy;

  const castList = data?.data.castMembers.nodes;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      show,
      site,
      castList,
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
