import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';

export default function Layout({ title, children }) {
  const { user, userError, userIsLoading } = useUser();

  console.log(user);

  if (userIsLoading) return <div>Loading...</div>;
  if (userError) return <div>{userError.message}</div>;

  return (
    <div className="box-border mx-auto w-2/3 py-12 px-6">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full relative p-6 mx-auto my-3 rounded-3xl bg-blue-300">
        <h1 className="text-4xl text-left">{title}</h1>
        <a className="px-3 py-1 absolute top-3 right-3 rounded-xl bg-pink-200" href={user ? '/api/auth/logout' : '/api/auth/login'}>
          {user ? 'Logout' : 'Login'}
        </a>
      </header>
      <main className="w-full p-6 mx-auto my-3 bg-yellow-600 rounded-3xl text-xl">{children}</main>
    </div>
  );
}
