import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Video, 
  BookOpen, 
  X, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  Play, 
  Download, 
  Layers,
  ChevronRight
} from 'lucide-react';

// --- DATOS DEL PORTAFOLIO ---
const portfolioData = [
  // --- VIDEO (4 Items) ---
  {
    id: 1,
    title: "Campaña Nike 'Just Do It'",
    category: "video",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800",
    description: "Edición y post-producción para campaña publicitaria de ropa deportiva. Enfoque en transiciones dinámicas.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    tags: ["Premiere Pro", "After Effects"]
  },
  {
    id: 2,
    title: "Capítulo 1: Melissa",
    category: "video",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    description: "Producción audiovisual artística 'Medussa'. Estética cinemática con énfasis en dirección de arte y color.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    tags: ["Art Direction", "Color Grading"]
  },
  {
    id: 3,
    title: "Documental 'Voces Urbanas'",
    category: "video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
    description: "Dirección de fotografía y montaje para cortometraje documental sobre artistas callejeros.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["DaVinci Resolve", "Storytelling"]
  },
  {
    id: 4,
    title: "Festival de Música 2024",
    category: "video",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    description: "Cobertura completa de evento musical, aftermovie y clips para redes sociales.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Event Coverage", "Fast Editing"]
  },

  // --- BRANDING (4 Items) ---
  {
    id: 5,
    title: "EcoTech Identity",
    category: "branding",
    image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800",
    description: "Identidad corporativa para startup de energía renovable. Papelería y logotipo.",
    link: "#", 
    tags: ["Illustrator", "Identity"]
  },
  {
    id: 6,
    title: "Restaurante Sol",
    category: "branding",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    description: "Rediseño de logotipo y menú para cadena de restaurantes mediterráneos.",
    link: "#",
    tags: ["Print", "Typography"]
  },
  {
    id: 7,
    title: "Minimalist Coffee",
    category: "branding",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    description: "Creación de marca para cafetería de especialidad. Packaging y diseño de interiores.",
    link: "#",
    tags: ["Packaging", "Brand Strategy"]
  },
  {
    id: 8,
    title: "Nexus Tech",
    category: "branding",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description: "Manual de marca completo para empresa de ciberseguridad.",
    link: "#",
    tags: ["Corporate", "Tech"]
  },

  // --- WEB (4 Items: 3 Listas, 1 En Proceso) ---
  {
    id: 9,
    title: "E-commerce Moda",
    category: "web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Tienda online minimalista con pasarela de pagos integrada.",
    link: "https://example.com",
    tags: [] // Sin etiquetas extrañas
  },
  {
    id: 10,
    title: "App Finanzas",
    category: "web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description: "Dashboard interactivo para gestión de gastos personales.",
    link: "https://example.com",
    tags: []
  },
  {
    id: 11,
    title: "Landing Page Corporativa",
    category: "web",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800",
    description: "Sitio web corporativo de alto impacto para consultora de negocios.",
    link: "https://example.com",
    tags: []
  },
  {
    id: 12,
    title: "BigData Project (en proceso)",
    category: "web",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    description: "Desarrollo actual de plataforma de análisis de datos e IA.",
    link: "https://github.com", // Link a GitHub
    tags: ["En Desarrollo", "GitHub"]
  }
];

// --- COLORES & ESTILOS PERSONALIZADOS ---
// Neon Green: #ccff00 (Usaremos lime-400/accent custom)

const NavLink = ({ href, children, mobile = false, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`
      text-gray-400 hover:text-[#ccff00] transition-colors duration-300 font-bold tracking-wide uppercase text-sm
      ${mobile ? 'block py-2 text-lg' : ''}
    `}
  >
    {children}
  </a>
);

const FilterButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-2 rounded-none transition-all duration-300 border-2 uppercase font-bold tracking-wider text-sm whitespace-nowrap
      ${active 
        ? 'bg-[#ccff00] border-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
        : 'bg-transparent border-gray-800 text-gray-500 hover:border-[#ccff00] hover:text-[#ccff00]'}
    `}
  >
    {Icon && <Icon size={16} />}
    {children}
  </button>
);

const ProjectCard = ({ item, onClick }) => {
  const getIcon = () => {
    switch(item.category) {
      case 'video': return <Video size={20} />;
      case 'web': return <Monitor size={20} />;
      case 'branding': return <BookOpen size={20} />;
      default: return <Layers size={20} />;
    }
  };

  return (
    <div 
      className="group relative bg-black rounded-sm overflow-hidden border border-gray-900 hover:border-[#ccff00] transition-all duration-300 cursor-pointer"
      onClick={() => onClick(item)}
    >
      {/* Imagen Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10" />
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-2 text-[#ccff00] border border-[#ccff00]/30 z-20">
          {getIcon()}
        </div>
      </div>

      {/* Contenido Card */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-black uppercase text-white mb-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 font-medium">
          {item.description}
        </p>
        
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-900 text-gray-400 border border-gray-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-black w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black hover:bg-[#ccff00] hover:text-black border border-gray-800 text-white transition-colors z-50 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Media Section */}
          <div className="bg-gray-900 min-h-[300px] md:h-full flex items-center justify-center relative border-r border-gray-800">
            {project.category === 'video' ? (
               <div className="w-full aspect-video">
                 <iframe 
                   className="w-full h-full"
                   src={project.videoUrl} 
                   title={project.title}
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
            ) : (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Info Section */}
          <div className="p-10 flex flex-col justify-center bg-black">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 border border-[#ccff00] text-[#ccff00] text-xs font-bold uppercase tracking-widest">
                {project.category}
              </span>
            </div>

            <h2 className="text-4xl font-black text-white mb-6 uppercase leading-none">{project.title}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              {project.description}
            </p>

            <div className="mb-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-900 border border-gray-800 text-sm text-gray-300 uppercase font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              {project.category === 'web' && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-8 py-4 font-black uppercase tracking-wider transition-colors w-full justify-center"
                >
                   {project.title.includes('proceso') ? <Github size={20} /> : <ExternalLink size={20} />}
                   {project.title.includes('proceso') ? 'Ver en GitHub' : 'Visitar Sitio'}
                </a>
              )}
              {project.category === 'branding' && (
                <a 
                  href="#" 
                  className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-8 py-4 font-black uppercase tracking-wider transition-colors w-full justify-center"
                >
                  <Download size={20} /> Ver Manual PDF
                </a>
              )}
               {project.category === 'video' && (
                <a 
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-8 py-4 font-black uppercase tracking-wider transition-colors w-full justify-center"
                >
                  <Play size={20} /> Ver en YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-900 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 italic">
            <span className="text-[#ccff00]">BIG</span>DATIA
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#home">Inicio</NavLink>
            <NavLink href="#portfolio">Proyectos</NavLink>
            <NavLink href="#about">Servicios</NavLink>
            <a href="#contact" className="border-2 border-[#ccff00] text-[#ccff00] px-6 py-2 font-bold uppercase tracking-wider hover:bg-[#ccff00] hover:text-black transition-all">
              Hablemos
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-gray-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
            <NavLink mobile href="#home" onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
            <NavLink mobile href="#portfolio" onClick={() => setIsMenuOpen(false)}>Proyectos</NavLink>
            <NavLink mobile href="#about" onClick={() => setIsMenuOpen(false)}>Servicios</NavLink>
            <NavLink mobile href="#contact" onClick={() => setIsMenuOpen(false)}>Hablemos</NavLink>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex items-center justify-center min-h-[80vh]">
        
        {/* Abstract Geometry Background */}
        <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#ccff00] rounded-full blur-[100px]" />
             <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ccff00] rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6 uppercase tracking-tighter">
            Lleva tu empresa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ccff00] to-[#aacc00]">
              A OTRO NIVEL
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium">
            Transformación digital, producción audiovisual de alto impacto e identidades de marca que rompen el molde.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="#portfolio" className="bg-[#ccff00] text-black px-10 py-4 font-black text-lg uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2">
              Ver Portafolio <ChevronRight size={20} strokeWidth={3} />
            </a>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-24 px-6 bg-black border-t border-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="flex flex-col items-start">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight text-white">
                NUESTROS <br />
                TRABAJOS
              </h2>
              <div className="h-2 w-24 bg-[#ccff00] mt-4"></div>
            </div>
            
            {/* Filters - FORCED SINGLE LINE */}
            <div className="flex flex-nowrap gap-0 overflow-x-auto max-w-full no-scrollbar">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                Todos
              </FilterButton>
              <FilterButton icon={Video} active={filter === 'video'} onClick={() => setFilter('video')}>
                Video
              </FilterButton>
              <FilterButton icon={BookOpen} active={filter === 'branding'} onClick={() => setFilter('branding')}>
                Branding
              </FilterButton>
              {/* Web al final como solicitaste */}
              <FilterButton icon={Monitor} active={filter === 'web'} onClick={() => setFilter('web')}>
                Web
              </FilterButton>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                item={project} 
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES / ABOUT --- */}
      <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 flex items-center justify-center gap-4">
                <span className="text-[#ccff00]">BigdatIA</span> Tecnológico
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Soluciones integrales para la era digital.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8 border border-gray-800 hover:border-[#ccff00] transition-colors group">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <Monitor size={32} />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Desarrollo Web</h3>
                <p className="text-gray-500 text-sm">
                  Asesoría tecnológica y desarrollo de soluciones personalizadas para transformación digital.
                </p>
              </div>

              <div className="p-8 border border-gray-800 hover:border-[#ccff00] transition-colors group">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <Video size={32} />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Producción Audiovisual</h3>
                <p className="text-gray-500 text-sm">
                  Creación de contenido visual dinámico, edición profesional y dirección de arte.
                </p>
              </div>

              <div className="p-8 border border-gray-800 hover:border-[#ccff00] transition-colors group">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Branding & IA</h3>
                <p className="text-gray-500 text-sm">
                  Optimización de procesos con automatización e inteligencia artificial.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- CONTACT FOOTER --- */}
      <footer id="contact" className="py-20 px-6 bg-black border-t border-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black mb-8 uppercase text-white">¿Hablamos?</h2>
          <p className="text-gray-400 mb-10 text-xl">
            Lleva tu proyecto al siguiente nivel con nosotros.
          </p>
          
          <a href="mailto:contacto@bigdatia.com" className="inline-flex items-center gap-3 border-2 border-white hover:bg-[#ccff00] hover:border-[#ccff00] hover:text-black text-white px-10 py-4 font-black text-lg uppercase tracking-wider transition-all mb-12">
            <Mail size={24} /> Contactar
          </a>

          <div className="flex justify-center gap-8 mb-12">
            <a href="#" className="text-gray-500 hover:text-[#ccff00] transition-colors"><Linkedin size={28} /></a>
            <a href="#" className="text-gray-500 hover:text-[#ccff00] transition-colors"><Github size={28} /></a>
            <a href="#" className="text-gray-500 hover:text-[#ccff00] transition-colors"><ExternalLink size={28} /></a>
          </div>

          <div className="text-gray-600 text-sm font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BigdatIA. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* MODAL OVERLAY */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}