import Link from 'next/link';

export const metadata = {
  title: 'Gallery | St. Theresa Don Bosco School, Betul',
  description: 'Photo gallery of campus life, events, sports, and achievements at St. Theresa Don Bosco School, Betul.',
};

const categories = ['All', 'Campus', 'Sports', 'Events', 'Achievements'];

// Curated Unsplash photos representing school life
const photos = [
  { id: 1, category: 'Campus', alt: 'School Campus', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Our School Building' },
  { id: 2, category: 'Sports', alt: 'Students playing cricket', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Cricket Tournament' },
  { id: 3, category: 'Events', alt: 'Annual Day celebration', url: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Annual Day Celebrations' },
  { id: 4, category: 'Achievements', alt: 'Students receiving awards', url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Prize Distribution Ceremony' },
  { id: 5, category: 'Campus', alt: 'School library', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600&h=400', caption: 'School Library' },
  { id: 6, category: 'Sports', alt: 'Football match', url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Inter-School Football Match' },
  { id: 7, category: 'Events', alt: 'Science exhibition', url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Science Exhibition 2024' },
  { id: 8, category: 'Campus', alt: 'School playground', url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&q=80&w=600&h=400', caption: 'School Playground' },
  { id: 9, category: 'Achievements', alt: 'Board toppers', url: 'https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&q=80&w=600&h=400', caption: 'CBSE Board Toppers 2024' },
  { id: 10, category: 'Events', alt: 'Independence Day', url: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Independence Day Parade' },
  { id: 11, category: 'Sports', alt: 'Athletics day', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Annual Sports Day' },
  { id: 12, category: 'Campus', alt: 'School lab', url: 'https://images.unsplash.com/photo-1532094349884-543559083e2a?auto=format&fit=crop&q=80&w=600&h=400', caption: 'Science Laboratory' },
];

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Gallery</h1>
          <p className="text-primary-foreground text-lg max-w-2xl mx-auto">
            A glimpse into the vibrant school life at St. Theresa Don Bosco School.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Gallery</span>
        </div>
      </div>

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all cursor-default ${
                  cat === 'All'
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gray-100"
              >
                {/* Category Badge */}
                <span className="absolute top-3 left-3 z-10 bg-primary/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {photo.category}
                </span>
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              📸 More photos added regularly. Follow us for updates.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '500+', label: 'Students Enrolled' },
              { number: '30+', label: 'Qualified Teachers' },
              { number: '25+', label: 'Years of Excellence' },
              { number: '100%', label: 'Board Pass Rate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-3xl font-extrabold text-primary mb-1">{stat.number}</p>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
