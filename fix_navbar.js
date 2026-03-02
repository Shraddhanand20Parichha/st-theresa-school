const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
code = code.replace(/\{\*\s*Desktop Menu\s*\*\}/g, '{/* Desktop Menu */}');
code = code.replace(/\{\*\s*Mobile Menu Button\s*\*\}/g, '{/* Mobile Menu Button */}');
code = code.replace(/\{\*\s*Mobile Menu Panel\s*\*\*\}/g, '{/* Mobile Menu Panel */}');
fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('Fixed JSX comments');
