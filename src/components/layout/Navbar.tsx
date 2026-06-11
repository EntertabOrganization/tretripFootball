'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { Menu, X, Eye } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleColorBlindMode = () => {
    document.body.classList.toggle('color-blind-mode');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
           {/* Placeholder for actual logo */}
           <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
             <span className="text-white font-bold text-xl">GF</span>
           </div>
           <div className="text-3xl font-heading font-bold text-white tracking-wider">GIDDAM</div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={toggleColorBlindMode} className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors" title="Color Blind Mode">
            <Eye size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">Color Blind Mode</span>
          </button>
          
          <button onClick={switchLocale} className="text-white hover:text-primary uppercase font-bold tracking-widest text-sm transition-colors">
            {locale === 'en' ? 'عربي' : 'EN'}
          </button>
          
          <a href="https://fifa.com/tickets" target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground font-bold px-8 py-3 transform -skew-x-12 hover:bg-giddam-light transition-colors inline-block shadow-[0_0_15px_rgba(0,168,135,0.3)]">
             <span className="block transform skew-x-12 tracking-wide uppercase">{t('bookTicket')}</span>
          </a>
        </div>
        
        <button className="lg:hidden text-white hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
         <div className="md:hidden bg-background p-6 border-b border-white/10 flex flex-col gap-6 animate-in slide-in-from-top-4">
            <button onClick={switchLocale} className="text-left font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">
              {locale === 'en' ? 'عربي' : 'English'}
            </button>
            <button onClick={toggleColorBlindMode} className="text-left font-bold text-white flex items-center gap-3 hover:text-primary transition-colors">
              <Eye size={20} /> Color Blind Mode
            </button>
            <a href="https://fifa.com/tickets" className="bg-primary text-center text-primary-foreground font-bold px-6 py-4 transform -skew-x-12 mt-4 hover:bg-giddam-light transition-colors">
               <span className="block transform skew-x-12">{t('bookTicket')}</span>
            </a>
         </div>
      )}
    </nav>
  );
}
