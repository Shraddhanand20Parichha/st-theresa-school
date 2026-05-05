import Link from 'next/link';

export const metadata = {
  title: 'Academics | St. Theresa Don Bosco School, Betul',
  description: 'CBSE affiliated school offering Nursery to Class XII with comprehensive academics and co-curricular activities.',
};

const classes = [
  { range: 'Pre-Primary', grades: 'Nursery, LKG, UKG', desc: 'Play-based learning building a strong foundation in language, numbers, and social skills.' },
  { range: 'Primary', grades: 'Class I – V', desc: 'Core subjects: English, Hindi, Mathematics, Science, and Social Studies.' },
  { range: 'Middle School', grades: 'Class VI – VIII', desc: 'Deepening concepts with Computer Science, General Knowledge, and value education.' },
  { range: 'Secondary', grades: 'Class IX – X', desc: 'CBSE board preparation with all core subjects, practicals, and project-based assessments.' },
  { range: 'Senior Secondary', grades: 'Class XI – XII', desc: 'Science & Commerce streams available for national competitive exam preparation.' },
];

const activities = [
  { icon: '⚽', name: 'Sports', desc: 'Football, Cricket, Kabaddi, Athletics and Yoga' },
  { icon: '🎵', name: 'Music & Arts', desc: 'Vocal, instrumental, painting and craft workshops' },
  { icon: '🎭', name: 'Drama & Elocution', desc: 'Annual plays, debate, and public speaking' },
  { icon: '🧪', name: 'Science Labs', desc: 'Physics, Chemistry and Biology labs' },
  { icon: '📚', name: 'Library', desc: 'Books, magazines and e-resources' },
  { icon: '🌿', name: 'Eco Club', desc: 'Environmental awareness activities' },
];

export default function AcademicsPage() {
  return (
    <div className="bg-white">
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Academics</h1>
          <p className="text-primary-foreground text-lg max-w-2xl mx-auto">
            A rigorous, balanced CBSE curriculum designed to unlock every student&apos;s potential.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Academics</span>
        </div>
      </div>

      <section className="py-8 bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6 text-center">
          <div className="text-5xl">🎓</div>
          <div>
            <p className="text-xl font-bold text-primary">CBSE Affiliated School</p>
            <p className="text-gray-600">Affiliated to Central Board of Secondary Education (CBSE), New Delhi</p>
          </div>
          <Link href="/cbse-disclosure" className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap">
            View CBSE Documents
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Classes Offered
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {classes.map((cls, idx) => (
              <div key={cls.range} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center">
                  {idx + 1}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-primary">{cls.range}</h3>
                    <span className="bg-accent/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">{cls.grades}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{cls.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Beyond the Classroom
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div key={act.name} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-3xl flex-shrink-0">{act.icon}</div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{act.name}</h3>
                  <p className="text-gray-600 text-sm">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-primary-foreground mb-8 max-w-xl mx-auto">Enrol your child in one of Betul&apos;s finest CBSE schools.</p>
          <Link href="/admissions" className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-block">
            Apply for Admission →
          </Link>
        </div>
      </section>
    </div>
  );
}
