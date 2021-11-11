import Head from 'next/head';
// import Link from 'next/link';

export default function Layout({ title, description, children }) {
  return (
    <div className="box-border mx-auto w-2/3 py-12 px-6">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full p-6 mx-auto my-3 text-center rounded-3xl bg-blue-300">
        <h1 className="text-4xl text-left">{title}</h1>
        <p className="italic text-lg pt-2 text-left">{description}</p>
      </header>
      <main className="w-full p-6 mx-auto my-3 bg-yellow-600 rounded-3xl text-xl">{children}</main>
    </div>
  );
}
