import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Rocket,
    ChevronRight, ChevronLeft,
    LayoutTemplate, Building2, Code2, Bot, MessageSquare, ShoppingCart, Plug,
    Sparkles, TrendingUp, Cpu,
} from 'lucide-react';
import Logo from '../../components/ui/Logo';

/* ─── CAROUSEL DATA ─────────────────────────────────── */
const slides = [
    {
        id: 0,
        type: 'intro',
        tag: null,
        icon: null,
        headline: 'No solo desarrollamos.',
        subtitle: 'Construimos ecosistemas digitales que venden, automatizan y escalan negocios.',
        desc: null,
        bg: 'radial-gradient(ellipse at 60% 40%, #7c3aed18 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #06b6d415 0%, transparent 60%)',
        accentFrom: '#7c3aed',
        accentTo: '#06b6d4',
        glowColor: 'rgba(124,58,237,0.22)',
    },
    {
        id: 1,
        tag: '01',
        icon: <LayoutTemplate className="w-12 h-12" />,
        headline: 'Captación Inteligente',
        subtitle: 'Landing Pages optimizadas para conversión.',
        desc: 'Velocidad, copy persuasivo y estructura diseñada para maximizar ROI.',
        bg: 'radial-gradient(ellipse at 70% 30%, #0ea5e918 0%, transparent 65%), radial-gradient(ellipse at 10% 90%, #38bdf810 0%, transparent 55%)',
        accentFrom: '#0ea5e9',
        accentTo: '#38bdf8',
        glowColor: 'rgba(14,165,233,0.28)',
    },
    {
        id: 2,
        tag: '02',
        icon: <Building2 className="w-12 h-12" />,
        headline: 'Presencia Corporativa de Alto Nivel',
        subtitle: 'Sitios web estratégicos que fortalecen su marca y generan confianza real.',
        desc: 'Diseño, SEO y gestión profesional.',
        bg: 'radial-gradient(ellipse at 30% 30%, #a855f718 0%, transparent 60%), radial-gradient(ellipse at 80% 75%, #ec489910 0%, transparent 55%)',
        accentFrom: '#a855f7',
        accentTo: '#ec4899',
        glowColor: 'rgba(168,85,247,0.28)',
    },
    {
        id: 3,
        tag: '03',
        icon: <Code2 className="w-12 h-12" />,
        headline: 'Sistemas que Transforman Operaciones',
        subtitle: 'Software a la medida con dashboards, roles y seguridad avanzada.',
        desc: 'Menos errores. Más control. Más rentabilidad.',
        bg: 'radial-gradient(ellipse at 60% 50%, #14b8a618 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, #06b6d412 0%, transparent 55%)',
        accentFrom: '#14b8a6',
        accentTo: '#06b6d4',
        glowColor: 'rgba(20,184,166,0.28)',
    },
    {
        id: 4,
        tag: '04',
        icon: <Bot className="w-12 h-12" />,
        headline: 'Automatización con Inteligencia Artificial',
        subtitle: 'Agentes autónomos que clasifican, analizan y ejecutan tareas complejas.',
        desc: 'Su equipo enfocado en lo estratégico, no en lo repetitivo.',
        bg: 'radial-gradient(ellipse at 50% 40%, #f59e0b18 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #fb923c10 0%, transparent 55%)',
        accentFrom: '#f59e0b',
        accentTo: '#fb923c',
        glowColor: 'rgba(245,158,11,0.28)',
    },
    {
        id: 5,
        tag: '05',
        icon: <MessageSquare className="w-12 h-12" />,
        headline: 'Atención y Ventas Automatizadas',
        subtitle: 'Chatbots para WhatsApp, web y redes con integración CRM y pagos.',
        desc: 'Clientes atendidos 24/7 sin fricción.',
        bg: 'radial-gradient(ellipse at 40% 30%, #f4365618 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, #fb718510 0%, transparent 55%)',
        accentFrom: '#f43656',
        accentTo: '#fb7185',
        glowColor: 'rgba(244,54,86,0.28)',
    },
    {
        id: 6,
        tag: '06',
        icon: <ShoppingCart className="w-12 h-12" />,
        headline: 'Comercio Digital Escalable',
        subtitle: 'Tiendas online optimizadas con pagos integrados, inventario y logística sincronizada.',
        desc: 'Vende sin límites físicos.',
        bg: 'radial-gradient(ellipse at 65% 35%, #22c55e18 0%, transparent 60%), radial-gradient(ellipse at 15% 75%, #84cc1610 0%, transparent 55%)',
        accentFrom: '#22c55e',
        accentTo: '#84cc16',
        glowColor: 'rgba(34,197,94,0.28)',
    },
    {
        id: 7,
        tag: '07',
        icon: <Plug className="w-12 h-12" />,
        headline: 'Integración Total',
        subtitle: 'Conectamos CRM, ERP y herramientas digitales en un solo flujo automatizado.',
        desc: 'Información en tiempo real. Cero procesos manuales innecesarios.',
        bg: 'radial-gradient(ellipse at 55% 45%, #6366f118 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, #818cf812 0%, transparent 55%)',
        accentFrom: '#6366f1',
        accentTo: '#818cf8',
        glowColor: 'rgba(99,102,241,0.28)',
    },
];

/* ─── FLIP CARDS DATA ───────────────────────────────── */
const serviceCards = [
    {
        icon: <LayoutTemplate className="w-8 h-8" />,
        title: 'Landing Pages de Alto Rendimiento',
        front: 'Convierte visitantes en clientes 24/7.',
        back: 'Optimización, velocidad y copy persuasivo.',
    },
    {
        icon: <Building2 className="w-8 h-8" />,
        title: 'Sitios Web Corporativos',
        front: 'Presencia digital sólida y profesional.',
        back: 'Escalables, administrables y optimizados para SEO.',
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: 'Sistemas Web a la Medida',
        front: 'Automatiza procesos y reduce errores.',
        back: 'Software personalizado con seguridad avanzada.',
    },
    {
        icon: <Bot className="w-8 h-8" />,
        title: 'Automatizaciones con IA',
        front: 'Agentes inteligentes que trabajan por ti.',
        back: 'Clasifican, analizan y optimizan en automático.',
    },
    {
        icon: <MessageSquare className="w-8 h-8" />,
        title: 'Chatbots Inteligentes',
        front: 'Atención inmediata y ventas constantes.',
        back: 'WhatsApp, web y redes sociales integradas.',
    },
    {
        icon: <ShoppingCart className="w-8 h-8" />,
        title: 'Tiendas Online (E-commerce)',
        front: 'Vende sin límites geográficos.',
        back: 'Pagos integrados, inventario y envíos automatizados.',
    },
    {
        icon: <Plug className="w-8 h-8" />,
        title: 'Integraciones y Automatización Empresarial',
        front: 'Conecta tus herramientas y elimina tareas manuales.',
        back: 'Todo sincronizado en tiempo real.',
    },
];

const visionPillars = [
    { icon: <Sparkles className="w-8 h-8" />, label: 'Branding' },
    { icon: <Cpu className="w-8 h-8" />, label: 'Automatización' },
    { icon: <Bot className="w-8 h-8" />, label: 'IA' },
    { icon: <TrendingUp className="w-8 h-8" />, label: 'Ventas' },
];

/* ─── ANIMATION VARIANTS ────────────────────────────── */
const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] } }),
};

const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (i = 0) => ({ y: 0, opacity: 1, transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' } }),
};

/* ─── WARM NEON PALETTE ─────────────────────────────── */
const warmPalette = [
    ['#ff6b35', '#f7931e'],
    ['#ff4d6d', '#ff9a3c'],
    ['#ff6b6b', '#ffd93d'],
    ['#ff9a3c', '#ff6b35'],
    ['#ffd93d', '#ff4d6d'],
];

/* ─── FLIP CARD COMPONENT ───────────────────────────── */
const FlipCard = ({ card, index }) => {
    const [flipped, setFlipped] = useState(false);
    const [glowPhase, setGlowPhase] = useState(index % warmPalette.length);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlowPhase(prev => (prev + 1) % warmPalette.length);
        }, 2800 + index * 400);
        return () => clearInterval(interval);
    }, [index]);

    const [c1, c2] = warmPalette[glowPhase];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className="relative cursor-pointer"
            style={{ perspective: '1200px', height: '220px' }}
            onClick={() => setFlipped(f => !f)}
        >
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
            >
                {/* FRONT */}
                <div
                    className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%)',
                        border: `1px solid ${c1}40`,
                        boxShadow: `0 0 18px ${c1}25, inset 0 0 30px ${c1}08`,
                        transition: 'border-color 1.8s ease, box-shadow 1.8s ease',
                    }}
                >
                    <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full blur-[50px] pointer-events-none"
                        style={{ background: c1, opacity: 0.18, transition: 'background 1.8s ease' }} />
                    <div className="p-3 rounded-2xl inline-flex"
                        style={{ background: `${c1}20`, color: c1, transition: 'background 1.8s ease, color 1.8s ease' }}>
                        {card.icon}
                    </div>
                    <div>
                        <h3 className="font-black uppercase tracking-tight text-sm text-white leading-tight mb-2">{card.title}</h3>
                        <p className="text-xs font-medium" style={{ color: c1, transition: 'color 1.8s ease' }}>{card.front}</p>
                    </div>
                    <div className="absolute bottom-4 right-5 text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ color: c1 }}>
                        ✦ ver más
                    </div>
                </div>

                {/* BACK */}
                <div
                    className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: `linear-gradient(135deg, ${c1}22 0%, ${c2}18 100%)`,
                        border: `1px solid ${c2}60`,
                        boxShadow: `0 0 30px ${c2}35, inset 0 0 40px ${c1}12`,
                        transition: 'background 1.8s ease, border-color 1.8s ease, box-shadow 1.8s ease',
                    }}
                >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: `${c2}25`, color: c2, transition: 'background 1.8s ease, color 1.8s ease' }}>
                        {card.icon}
                    </div>
                    <p className="text-sm font-semibold text-white/90 leading-relaxed">{card.back}</p>
                    <div className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ color: c2 }}>✦ volver</div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── MAIN COMPONENT ─────────────────────────────────── */
const About = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index, dir = 1) => {
        setDirection(dir);
        setCurrent(index);
    }, []);

    const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, -1), [current, goTo]);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 8000); // slower: 8 seconds
        return () => clearInterval(t);
    }, [paused, next]);

    const slide = slides[current];
    const isIntro = slide.type === 'intro';

    return (
        <div className="min-h-screen pt-20 overflow-x-hidden">

            {/* 1 ─── HERO ───────────────────────────────── */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="container mx-auto relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Engineered for Growth</span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter uppercase italic">
                            Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-highlight to-accent">Power</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* 2 ─── QUIÉNES SOMOS ─────────────────────── */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
                                ¿Quiénes <br /><span className="text-highlight">Somos?</span>
                            </h2>
                            <p className="text-xl text-softWhite/70 leading-relaxed mb-8">
                                <strong className="text-white">Groob Code Technology</strong> es una firma de desarrollo tecnológico especializada en soluciones digitales estratégicas para empresas que buscan crecer, automatizar y posicionarse con autoridad en el entorno digital.
                            </p>
                            <p className="text-lg text-softWhite/50 mb-12">
                                No solo construimos sitios web. Diseñamos sistemas, procesos y experiencias que convierten tecnología en ventaja competitiva.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {['Escalabilidad', 'Rendimiento', 'Seguridad', 'Automatización'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-highlight/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="relative z-10 w-full h-full flex items-center justify-center p-12 border border-white/5 bg-darkCharcoal/40 backdrop-blur-3xl rounded-[40px] shadow-2xl">
                                <div className="text-center">
                                    <Logo className="w-24 h-24 mx-auto mb-6" />
                                    <div className="text-4xl font-black uppercase text-white tracking-widest leading-none">Groob<br />Code</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3 ─── FULL SCREEN CAROUSEL ──────────────── */}
            <section
                className="relative overflow-hidden"
                style={{ height: '100svh', minHeight: '600px' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Background */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`bg-${current}`}
                        custom={direction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.9 } }}
                        exit={{ opacity: 0, transition: { duration: 0.45 } }}
                        className="absolute inset-0 bg-[#050505]"
                        style={{ background: slide.bg }}
                    >
                        {slide.tag && (
                            <div
                                className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
                                style={{ fontSize: 'clamp(200px, 30vw, 400px)', color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.05em' }}
                            >
                                {slide.tag}
                            </div>
                        )}
                        <div
                            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
                            style={{ background: slide.glowColor, opacity: 0.55 }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Counter */}
                <div className="absolute top-8 right-8 z-20 font-black text-sm tracking-widest text-white/30">
                    <span className="text-white/70">{String(current + 1).padStart(2, '0')}</span>
                    <span> / {String(slides.length).padStart(2, '0')}</span>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`content-${current}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                    >
                        {isIntro ? (
                            <div className="max-w-4xl mx-auto">
                                <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-softWhite/60">Groob Code Technology</span>
                                </motion.div>
                                <motion.h2 variants={fadeUp} custom={1} initial="hidden" animate="visible"
                                    className="font-black uppercase tracking-tighter italic leading-[0.9] mb-8"
                                    style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                        No solo <br />desarrollamos.
                                    </span>
                                </motion.h2>
                                <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
                                    className="text-xl md:text-2xl text-softWhite/60 leading-relaxed max-w-2xl mx-auto font-light">
                                    Construimos ecosistemas digitales que{' '}
                                    <span className="text-transparent bg-clip-text font-semibold"
                                        style={{ backgroundImage: `linear-gradient(to right, ${slide.accentFrom}, ${slide.accentTo})` }}>
                                        venden, automatizan y escalan
                                    </span>{' '}negocios.
                                </motion.p>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto">
                                <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
                                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 text-white"
                                    style={{ background: `linear-gradient(135deg, ${slide.accentFrom}22, ${slide.accentTo}33)`, border: `1px solid ${slide.accentFrom}40` }}>
                                    {slide.icon}
                                </motion.div>
                                <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible"
                                    className="text-xs font-black tracking-[0.5em] uppercase mb-4"
                                    style={{ color: slide.accentFrom }}>
                                    Servicio {slide.tag}
                                </motion.div>
                                <motion.h2 variants={fadeUp} custom={2} initial="hidden" animate="visible"
                                    className="font-black uppercase tracking-tighter italic leading-tight mb-5"
                                    style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', backgroundImage: 'linear-gradient(to right, #fff, #ffffff99)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {slide.headline}
                                </motion.h2>
                                <motion.p variants={fadeUp} custom={3} initial="hidden" animate="visible"
                                    className="text-lg md:text-xl font-semibold mb-4"
                                    style={{ color: slide.accentFrom }}>
                                    {slide.subtitle}
                                </motion.p>
                                {slide.desc && (
                                    <motion.p variants={fadeUp} custom={4} initial="hidden" animate="visible"
                                        className="text-base md:text-lg text-softWhite/50 leading-relaxed">
                                        {slide.desc}
                                    </motion.p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev}
                    className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next}
                    className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </motion.button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)}
                            className="transition-all duration-400 rounded-full"
                            style={{ width: i === current ? '28px' : '8px', height: '8px', background: i === current ? slide.accentFrom : 'rgba(255,255,255,0.2)' }} />
                    ))}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
                    <motion.div
                        key={`progress-${current}`}
                        initial={{ width: '0%' }}
                        animate={paused ? {} : { width: '100%' }}
                        transition={{ duration: 8, ease: 'linear' }}
                        className="h-full"
                        style={{ background: `linear-gradient(to right, ${slide.accentFrom}, ${slide.accentTo})` }}
                    />
                </div>
            </section>

            {/* 4 ─── TECNOLOGÍA CON VISIÓN DE NEGOCIO ──── */}
            <section className="py-28 px-6 bg-white/[0.015] border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                        Nuestra filosofía
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">
                        Tecnología con{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">visión de negocio</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-lg text-softWhite/50 leading-relaxed mb-16 max-w-2xl mx-auto">
                        Branding, automatización, IA y ventas trabajando como un solo sistema.
                    </motion.p>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {visionPillars.map((p, i) => (
                            <motion.div key={i}
                                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                whileHover={{ y: -6, scale: 1.03 }}
                                className="group flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.03] hover:border-accent/30 hover:bg-white/[0.06] transition-all cursor-default">
                                <div className="p-4 rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">{p.icon}</div>
                                <span className="text-sm font-bold uppercase tracking-widest text-softWhite/80">{p.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 5 ─── FLIP CARDS DE SERVICIOS ───────────── */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight italic">
                            Lo que{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd93d]">Hacemos</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                            className="text-softWhite/40 text-sm uppercase tracking-[0.3em] font-bold">
                            Toca una tarjeta para descubrir más
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {serviceCards.map((card, i) => <FlipCard key={i} card={card} index={i} />)}
                    </div>
                </div>
            </section>

            {/* 6 ─── PROPÓSITO & VISIÓN ─────────────────── */}
            <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div whileHover={{ y: -10 }} className="p-12 bg-darkCharcoal/60 rounded-[40px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-[60px] group-hover:bg-accent/20 transition-all" />
                            <Target className="w-12 h-12 text-accent mb-8" />
                            <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Nuestro Propósito</h3>
                            <p className="text-softWhite/70 text-lg leading-relaxed">
                                Impulsar empresas latinoamericanas a competir a nivel global mediante soluciones digitales sólidas, escalables y estratégicamente diseñadas.
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/5 font-bold text-accent uppercase tracking-[0.2em] text-xs">
                                La tecnología multiplica resultados.
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="p-12 bg-darkCharcoal/60 rounded-[40px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-highlight/10 rounded-full blur-[60px] group-hover:bg-highlight/20 transition-all" />
                            <Rocket className="w-12 h-12 text-highlight mb-8" />
                            <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Visión a 5 Años</h3>
                            <p className="text-softWhite/70 text-lg leading-relaxed">
                                Evolucionar de agencia a un <span className="text-white font-bold">ecosistema tecnológico</span> referente en LATAM, con soluciones SaaS propias y un portafolio de impacto internacional.
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/5 font-bold text-highlight uppercase tracking-[0.2em] text-xs">
                                BEYOND THE FUTURE.
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
