import Link from 'next/link';

export default function BackHome() {
  return (
    <div className="my-3 border-t-2 border-black">
      <Link href="/">
        <a className="inline-block mt-1 text-sm rounded-2xl font-bold p-2 hover:text-gray-600">&larr; Back home</a>
      </Link>
    </div>
  );
}
