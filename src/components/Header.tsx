import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-md flex items-center justify-between px-4 py-2 z-50">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Modern Recovery X Logo" className="h-8 w-8 mr-2" />
        <div>
          <span className="text-blue-600 font-bold text-xl">Modern Recovery X</span>
          <div className="text-gray-500 text-sm">Local Resources. Real Help. No Judgment.</div>
        </div>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/submit">Submit Resource</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/submit">
          <button className="ml-4 px-4 py-2 bg-teal-400 text-white rounded shadow hover:bg-teal-500">
            + Submit Resource
          </button>
        </Link>
      </nav>
    </header>
  );
}
