import Link from 'next/link';

export const metadata = {
  title: 'About Us | St. Theresa Don Bosco School, Betul',
  description: 'Learn about the history, mission, vision, and values of St. Theresa Don Bosco School, Betul — a CBSE affiliated institution.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Page Hero */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Us</h1>
          <p className="text-primary-foreground text-lg max-w-2xl mx-auto">
            Empowering generations through knowledge, values, and discipline since our founding.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">About Us</span>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary/5 rounded-2xl p-8 border-l-4 border-primary">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To provide holistic, high-quality education rooted in Christian values, nurturing each student's intellectual, moral, and spiritual growth. We are committed to preparing well-rounded individuals who contribute positively to society.
              </p>
            </div>
            <div className="bg-accent/10 rounded-2xl p-8 border-l-4 border-accent">
              <div className="text-4xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be a centre of excellence where every child thrives — academically, socially, and spiritually — and emerges as a compassionate leader, equipped to face the challenges of a dynamic world with confidence and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Our History
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-gray-700 space-y-5 text-lg leading-relaxed">
            <p>
              St. Theresa Don Bosco School was founded with a noble vision — to bring quality education to the children of Betul, Madhya Pradesh. Inspired by the spirit of Don Bosco and the patronage of St. Theresa, the institution has grown from humble beginnings into one of the district's most respected CBSE-affiliated schools.
            </p>
            <p>
              Over the decades, the school has consistently produced outstanding results in board examinations and has been recognized for excellence in academics, sports, and cultural activities. Our alumni have gone on to careers in medicine, engineering, law, and public service — a testament to the foundation laid within these walls.
            </p>
            <p>
              Today, St. Theresa Don Bosco School stands as a beacon of learning for thousands of students, continuing the legacy of disciplined, value-based education for a new generation.
            </p>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-primary p-8 text-white text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-4xl">
                👤
              </div>
              <h2 className="text-2xl font-bold">Principal&apos;s Message</h2>
              <p className="text-primary-foreground text-sm mt-1">Office of the Principal</p>
            </div>
            <div className="p-8 text-gray-700 space-y-4 leading-relaxed text-lg italic">
              <p>
                &ldquo;Welcome to St. Theresa Don Bosco School — a place where young minds are shaped with care, knowledge, and purpose. Our institution believes that education goes beyond textbooks; it is about building character, instilling values, and igniting a love for lifelong learning.
              </p>
              <p>
                We are committed to providing every child with an environment that is safe, stimulating, and nurturing. Our dedicated faculty, modern infrastructure, and comprehensive curriculum work together to ensure that each student discovers their unique potential.
              </p>
              <p>
                I invite you to join our family, explore our programs, and be part of a tradition of excellence that has shaped generations of leaders.&rdquo;
              </p>
              <p className="not-italic font-bold text-primary">— Principal, St. Theresa Don Bosco School</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Our Core Values
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📖', title: 'Academic Excellence', desc: 'Striving for the highest standards in learning.' },
              { icon: '🤝', title: 'Integrity', desc: 'Honesty and transparency in all we do.' },
              { icon: '🌱', title: 'Holistic Growth', desc: 'Nurturing mind, body, and spirit equally.' },
              { icon: '❤️', title: 'Compassion', desc: 'Serving others with love and empathy.' },
            ].map((val) => (
              <div key={val.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-3">{val.icon}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Contact &amp; Location
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: '📍', title: 'Address', lines: ['St. Theresa Don Bosco School', 'Betul, Madhya Pradesh', 'India — 460001'] },
              { icon: '📞', title: 'Phone', lines: ['Office: +91-XXXXX-XXXXX', 'Admissions: +91-XXXXX-XXXXX'] },
              { icon: '🕐', title: 'School Hours', lines: ['Monday – Saturday', '7:30 AM – 2:30 PM', 'Office open till 4:00 PM'] },
            ].map((info) => (
              <div key={info.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{info.icon}</div>
                <h3 className="text-lg font-bold text-primary mb-3">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-gray-600 text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
