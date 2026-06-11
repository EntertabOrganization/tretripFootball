'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const socialLinks = [
    { name: 'FB', href: '#' },
    { name: 'X', href: '#' },
    { name: 'IG', href: '#' },
    { name: 'YT', href: '#' },
  ];

  return (
    <footer className="bg-background pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10">
        <div className="flex items-center gap-4">
          {socialLinks.map((social, idx) => {
            return (
              <a 
                key={idx} 
                href={social.href}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-giddam-light via-giddam-teal to-primary flex items-center justify-center text-background hover:scale-110 transition-transform font-bold"
              >
                {social.name}
              </a>
            );
          })}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary uppercase tracking-widest text-center">
          #QiddamWithTheSameSpirit
        </h2>
        
        <div className="w-full h-px bg-white/10 my-4"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full text-white/60 text-sm">
          <p>© 2026 Saudi Arabian Football Federation. All Rights Reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
