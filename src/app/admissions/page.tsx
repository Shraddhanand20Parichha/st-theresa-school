import Link from 'next/link';

export const metadata = {
  title: 'Admissions | St. Theresa Don Bosco School, Betul',
  description: 'Admission process, eligibility criteria, required documents, and fee information for St. Theresa Don Bosco School, Betul.',
};

const steps = [
  { step: '01', title: 'Pick Up Form', desc: 'Collect the admission form from the school office or download it from this page during the admission season.' },
  { step: '02', title: 'Submit Documents', desc: 'Submit the completed form along with all required documents at the school office.' },
  { step: '03', title: 'Interaction', desc: 'The student and parent/guardian may be called for a brief interaction with school management.' },
  { step: '04', title: 'Confirmation', desc: 'Upon selection, pay the fee and receive your admission confirmation letter.' },
];

const docs = [
  'Birth Certificate (original + photocopy)',
  'Transfer Certificate from previous school (if applicable)',
  'Report Card / Mark Sheet from previous class',
  'Aadhar Card of student',
  'Aadhar Card of parent/guardian',
  'Passport-size photographs (4 copies)',
  'Caste / Category certificate (if applicable)',
  'Medical fitness certificate',
];

const ageCriteria = [
  { cls: 'Nursery', age: '3+ years' },
  { cls: 'LKG', age: '4+ years' },
  { cls: 'UKG', age: '5+ years' },
  { cls: 'Class I', age: '6+ years' },
  { cls: 'Class II onwards', age: 'As per CBSE norms' },
];

export default function AdmissionsPage() {
  return (
    <div className="bg-white">
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Admissions</h1>
          <p className="text-primary-foreground text-lg max-w-2xl mx-auto">
            Secure your child&apos;s future with a quality education rooted in values and excellence.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Admissions</span>
        </div>
      </div>

      {/* Notice Banner */}
      <section className="py-6 bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <span className="text-3xl">📢</span>
          <p className="text-primary font-semibold">
            Admissions are open for the current academic year. Contact the school office for availability and details.
          </p>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary relative inline-block">
              Admission Process
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl font-extrabold text-primary/10 absolute top-4 right-4">{s.step}</div>
                <h3 className="text-lg font-bold text-primary mb-2 relative">{s.title}</h3>
                <p className="text-gray-600 text-sm relative">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Criteria & Documents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Age Criteria */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 relative inline-block">
                Age Criteria
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full -mb-1"></span>
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Minimum Age</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ageCriteria.map((row) => (
                      <tr key={row.cls} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.cls}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Documents Required */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 relative inline-block">
                Documents Required
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full -mb-1"></span>
              </h2>
              <ul className="space-y-3">
                {docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-accent text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-primary-foreground mb-8 max-w-xl mx-auto">
            Our admissions team is happy to assist you. Visit us during office hours or call for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl inline-block">
              Contact &amp; Location
            </Link>
            <Link href="/cbse-disclosure" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-full border border-white/30 transition-all inline-block">
              Fee Structure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
