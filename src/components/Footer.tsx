import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">St. Theresa Don Bosco School</h3>
            <p className="text-gray-400">Providing quality education and holistic development since our founding.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Mandatory Disclosures</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/important-documents" className="text-primary-light hover:text-white font-semibold transition-colors">
                  CBSE Mandatory Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} St. Theresa Don Bosco School, Betul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
