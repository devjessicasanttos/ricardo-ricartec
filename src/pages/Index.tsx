import * as React from "react";
import { 
  Flame, Wrench, Search, Thermometer, Tv, Hammer, 
  ShieldCheck, MessageCircle, Phone, ChevronRight, 
  ChevronLeft 
} from "lucide-react";

// --- CONFIGURAÇÃO DE CORES (MODERNO & TÉCNICO) ---
const colors = {
  primary: "#001B3D",    // Azul Marinho (Confiança)
  accent: "#00AEEF",     // Azul Ciano (Identidade/Tecnologia)
  urgency: "#E31E24",    // Vermelho (Segurança/Gás)
  lightBg: "#F8FAFC",    // Fundo Light (Limpeza)
  white: "#FFFFFF"
};

const NUMERO_GAS = "5511954824214"; 
const NUMERO_REPAROS = "5511948550725"; 
const LINK_GAS = `https://wa.me/${NUMERO_GAS}?text=Olá! Gostaria de um orçamento para serviços de Gás.`;
const LINK_REPAROS = `https://wa.me/${NUMERO_REPAROS}?text=Olá! Gostaria de um orçamento para Reparos e Manutenção.`;

const services = [
  { 
    icon: Flame, 
    title: "Instalação de Gás", 
    desc: "Instalação técnica de fogão, aquecedores e redes de gás com teste de estanqueidade.", 
    images: ["/fogao1.jpeg", "/fogao2.jpeg","/fogao3.jpeg", "/fogao4.jpeg","/fogao5.jpeg","/fogao6.jpeg","/fogao7.jpeg","/inst.jpeg", "/inst2.jpeg"], 
    isGas: true 
  },
  { 
    icon: Search, 
    title: "Detecção de Vazamento", 
    desc: "Localização precisa de vazamentos com equipamentos de ultrassom e reparo imediato.", 
    images: ["/vazamento1.jpeg","/vazamento2.jpeg","/vazamento3.jpeg","/vazamento4.jpeg", "/vazamento5.jpeg", "/videovazamento.mp4"],
    isGas: true 
  },
  { 
    icon: Thermometer, 
    title: "Conversão para Gás", 
    desc: "Adaptação de equipamentos para Gás Natural (GN) ou GLP com total segurança.", 
    images: ["/conversao1.jpeg", "/conversao2.jpeg","/conversao3.jpeg","/conversao4.jpeg","/conversao5.jpeg"],
    isGas: true 
  },
  { 
    icon: Tv, 
    title: "Suportes e TVs", 
    desc: "Fixação técnica em qualquer superfície com alinhamento a laser e acabamento premium.", 
    images: ["/tv1.jpeg", "/tv2.jpeg","/tv3.jpeg","/tv4.jpeg","/tv5.jpeg","/tv6.jpeg"],
    isGas: false 
  },
  { 
    icon: Hammer, 
    title: "Reparos Gerais", 
    desc: "Manutenção completa de itens domésticos: cortinas, luminárias e reparos hidráulicos.", 
    images: ["/reparo2.jpeg", "/reparo1.jpeg","/reparo3.jpeg","/reparo4.jpeg","/reparo5.jpeg","/reparo6.jpeg","/reparo7.jpeg"],
    isGas: false 
  },
  { 
    icon: Wrench, 
    title: "Manutenção Técnica", 
    desc: "Laudos técnicos e revisões preventivas para condomínios e residências.", 
    images: ["/tecnico.jpeg", "/tecnico2.jpeg","/tecnico3.jpeg","/tecnico4.jpeg","/tecnico5.jpeg","/tecnico6.jpeg"],
    isGas: false 
  },
];

const ServiceCard = ({ service }: { service: any }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const currentFile = service.images[currentImage];
  const isVideo = currentFile?.toLowerCase().endsWith(".mp4");

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        {isVideo ? (
          <video key={currentFile} src={currentFile} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img 
            src={currentFile} 
            alt={service.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
           onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/logo.png"; }}
          />
        )}
        
        {service.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevImage} className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#00AEEF]"><ChevronLeft size={20} /></button>
            <button onClick={nextImage} className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#00AEEF]"><ChevronRight size={20} /></button>
          </div>
        )}

        <div className="absolute top-4 left-4 p-2.5 rounded-lg text-white shadow-lg backdrop-blur-md" style={{ backgroundColor: service.isGas ? `${colors.urgency}CC` : `${colors.primary}CC` }}>
          <service.icon className="h-5 w-5" />
        </div>
      </div>

      <div className="p-7 text-left flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-['Sora'] text-xl font-extrabold mb-2 uppercase tracking-tight" style={{ color: colors.primary }}>
            {service.title}
          </h3>
          <p className="font-['Inter'] text-slate-500 text-sm leading-relaxed mb-6 font-medium italic">
            {service.desc}
          </p>
        </div>
        <a 
          href={service.isGas ? LINK_GAS : LINK_REPAROS} 
          className="font-['Sora'] font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all"
          style={{ color: service.isGas ? colors.urgency : colors.accent }}
        >
          Solicitar Orçamento <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen font-['Inter'] antialiased" style={{ backgroundColor: colors.lightBg }}>
      
      {/* Botão Flutuante Gás */}
      <a href={LINK_GAS} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full px-7 py-4 text-white font-['Sora'] font-extrabold shadow-2xl hover:scale-105 transition-all uppercase text-xs tracking-widest" style={{ backgroundColor: colors.urgency }}>
        <MessageCircle className="h-5 w-5 fill-current" />
        <span>Urgência Gás</span>
      </a>

      {/* Header */}
      <header className="border-b border-slate-100 backdrop-blur-xl sticky top-0 z-40 bg-white/80">
        <div className="container flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="RICARTEC" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block text-left">
              <span className="font-['Sora'] text-xl font-extrabold tracking-tighter block uppercase leading-none" style={{ color: colors.primary }}>RICARTEC</span>
              <span className="font-['Inter'] text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: colors.accent }}>Assistência Técnica</span>
            </div>
          </div>
          <a href={LINK_GAS} className="font-['Sora'] rounded-full px-6 py-2.5 text-[11px] font-extrabold text-white hover:opacity-90 transition-all flex items-center gap-2 shadow-md uppercase tracking-wider" style={{ backgroundColor: colors.primary }}>
            <Phone size={14} /> Orçamento Grátis
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="container px-6 relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase mb-8 tracking-[0.15em]" style={{ backgroundColor: `${colors.accent}10`, color: colors.accent }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.accent }}></div>
              Qualidade & Segurança Certificada
            </div>
            <h1 className="font-['Sora'] text-5xl md:text-[5rem] font-extrabold tracking-[-0.04em] leading-[0.95] mb-8" style={{ color: colors.primary }}>
              Sua casa em <br /> <span className="text-slate-200">Boas Mãos.</span>
            </h1>
            <p className="font-['Inter'] text-lg text-slate-500 mb-12 max-w-md leading-relaxed font-medium">
              Especialistas em <span className="font-bold border-b-2" style={{ borderColor: colors.urgency, color: colors.urgency }}>Sistemas de Gás</span> e manutenção técnica residencial de alto padrão.
            </p>
            <div className="flex flex-wrap gap-5 font-['Sora']">
              <a href={LINK_GAS} className="text-white px-10 py-5 rounded-full font-extrabold text-sm hover:-translate-y-1 transition-all shadow-xl uppercase tracking-widest" style={{ backgroundColor: colors.urgency }}>Setor de Gás</a>
              <a href="#servicos" className="px-10 py-5 rounded-full font-extrabold text-sm hover:bg-slate-50 transition-all uppercase tracking-widest border border-slate-200" style={{ color: colors.primary }}>Nossos Serviços</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-20 opacity-20 rounded-full blur-[120px]" style={{ backgroundColor: colors.accent }}></div>
            <img src="/logo.png" className="relative w-full max-w-sm mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" alt="Ricartec Logo" />
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-28">
        <div className="container px-6">
          <div className="text-center mb-20">
            <h2 className="font-['Sora'] text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter" style={{ color: colors.primary }}>Serviços</h2>
            <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="container px-6 text-center relative z-10">
          <h2 className="font-['Sora'] text-5xl md:text-7xl font-extrabold mb-16 tracking-tighter uppercase leading-none">
            Suporte <br/> <span style={{ color: colors.accent }}>Técnico Imediato.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
            <a href={LINK_GAS} className="p-12 rounded-[2rem] hover:scale-[1.02] transition-all shadow-2xl flex flex-col items-center group relative overflow-hidden" style={{ backgroundColor: colors.urgency }}>
              <Flame size={48} className="mb-6 group-hover:scale-110 transition-transform" />
              <p className="font-['Sora'] text-2xl font-extrabold uppercase tracking-tighter">Emergência Gás</p>
              <span className="mt-2 font-['Inter'] font-bold text-[10px] uppercase tracking-[0.2em] opacity-80">Plantão 24 horas</span>
            </a>
            <a href={LINK_REPAROS} className="bg-slate-800/40 border border-slate-700 p-12 rounded-[2rem] hover:bg-white hover:text-[#001B3D] transition-all flex flex-col items-center group">
              <Hammer size={48} className="mb-6 group-hover:scale-110 transition-transform" />
              <p className="font-['Sora'] text-2xl font-extrabold uppercase tracking-tighter">Reparos Gerais</p>
              <span className="mt-2 font-['Inter'] font-bold text-[10px] uppercase tracking-[0.2em] opacity-60">Assistência Qualificada</span>
            </a>
          </div>
          <div className="flex flex-col items-center gap-6">
            <img src="/logo.png" className="h-10 grayscale opacity-20" alt="Ricartec" />
            <p className="font-['Inter'] text-[9px] font-bold uppercase tracking-[0.5em] opacity-30">© {new Date().getFullYear()} RICARTEC ASSISTÊNCIA TÉCNICA</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;