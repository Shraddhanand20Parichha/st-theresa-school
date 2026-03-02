const fs = require('fs');
let page = fs.readFileSync('src/app/admin/page.tsx', 'utf8');
page = page.replace(/const handleLogin = \(e: React\.FormEvent\) => \{[\s\S]*?setError\('Invalid credentials'\);?
    \}?
  \};/, "const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        window.localStorage.setItem('isAuthenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };");
fs.writeFileSync('src/app/admin/page.tsx', page);

let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace("import Navbar from '@/components/Navbar';", "import Navbar from '@/components/Navbar';\nimport Footer from '@/components/Footer';");
layout = layout.replace(/export const metadata: Metadata = \{[\s\S]*?\};/, "export const metadata: Metadata = {
  title: 'St. Theresa Don Bosco School, Betul - CBSE',
  description: 'Official website of St. Theresa School, Betul. A CBSE affiliated institution providing quality education and holistic development.',
};");
layout = layout.replace(/<main className="min-h-screen">[\s\S]*?<\/main>\s*<\/body>/, "<main className=\"min-h-screen\">\n          {children}\n        </main>\n        <Footer />\n      </body>");
fs.writeFileSync('src/app/layout.tsx', layout);
console.log('Update Complete: ', layout.includes('<Footer />') && page.includes('/api/auth/login'));
