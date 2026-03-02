
import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let quickLinks = [];
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    const res = await fetch(`${protocol}://${host}/api/settings`, { cache: 'no-store' });
    if (res.ok) {
        const data = await res.json();
        quickLinks = data.quickLinks || [];
    }
  } catch (e) {
    console.error("Failed to fetch quick links", e);
  }

  return (
    <div>
      <HeroSlider />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8 relative inline-block">
            Quick Links
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
          </h2>
          
          {quickLinks.length === 0 ? (
             <p className="text-gray-500">No quick links available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link: any) => (
                <div key={link.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full group">
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-primary-light transition-colors">{link.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{link.description}</p>
                  <Link href={link.url} className="text-accent font-semibold hover:text-accent-light inline-flex items-center group/btn">
                    Access Link 
                    <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
