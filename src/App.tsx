/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Trophy, 
  Search, 
  Menu, 
  ChevronRight, 
  Star,
  Zap,
  Flame,
  Globe,
  Users,
  BarChart3,
  X
} from 'lucide-react';

// Types
interface Contest {
  id: string;
  name: string;
  status: string;
  image: string;
  description: string;
}

interface Candidate {
  id: string;
  country: string;
  name: string;
  flag: string;
  image: string;
  gradient: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const candidates: Candidate[] = [
    { 
      id: '1', 
      country: 'CHILE', 
      name: 'Inna Moll', 
      flag: '🇨🇱', 
      image: 'https://revistavelvet.cl/wp-content/uploads/2025/11/Inna-Moll.jpg',
      gradient: 'from-[#D52B1E]/80 via-[#0039A6]/40 to-transparent'
    },
    { 
      id: '2', 
      country: 'INDIA', 
      name: 'Mehak Dhingra', 
      flag: '🇮🇳', 
      image: 'https://i.ytimg.com/vi/76F2WSxTGnY/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBzqanUrexNkqK-pzCT7wta5o6QCg&usqp=CCk',
      gradient: 'from-[#FF9933]/80 via-[#128807]/40 to-transparent'
    },
    { 
      id: '3', 
      country: 'PARAGUAY', 
      name: 'Sharon Caponara', 
      flag: '🇵🇾', 
      image: 'https://scontent-hou1-1.xx.fbcdn.net/v/t51.75761-15/470916528_18482153464061601_920934663002749134_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=v1fQeJvzMWUQ7kNvwHlWG-5&_nc_oc=Adm2jgQK6tq595Cc3mSEk5_uKAoY-LMiRpOLMq1EvYm20YXDwVgKuAynfx0qhs6vB5g&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=_P6Iuu8yFdmbVas62uvmcg&_nc_ss=8&oh=00_Afw8ep8fovvn6W4n-Bb0e8e6znL5Ol9mvOx7AUe5o9HceA&oe=69B6A7BF',
      gradient: 'from-[#D52B1E]/80 via-[#0038A8]/40 to-transparent'
    },
    { 
      id: '4', 
      country: 'THAILAND', 
      name: 'Opal Suchata', 
      flag: '🇹🇭', 
      image: 'https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/497708233_122131775348417835_6942953181716767725_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=53a332&_nc_ohc=L8fSRW0dI5EQ7kNvwHNTjke&_nc_oc=AdlXBUHNdehkJgMjDzILEmcmw8BkROf1rGw3hnoPf2LgL8V4NrHeqAL2qgWY8CMzWgY&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=VQa7H8rBt3zDjKq8ubTegw&_nc_ss=8&oh=00_Afx1in75CE0WjEknAJn38RXjOLpdYg-3-zecnz7l3QVboQ&oe=69B6C532',
      gradient: 'from-[#ED1C24]/80 via-[#241D5E]/40 to-transparent'
    },
    { 
      id: '5', 
      country: 'UNITED KINGDOM', 
      name: 'Amy Viranya Berry', 
      flag: '🇬🇧', 
      image: 'https://scontent-hou1-1.xx.fbcdn.net/v/t51.82787-15/565093725_17947293651045943_5220260970474638367_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=4Yt_Jxm5FygQ7kNvwGyExiC&_nc_oc=Adm54xqG7XAg9b_F32deyfArJCkKkOjDkyJIZE9ipQYf6MRR_WrQuGGM20OyocqZ9Yc&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=YVbkLE5OBSg4XGtlq0SWBg&_nc_ss=8&oh=00_Afy8ue7ElcrsiXwwOLWPrMQiLwrMFrO_Ctd3ySCXpx--mQ&oe=69B6C6F9',
      gradient: 'from-[#C8102E]/80 via-[#012169]/40 to-transparent'
    },
    { 
      id: '6', 
      country: 'GUADELOUPE', 
      name: 'Ophély Mézino', 
      flag: '🇬🇵', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPHyQy2KIskj9I2ry3A2dmJFHYkSvKzGI2KQ&s',
      gradient: 'from-[#002395]/80 via-[#FFCD00]/40 to-transparent'
    },
    { 
      id: '7', 
      country: 'ECUADOR', 
      name: 'Andrea Aguilera', 
      flag: '🇪🇨', 
      image: 'https://scontent-hou1-1.xx.fbcdn.net/v/t39.30808-6/480945431_1072220648268709_7872786444448487174_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_ohc=AT8WNOeK-QYQ7kNvwFu-MAt&_nc_oc=AdmIpejrcpsVz3p7skraNs9dtPlgVTDS921VJA9hhnSG5Gd-tooNpUzV4o6M9crybJ0&_nc_zt=23&_nc_ht=scontent-hou1-1.xx&_nc_gid=2uB9id7Y6iUGDxe82U4oCA&_nc_ss=8&oh=00_AfxpzoRnUzlpDbDIFqmPP43p9Qmbhtu1nJNFq9xYBP8cZg&oe=69B6D1CB',
      gradient: 'from-[#ED1C24]/90 via-[#0038A8]/60 to-[#FFCC00]/30'
    },
    { 
      id: '8', 
      country: 'VENEZUELA', 
      name: 'Stefany Gutierrez', 
      flag: '🇻🇪', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI5z8ninFfGfRHfuLslip0zmi1S23Ik71-mA&s',
      gradient: 'from-[#ED1C24]/90 via-[#0038A8]/60 to-[#FFCC00]/30'
    },
    { 
      id: '9', 
      country: 'ARGENTINA', 
      name: 'Aldana Masset', 
      flag: '🇦🇷', 
      image: 'https://img.lagaceta.com.ar/fotos/notas/2025/11/20/600x400_aldana-masset-candidata-argentina-miss-universo-2025-1113480-113211.webp',
      gradient: 'from-[#74ACDF]/80 via-white/40 to-transparent'
    },
    { 
      id: '10', 
      country: 'PUERTO RICO', 
      name: 'Madison Anderson', 
      flag: '🇵🇷', 
      image: 'https://pbs.twimg.com/profile_images/1831074397366394880/Lk-t2v72_400x400.jpg',
      gradient: 'from-[#ED1C24]/80 via-[#0038A8]/40 to-transparent'
    },
  ].sort((a, b) => a.country.localeCompare(b.country));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeTab === 'inicio') {
      const timer = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % candidates.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activeTab, candidates.length]);

  const contests: Contest[] = [
    {
      id: 'ms-2026',
      name: "1st MISS SUPRANATIONAL",
      status: "Próximamente",
      image: "https://i.postimg.cc/fby2YBw9/78bae21b-6cb8-4612-ae5b-5a22edc4fe83.jpg",
      description: "El certamen de belleza más aspiracional del mundo regresa. Mantente atento para la revelación de las candidatas."
    },
    {
      id: 'msv-2026',
      name: "MISS SLAM VIRTUAL",
      status: "Inscripciones Abiertas",
      image: "https://picsum.photos/seed/virtual/1200/800",
      description: "La competencia virtual que redefine los estándares. Únete a la experiencia digital más grande del año."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-apple-accent selection:text-white overflow-x-hidden">
      {/* Dynamic Island / Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-4 px-4`}
      >
        <div className={`
          ${scrolled ? 'w-full max-w-md h-12 rounded-full' : 'w-full max-w-7xl h-16 rounded-2xl'}
          glass flex items-center justify-between px-6 transition-all duration-500 ease-in-out
        `}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-apple-accent to-purple-500 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="font-bold tracking-tighter text-base md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate">
              SPACETRAMOYAX
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'concursos', label: 'Concursos' },
              { id: 'candidatas', label: 'Candidatas' },
              { id: 'puntajes', label: 'Puntajes Miss Supra' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === tab.id ? 'text-apple-accent' : 'text-gray-400 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 max-w-7xl mx-auto"
            >
              {/* Divine Hero Section - Portrait Carousel */}
              <section className="relative h-[80vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 group bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={candidates[currentHeroIndex].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={candidates[currentHeroIndex].image} 
                      alt={candidates[currentHeroIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${candidates[currentHeroIndex].gradient}`} />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 text-center md:text-left">
                  <motion.div
                    key={`content-${candidates[currentHeroIndex].id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col items-center md:items-start"
                  >
                    <div className="mb-6">
                      <p className="text-apple-accent font-black tracking-[0.3em] text-[10px] md:text-xs uppercase mb-2">
                        Miss Supranational
                      </p>
                      <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
                        <motion.span
                          key={`country-${candidates[currentHeroIndex].id}`}
                          initial={{ backgroundPosition: '100% 0' }}
                          animate={{ backgroundPosition: '-100% 0' }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          className="bg-clip-text text-transparent bg-gradient-to-r from-white via-black to-white bg-[length:200%_100%] inline-block"
                        >
                          {candidates[currentHeroIndex].country}
                        </motion.span>
                        <br />
                        <span className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 not-italic block mt-2 md:mt-4">
                          {candidates[currentHeroIndex].name}
                        </span>
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-white/30" />
                      <p className="text-white/60 text-xs md:text-sm font-medium tracking-widest uppercase">
                        ROAD TO 1st Miss Supranational 2026
                      </p>
                      <div className="h-[1px] w-12 bg-white/30" />
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex gap-2 mt-10">
                      {candidates.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-500 ${idx === currentHeroIndex ? 'w-8 bg-apple-accent' : 'w-2 bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Side Navigation Hints */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
                  <div className="glass w-12 h-12 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all cursor-pointer">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </section>

              {/* Featured Contest Widget - iPhone Style */}
              <section className="mb-12">
                <div className="flex items-center justify-center md:justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">Destacado</h2>
                </div>
                <div 
                  onClick={() => setActiveTab('concursos')}
                  className="relative aspect-[4/5] md:aspect-[21/9] rounded-[2rem] overflow-hidden cursor-pointer group iphone-shadow"
                >
                  <img 
                    src="https://i.postimg.cc/fby2YBw9/78bae21b-6cb8-4612-ae5b-5a22edc4fe83.jpg" 
                    alt="Miss Supranational Logo"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-end md:items-center p-6 md:p-16 text-center md:text-left">
                    <div className="max-w-md w-full flex flex-col items-center md:items-start">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-yellow-500">Evento Premium</span>
                      </div>
                      <h3 className="text-2xl md:text-5xl font-black tracking-tighter mb-3 italic text-white leading-none">
                        1st <br /> MISS SUPRANATIONAL
                      </h3>
                      <p className="text-gray-300 text-xs md:text-base mb-4 line-clamp-2 md:line-clamp-none">
                        Toda la cobertura exclusiva del certamen más aspiracional. Candidatas, predicciones y resultados en tiempo real.
                      </p>
                      <span className="inline-flex items-center gap-2 text-apple-accent font-bold text-xs">
                        Ver detalles <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Categories */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {[
                  { icon: Globe, label: 'Internacional', color: 'bg-blue-500' },
                  { icon: Star, label: 'Favoritas', color: 'bg-yellow-500' },
                  { icon: Trophy, label: 'Ganadoras', color: 'bg-purple-500' },
                  { icon: Search, label: 'Buscador', color: 'bg-emerald-500', action: () => setIsSearchOpen(true) },
                ].map((cat, i) => (
                  <div 
                    key={i} 
                    onClick={cat.action}
                    className="glass p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-white/15 transition-all cursor-pointer group"
                  >
                    <div className={`${cat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-sm text-gray-300">{cat.label}</span>
                  </div>
                ))}
              </section>
            </motion.div>
          )}

          {activeTab === 'concursos' && (
            <motion.div
              key="concursos"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="px-4 max-w-7xl mx-auto"
            >
              <div className="mb-8 md:mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Concursos</h1>
                <p className="text-gray-400 text-base md:text-xl font-light">Sigue de cerca las coronas más importantes del mundo.</p>
              </div>

              <div className="space-y-6 md:space-y-12">
                {contests.map((contest) => (
                  <div key={contest.id} className="relative rounded-[2.5rem] overflow-hidden h-[450px] md:h-[600px] group iphone-shadow">
                    <img 
                      src={contest.image} 
                      alt={contest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black mb-3">
                        {contest.status.toUpperCase()}
                      </span>
                      <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-4 italic leading-none">
                        {contest.name}
                      </h2>
                      <p className="text-white/80 text-sm md:text-xl max-w-2xl mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                        {contest.description}
                      </p>
                      <button className="glass px-8 py-3 md:px-10 md:py-4 rounded-full font-bold hover:bg-white/20 transition-all text-sm md:text-base">
                        Ver Candidatas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'candidatas' && (
            <motion.div
              key="candidatas"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="px-4 max-w-7xl mx-auto"
            >
              <div className="mb-8 md:mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Candidatas</h1>
                <p className="text-gray-400 text-base md:text-xl font-light">1st Miss Supranational</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden mb-4 iphone-shadow">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                      <img 
                        src={candidate.image} 
                        alt={candidate.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{candidate.flag}</span>
                          <span className="text-[10px] font-black tracking-widest text-white/90 uppercase truncate">
                            {candidate.country}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {candidate.name}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <div className="glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 glass p-8 rounded-[2.5rem] text-center">
                <p className="text-gray-400 italic">Las fotos oficiales estarán disponibles próximamente.</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'puntajes' && (
            <motion.div
              key="puntajes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 max-w-7xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-8 iphone-shadow animate-float">
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Puntajes Miss Supra</h1>
              <p className="text-gray-500 text-xl font-light mb-8">Tabla de posiciones en tiempo real.</p>
              
              <div className="glass px-8 py-4 rounded-2xl flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono tracking-widest text-gray-300 uppercase">Esperando Inicio del Certamen</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* iPhone Style Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div className="glass rounded-full h-16 flex items-center justify-around px-2 shadow-2xl border-white/20">
          {[
            { id: 'inicio', icon: Home },
            { id: 'concursos', icon: Trophy },
            { id: 'candidatas', icon: Users },
            { id: 'puntajes', icon: BarChart3 }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-full transition-all ${activeTab === item.id ? 'bg-white text-black scale-110 shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-6 md:p-20 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4 flex-1">
                  <Search className="w-8 h-8 text-apple-accent" />
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Busca..."
                    className="bg-transparent border-none text-2xl md:text-5xl font-bold w-full outline-none placeholder:text-white/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-4 hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {searchQuery.length > 0 && (
                <div className="space-y-12">
                  {/* Candidates Results */}
                  {candidates.filter(c => 
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    c.country.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Candidatas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {candidates.filter(c => 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.country.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map(c => (
                          <div 
                            key={c.id} 
                            onClick={() => {
                              setActiveTab('candidatas');
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="glass p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-all"
                          >
                            <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3">
                              <img src={c.image} className="w-full h-full object-cover" alt={c.name} />
                            </div>
                            <p className="text-[10px] font-bold text-apple-accent uppercase">{c.country}</p>
                            <p className="font-bold truncate">{c.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contests Results */}
                  {contests.filter(c => 
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    c.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Concursos</h3>
                      <div className="space-y-4">
                        {contests.filter(c => 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map(c => (
                          <div 
                            key={c.id}
                            onClick={() => {
                              setActiveTab('concursos');
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="glass p-6 rounded-3xl cursor-pointer hover:bg-white/10 transition-all flex items-center gap-6"
                          >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                              <img src={c.image} className="w-full h-full object-cover" alt={c.name} />
                            </div>
                            <div>
                              <p className="font-bold text-xl">{c.name}</p>
                              <p className="text-gray-500 text-sm line-clamp-1">{c.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchQuery.length > 0 && 
                   candidates.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.country.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                   contests.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-gray-500 text-xl">No se encontraron resultados para "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-20 px-4 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-apple-accent to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="font-bold tracking-tighter text-2xl">SPACETRAMOYAX</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              La fuente #1 de noticias sobre concursos de belleza, moda y el mundo del espectáculo. 
              Diseñado para los verdaderos amantes de la corona.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6">Navegación</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li onClick={() => setActiveTab('inicio')} className="hover:text-white cursor-pointer transition-colors">Inicio</li>
              <li onClick={() => setActiveTab('concursos')} className="hover:text-white cursor-pointer transition-colors">Concursos</li>
              <li onClick={() => setActiveTab('candidatas')} className="hover:text-white cursor-pointer transition-colors">Candidatas</li>
              <li onClick={() => setActiveTab('puntajes')} className="hover:text-white cursor-pointer transition-colors">Puntajes</li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacidad</li>
              <li className="hover:text-white cursor-pointer transition-colors">Términos</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © 2026 SPACETRAMOYAX. Inspirado por la excelencia.
        </div>
      </footer>
    </div>
  );
}
