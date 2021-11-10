import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, description, children }) {
  return (
    <>
      <div className="w-full p-6 mx-auto text-center blue-300">
        <h1 className="text-4xl">{title}</h1>
        <p className="italic text-lg pt-2">{description}</p>
      </div>
      {children}
    </>
  );
}
