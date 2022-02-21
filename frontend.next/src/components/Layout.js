import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';

export default function Layout({ title, children }) {
  const { user, userError, userIsLoading } = useUser();

  if (userIsLoading) return <div>Loading...</div>;
  if (userError) return <div>{userError.message}</div>;

  return (
    <div className="box-border mx-auto w-2/3 py-12 px-6">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full relative p-6 mx-auto my-3 flex justify-between align-center rounded-3xl bg-blue-300">
        <h1 className="text-4xl text-left">{title}</h1>
        <div className="flex align-center">
          <a
            className="font-bold px-4 py-2 bg-pink-200 rounded-xl uppercase text-gray-700 duration-100 transition-all hover:text-gray-900 hover:bg-pink-300"
            href={user ? '/api/auth/logout' : '/api/auth/login'}
          >
            {user ? 'Logout' : 'Login'}
          </a>
        </div>
      </header>
      <main className="w-full p-6 mx-auto my-3 bg-yellow-400 rounded-3xl text-xl">{children}</main>
    </div>
  );
}
