
import Link from 'next/link';
import { headers } from 'next/headers';

const CATEGORIES = [
  { id: 'affiliation', label: 'Affiliation Certificate' },
  { id: 'trust', label: 'Trust/Society Registration' },
  { id: 'noc', label: 'No Objection Certificate (NOC)' },
  { id: 'recognition', label: 'Recognition Certificate' },
  { id: 'buildingSafety', label: 'Building Safety Certificate' },
  { id: 'fireSafety', label: 'Fire Safety Certificate' },
  { id: 'healthSanitation', label: 'Health & Sanitation Certificate' },
  { id: 'feeStructure', label: 'Fee Structure' },
];

export const dynamic = 'force-dynamic';

export default async function CBSEDisclosurePublic() {
  let documents: Record<string, string> = {};
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    const res = await fetch(`${protocol}://${host}/api/settings`, { cache: 'no-store' });
    if (res.ok) {
        const data = await res.json();
        documents = data.cbseDocuments || {};
    }
  } catch (e) {
    console.error("Failed to fetch documents", e);
  }

  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-80px-32px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-primary p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">CBSE Mandatory Disclosure</h1>
              <p className="text-primary-foreground">Documents published in accordance with CBSE guidelines.</p>
            </div>
          
          <div className="p-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr. No.</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Information</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {CATEGORIES.map((cat, idx) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{idx + 1}</td>
                        <td className="px-6 py-5 text-sm font-semibold text-gray-900">{cat.label}</td>
                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                        {documents[cat.id] ? (
                            <a href={documents[cat.id]} target="_blank" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-light transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                                View PDF
                            </a>
                        ) : (
                            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 italic">
                                Pending Release
                            </span>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
