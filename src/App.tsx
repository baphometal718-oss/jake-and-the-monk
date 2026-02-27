import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, Heart, Sparkles, Brain, ArrowRight, Mail, Phone, MapPin, Star, Quote, CheckCircle2, ChevronDown, ShieldCheck, Users, Lightbulb, Headphones, Facebook, Instagram, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { translations } from './translations';

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = translations[lang];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  // 2. Cinematic Text Reveal (Scroll-Triggered)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-text').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang]);

  // 3. Magnetic Interactions
  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const btn = mouseEvent.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transform = `translate(0px, 0px)`;
    };

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [lang]);

  // 3. Asymmetrical Parallax
  useEffect(() => {
    let animationFrameId: number;
    
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-img');
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
        const rect = el.parentElement?.getBoundingClientRect();
        if (rect) {
          // Calculate distance from center of viewport
          const centerY = window.innerHeight / 2;
          const elementCenterY = rect.top + rect.height / 2;
          const diff = elementCenterY - centerY;
          const yPos = diff * speed;
          
          // Apply transform, preserving other transforms if possible (though inline style overrides classes)
          // We use a wrapper or just apply it directly since we control it
          (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
      
      animationFrameId = requestAnimationFrame(() => {});
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-terracotta/20">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-sand/90 backdrop-blur-md border-b border-ink/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold tracking-tight text-midnight">
            Jake & The Monk
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-midnight/70">
            <a href="#problem" className="hover:text-terracotta transition-colors">{t.nav.journey}</a>
            <a href="#collection" className="hover:text-terracotta transition-colors">{t.nav.books}</a>
            <a href="#method" className="hover:text-terracotta transition-colors">{t.nav.method}</a>
            <a href="#faq" className="hover:text-terracotta transition-colors">{t.nav.faq}</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-2 text-sm font-medium text-midnight/70 hover:text-terracotta transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <a href="#buy" className="inline-flex items-center justify-center px-6 py-2.5 bg-midnight text-sand rounded-full text-sm font-medium hover:bg-terracotta hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              {t.nav.begin}
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* 1. Hero Section (El Gancho Principal) */}
        <section className="relative w-full bg-midnight flex flex-col items-center justify-start overflow-hidden">
          {/* Video Container - No Overlay */}
          <motion.div 
            className="w-full relative flex justify-center items-center overflow-hidden h-[85vh]"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {/* Blurred Background */}
            <img 
              src="https://i.ibb.co/mVGMdJFq/grok-video-b7ea5768-2cc9-4b6d-b78d-11b8fcc0b6fb-ezgif-com-video-to-gif-converter.gif" 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Main Video */}
            <img 
              src="https://i.ibb.co/mVGMdJFq/grok-video-b7ea5768-2cc9-4b6d-b78d-11b8fcc0b6fb-ezgif-com-video-to-gif-converter.gif" 
              alt="Hero Background" 
              className="relative z-10 w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Content Container - Below Video */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-16 md:py-24">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-sand border border-white/10 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-6 text-white reveal-text">
                {t.hero.title1}<span className="italic text-gold font-serif">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-sand/80 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
                {t.hero.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#buy" className="magnetic-btn inline-flex items-center justify-center px-8 py-4 bg-terracotta text-white rounded-full text-base font-medium hover:bg-terracotta/90 transition-all duration-300 shadow-[0_0_30px_rgba(184,92,56,0.4)] hover:shadow-[0_0_50px_rgba(184,92,56,0.6)]">
                  {t.hero.cta}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2 & 3. El Espejo del Lector & El Cambio de Paradigma */}
        <section id="problem" className="py-32 bg-midnight text-sand px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Quote className="w-12 h-12 text-gold/50 mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 leading-tight reveal-text">
                {t.problem.title1}<br/>
                <span className="italic text-gold">{t.problem.titleHighlight}</span>
              </h2>
              <p className="text-lg md:text-xl text-sand/80 leading-relaxed mb-8 font-light">
                {t.problem.p1}
              </p>
              <div className="w-24 h-px bg-gold/30 mx-auto my-12"></div>
              <h3 className="text-2xl md:text-3xl font-serif font-light mb-6 text-white">
                {t.problem.title2}
              </h3>
              <p className="text-lg md:text-xl text-sand/80 leading-relaxed font-light">
                {t.problem.p2}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Transition: Blur Reveal */}
        <motion.section 
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full bg-midnight flex items-center justify-center overflow-hidden h-[85vh] py-12"
        >
          {/* Blurred Background */}
          <img 
            src="https://i.ibb.co/chdnkdD1/grok-image-6fed59a9-bd4d-419f-9071-4e8e19e8795f.jpg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Main Image */}
          <img 
            src="https://i.ibb.co/chdnkdD1/grok-image-6fed59a9-bd4d-419f-9071-4e8e19e8795f.jpg" 
            alt="Transition" 
            className="relative z-10 w-full max-w-7xl h-full object-contain rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.section>

        {/* 4 & 5. La Solución & Fusión de Dos Mundos */}
        <section id="book" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 flex justify-center perspective-1000"
            >
              <motion.div
                whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05, boxShadow: "30px 30px 50px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full max-w-lg aspect-[3/4] rounded-2xl shadow-2xl transform-style-3d cursor-pointer overflow-hidden"
              >
                {/* Blurred Background */}
                <img src="https://i.ibb.co/WWw5DzHn/grok-image-60ab5fa7-9f40-4e79-900b-51977148c73f.jpg" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
                {/* Main Image */}
                <img src="https://i.ibb.co/WWw5DzHn/grok-image-60ab5fa7-9f40-4e79-900b-51977148c73f.jpg" alt="Jake and the Monk Book" className="relative z-10 w-full h-full object-contain" referrerPolicy="no-referrer" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-midnight mb-6 reveal-text">{t.book.title}</h2>
              <p className="text-lg text-midnight/70 mb-8 leading-relaxed font-light">
                {t.book.desc}
              </p>
              
              <div className="bg-sage/10 p-8 rounded-2xl border border-sage/20 mb-8">
                <h3 className="text-xl font-bold text-midnight mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-sage" /> {t.book.subtitle}
                </h3>
                <p className="text-midnight/70 font-light leading-relaxed">
                  {t.book.subdesc}
                </p>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-midnight/80 font-light">
                  <ShieldCheck className="w-6 h-6 text-terracotta shrink-0" />
                  <span>{t.book.bullet1}</span>
                </li>
                <li className="flex items-start gap-3 text-midnight/80 font-light">
                  <Lightbulb className="w-6 h-6 text-gold shrink-0" />
                  <span>{t.book.bullet2}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 6, 7 & 8. El Método (Pedir, Creer, Recibir) */}
        <section className="w-full bg-midnight pt-24 pb-12 flex justify-center relative overflow-hidden h-[85vh]">
          {/* Blurred Background */}
          <img src="https://i.ibb.co/7tLNMpH9/grok-video-7e846163-f5b5-43dd-ab65-87f099ed9af62-ezgif-com-video-to-gif-converter.gif" className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
          {/* Main Video */}
          <img src="https://i.ibb.co/7tLNMpH9/grok-video-7e846163-f5b5-43dd-ab65-87f099ed9af62-ezgif-com-video-to-gif-converter.gif" className="relative z-10 w-full max-w-7xl h-full object-contain rounded-2xl shadow-2xl" alt="Energy Background" referrerPolicy="no-referrer" />
        </section>
        
        <section id="method" className="pb-24 px-6 bg-midnight relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 reveal-text">{t.method.title}</h2>
              <p className="text-sand/60 uppercase tracking-widest text-sm font-bold">{t.method.subtitle}</p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 relative"
            >
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-sage/20 via-terracotta/30 to-gold/20 z-0"></div>

              {[
                {
                  step: "01",
                  icon: <Brain className="w-8 h-8" />,
                  title: t.method.step1Title,
                  color: "text-sage",
                  bg: "bg-sage/10",
                  desc: t.method.step1Desc
                },
                {
                  step: "02",
                  icon: <Heart className="w-8 h-8" />,
                  title: t.method.step2Title,
                  color: "text-terracotta",
                  bg: "bg-terracotta/10",
                  desc: t.method.step2Desc
                },
                {
                  step: "03",
                  icon: <Sparkles className="w-8 h-8" />,
                  title: t.method.step3Title,
                  color: "text-gold",
                  bg: "bg-gold/10",
                  desc: t.method.step3Desc
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="relative z-10 bg-white p-10 rounded-3xl shadow-sm border border-midnight/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 text-8xl font-serif font-black text-sand/50 z-0 select-none transition-transform group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${item.color} ${item.bg} mb-8 relative z-10 transform group-hover:rotate-6 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-midnight mb-4 relative z-10">{item.title}</h3>
                  <p className="text-midnight/70 leading-relaxed font-light relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 10 & 11. Autoridad y Audiencia */}
        <section className="py-24 bg-midnight text-sand px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group order-1"
            >
              <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-2xl group-hover:bg-gold/40 transition-colors duration-700"></div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
                <img 
                  src="https://i.ibb.co/v6Wg6HNk/grok-image-e8fc45ca-862b-4d3f-bf97-059d24177ad6.jpg" 
                  alt="Lynn E. O'Leary" 
                  className="absolute -top-[15%] -bottom-[15%] w-full h-[130%] object-cover transition-transform duration-1000 group-hover:scale-[1.05] parallax-img"
                  data-speed="0.15"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 reveal-text">{t.author.title}</h2>
              <h3 className="text-xl font-serif italic text-gold mb-8">{t.author.subtitle}</h3>
              <div className="space-y-6 text-sand/80 font-light leading-relaxed">
                <p>
                  {t.author.p1}
                </p>
                <p>
                  <strong className="text-white">{t.author.p2}</strong>
                </p>
                
                <div className="mt-10 pt-10 border-t border-white/10">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-terracotta" /> {t.author.beaconTitle}
                  </h4>
                  <p>
                    {t.author.beaconDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 12. Prueba Social */}
        <section className="py-24 px-6 bg-sage/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-midnight mb-4">{t.testimonials.title}</h2>
              <div className="flex justify-center gap-1 text-gold mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: t.testimonials.t1,
                  author: "Sarah M.",
                  role: t.testimonials.r1
                },
                {
                  quote: t.testimonials.t2,
                  author: "David R.",
                  role: t.testimonials.r2
                },
                {
                  quote: t.testimonials.t3,
                  author: "Elena T.",
                  role: t.testimonials.r3
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-midnight/5 relative"
                >
                  <Quote className="w-10 h-10 text-sage/20 absolute top-6 right-6" />
                  <p className="text-midnight/80 italic mb-8 relative z-10 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-midnight">{testimonial.author}</p>
                    <p className="text-sm text-midnight/50 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meditation / Practice Section */}
        <section className="w-full bg-midnight pt-24 pb-12 flex justify-center relative overflow-hidden h-[85vh]">
          {/* Blurred Background */}
          <img src="https://i.ibb.co/nqZZrj3n/grok-image-09359f05-b129-441d-9253-80be553fa242.jpg" className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
          {/* Main Image */}
          <img src="https://i.ibb.co/nqZZrj3n/grok-image-09359f05-b129-441d-9253-80be553fa242.jpg" className="relative z-10 w-full max-w-7xl h-full object-contain rounded-2xl shadow-2xl" alt="Meditation" referrerPolicy="no-referrer" />
        </section>

        <section className="relative pb-32 overflow-hidden bg-midnight text-sand">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-6 text-white reveal-text">{t.practice.title}</h2>
              <p className="text-lg text-sand/80 leading-relaxed font-light mb-8">
                {t.practice.desc}
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-gold" /> {t.practice.b1}</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-gold" /> {t.practice.b2}</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-gold" /> {t.practice.b3}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 13, 14 & 15. The Collection (Books, Audiobooks & Spike) */}
        <section id="collection" className="py-24 px-6 bg-white border-t border-midnight/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-terracotta font-bold uppercase tracking-widest text-sm mb-4 block">{t.collection.tag}</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-midnight mb-8 reveal-text">{t.collection.title}</h2>
              <p className="text-lg text-midnight/70 leading-relaxed font-light max-w-2xl mx-auto">
                {t.collection.desc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Paperback / Kindle */}
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-sand rounded-3xl p-8 border border-midnight/5 flex flex-col h-full hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 shadow-md relative">
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop" alt="Jake and the Monk Book" className="relative z-10 w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-2 text-terracotta mb-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">{t.collection.bookTag}</span>
                </div>
                <h3 className="text-2xl font-bold text-midnight mb-3">Jake and the Monk</h3>
                <p className="text-midnight/70 font-light mb-8 flex-grow">{t.collection.bookDesc}</p>
                <a href="https://www.amazon.com/Jake-Monk-Script-Thoughts-Things/dp/B0CFCYT1VB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-4 bg-midnight text-white rounded-xl font-bold hover:bg-terracotta transition-colors">
                  {t.collection.bookBtn}
                </a>
              </motion.div>

              {/* Audiobook */}
              <motion.div 
                variants={fadeInUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                transition={{ delay: 0.2 }} 
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(197, 160, 89, 0.3)" }}
                className="bg-midnight rounded-3xl p-8 border border-white/10 flex flex-col h-full transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl"></div>
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 shadow-md relative">
                  <img src="https://i.ibb.co/WWntmYhP/grok-image-29e29ad6-80a6-4df3-b4b1-e5342b7e0327.jpg" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
                  <img src="https://i.ibb.co/WWntmYhP/grok-image-29e29ad6-80a6-4df3-b4b1-e5342b7e0327.jpg" alt="Audiobook" className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-500 mix-blend-overlay z-20 pointer-events-none"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-midnight shadow-[0_0_20px_rgba(197,160,89,0.8)] transform scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Headphones className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gold mb-3">
                  <Headphones className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">{t.collection.audioTag}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Jake and the Monk</h3>
                <p className="text-sand/70 font-light mb-8 flex-grow">{t.collection.audioDesc}</p>
                <a href="https://a.co/d/a47qmIH" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-4 bg-gold text-midnight rounded-xl font-bold hover:bg-gold/90 transition-colors">
                  {t.collection.audioBtn}
                </a>
              </motion.div>

              {/* Spike */}
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-sand rounded-3xl p-8 border border-midnight/5 flex flex-col h-full hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 shadow-md bg-white flex items-center justify-center relative">
                  <img src="https://i.ibb.co/ZpGfHtZN/grok-video-679585cd-c7ef-48e4-9dfe-2c2fd93e677d-ezgif-com-video-to-gif-converter.gif" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110" alt="" referrerPolicy="no-referrer" />
                  <img src="https://i.ibb.co/ZpGfHtZN/grok-video-679585cd-c7ef-48e4-9dfe-2c2fd93e677d-ezgif-com-video-to-gif-converter.gif" alt="Adventures with Spike" className="relative z-10 w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center gap-2 text-terracotta mb-3">
                  <Star className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">{t.collection.spikeTag}</span>
                </div>
                <h3 className="text-2xl font-bold text-midnight mb-3">Adventures With Spike</h3>
                <p className="text-midnight/70 font-light mb-8 flex-grow">{t.collection.spikeDesc}</p>
                <a href="https://www.amazon.com/Adventures-Spike-Motorcycle-Riding-Teddy-Bear/dp/B096TQ6CF6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-4 border-2 border-midnight text-midnight rounded-xl font-bold hover:bg-midnight hover:text-white transition-colors">
                  {t.collection.spikeBtn}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 19. Preguntas Frecuentes (FAQ) */}
        <section id="faq" className="py-24 px-6 bg-sand">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-midnight mb-4">{t.faq.title}</h2>
              <p className="text-midnight/60 uppercase tracking-widest text-sm font-bold">{t.faq.subtitle}</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: t.faq.q1,
                  a: t.faq.a1
                },
                {
                  q: t.faq.q2,
                  a: t.faq.a2
                },
                {
                  q: t.faq.q3,
                  a: t.faq.a3
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-midnight/5 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-midnight">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-terracotta transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="p-6 pt-0 text-midnight/70 font-light leading-relaxed border-t border-midnight/5 mt-2">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 20. El Cierre y Footer (El Ultimátum) */}
        <section id="buy" className="py-20 bg-midnight text-sand px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-transparent"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">
                {t.cta.title1}<br/>
                <span className="italic text-gold">{t.cta.titleHighlight}</span>
              </h2>
              <p className="text-xl text-sand/80 mb-12 font-light max-w-2xl mx-auto">
                {t.cta.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a 
                  href="https://www.amazon.com/Jake-Monk-Script-Thoughts-Things/dp/B0CFCYT1VB" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="magnetic-btn w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-terracotta text-white rounded-full text-lg font-bold hover:bg-terracotta/90 transition-all duration-300 shadow-[0_0_40px_rgba(184,92,56,0.4)] hover:shadow-[0_0_60px_rgba(184,92,56,0.6)]"
                >
                  {t.cta.btn}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] pt-16 pb-8 px-6 border-t border-white/10 text-sand/70">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand & Bio */}
            <div className="lg:pr-8">
              <div className="flex flex-col items-start mb-6">
                <div className="font-serif text-3xl font-bold tracking-tight text-white mb-1 flex flex-col">
                  <span className="text-[10px] font-sans font-normal text-gold uppercase tracking-widest mb-1">{t.footer.tagline}</span>
                  <span>JAKE AND THE</span>
                  <span className="text-terracotta text-4xl">MONK</span>
                </div>
              </div>
              <p className="font-light leading-relaxed text-sm mb-8">
                {t.footer.desc}
              </p>
              <div>
                <h4 className="font-bold text-sm text-white mb-4">{t.footer.follow}</h4>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-medium text-sm text-white mb-6 uppercase tracking-wider">{t.footer.links}</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.home}</a></li>
                <li><a href="#problem" className="hover:text-white transition-colors">{t.footer.about}</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">{t.footer.books}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.blogs}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t.footer.contact}</a></li>
              </ul>
            </div>

            {/* Column 3: Audio Books */}
            <div>
              <h4 className="font-medium text-sm text-white mb-6 uppercase tracking-wider">{t.footer.audio}</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="https://a.co/d/a47qmIH" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jake and the Monk</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div id="contact">
              <h4 className="font-medium text-sm text-white mb-6 uppercase tracking-wider">{t.footer.contact}</h4>
              <div className="space-y-6 font-light text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>781 Cottonwood Dr Broomfield, CO 80020 US</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                  <a href="mailto:info@jakeandthemonk.com" className="hover:text-white transition-colors">info@jakeandthemonk.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <a href="tel:+17204732281" className="hover:text-white transition-colors">+1 (720)-473-2281</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
            <p>{t.footer.rights}</p>
            <p>{t.footer.design}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
