import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Rocket, Diamond, Shield, Zap, Globe,
    ChevronRight, ChevronLeft,
    LayoutTemplate, Building2, Code2, Bot, MessageSquare, ShoppingCart, Plug,
    Sparkles, TrendingUp, Cpu, Network
} from 'lucide-react';
import Logo from '../../components/ui/Logo';

/* ─── DATA ─────────────────────────────────────────── */
const values = [
    { icon: <Zap className="w-6 h-6" />, title: 'Innovación constante', desc: 'Evolucionamos con la tecnología para ofrecer siempre lo último.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Compromiso con la calidad', desc: 'No entregamos proyectos, entregamos excelencia técnica.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Transparencia total', desc: 'Comunicación clara y honesta en cada fase del proceso.' },
    { icon: <Target className="w-6 h-6" />, title: 'Pensamiento estratégico', desc: 'Cada línea de código tiene un propósito de negocio.' },
    { icon: <Diamond className="w-6 h-6" />, title: 'Mentalidad de crecimiento', desc: 'Escalamos junto a nuestros clientes.' },
];

const slides = [
    {
        id: 0,
        type: 'intro',
        tag: null,
        icon: null,
        headline: 'No solo desarrollamos.',
        title: null,
        subtitle: 'Construimos ecosistemas digitales que venden, automatizan y escalan negocios.',
        desc: null,
        bg: 'radial-gradient(ellipse at 60% 40%, #0070f310 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #00dfd815 0%, transparent 60%)',
        accentFrom: '#0070f3',
        accentTo: '#00dfd8',
        glowColor: 'rgba(0,112,243,0.25)',
    },
    {
        id: 1,
        tag: '01',
        icon: <LayoutTemplate className="w-12 h-12" />,
        headline: 'Captación Inteligente',
        title: null,
        subtitle: 'Landing Pages optimizadas para conversión.',
        desc: 'Velocidad, copy persuasivo y estructura diseñada para maximizar ROI.',
        bg: 'radial-gradient(ellipse at 70% 30%, #0070f318 0%, transparent 65%), radial-gradient(ellipse at 10% 90%, #00dfd810 0%, transparent 55%)',
        accentFrom: '#0070f3',
        accentTo: '#38bdf8',
        glowColor: 'rgba(0,112,243,0.3)',
    },
    {
        id: 2,
        tag: '02',
        icon: <Building2 className="w-12 h-12" />,
        headline: 'Presencia Corporativa de Alto Nivel',
        subtitle: 'Sitios web estratégicos que fortalecen su marca y generan confianza real.',
        desc: 'Diseño, SEO y gestión profesional.',
        bg: 'radial-gradient(ellipse at 30% 30%, #6366f118 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #0070f310 0%, transparent 55%)',
        accentFrom: '#6366f1',
        accentTo: '#0070f3',
        glowColor: 'rgba(99,102,241,0.3)',
    },
    {
        id: 3,
        tag: '03',
        icon: <Code2 className="w-12 h-12" />,
        headline: 'Sistemas que Transforman Operaciones',
        subtitle: 'Software a la medida con dashboards, roles y seguridad avanzada.',
        desc: 'Menos errores. Más control. Más rentabilidad.',
        bg: 'radial-gradient(ellipse at 60% 50%, #8b5cf618 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, #0070f310 0%, transparent 55%)',
        accentFrom: '#8b5cf6',
        accentTo: '#0070f3',
        glowColor: 'rgba(139,92,246,0.3)',
    },
    {
        id: 4,
        tag: '04',
        icon: <Bot className="w-12 h-12" />,
        headline: 'Automatización con Inteligencia Artificial',
        subtitle: 'Agentes autónomos que clasifican, analizan y ejecutan tareas complejas.',
        desc: 'Su equipo enfocado en lo estratégico, no en lo repetitivo.',
        bg: 'radial-gradient(ellipse at 50% 40%, #10b98118 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #00dfd810 0%, transparent 55%)',
        accentFrom: '#10b981',
        accentTo: '#00dfd8',
        glowColor: 'rgba(16,185,129,0.3)',
    },
    {
        id: 5,
        tag: '05',
        icon: <MessageSquare className="w-12 h-12" />,
        headline: 'Atención y Ventas Automatizadas',
        subtitle: 'Chatbots para WhatsApp, web y redes con integración CRM y pagos.',
        desc: 'Clientes atendidos 24/7 sin fricción.',
        bg: 'radial-gradient(ellipse at 40% 30%, #ec489918 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, #0070f310 0%, transparent 55%)',
        accentFrom: '#ec4899',
        accentTo: '#f43f5e',
        glowColor: 'rgba(236,72,153,0.3)',
    },
    {
        id: 6,
        tag: '06',
        icon: <ShoppingCart className="w-12 h-12" />,
        headline: 'Comercio Digital Escalable',
        subtitle: 'Tiendas online optimizadas con pagos integrados, inventario y logística sincronizada.',
        desc: 'Vende sin límites físicos.',
        bg: 'radial-gradient(ellipse at 65% 35%, #f9731618 0%, transparent 60%), radial-gradient(ellipse at 15% 75%, #ec489910 0%, transparent 55%)',
        accentFrom: '#f97316',
        accentTo: '#fbbf24',
        glowColor: 'rgba(249,115,22,0.3)',
    },
    {
        id: 7,
        tag: '07',
        icon: <Plug className="w-12 h-12" />,
        headline: 'Integración Total',
        subtitle: 'Conectamos CRM, ERP y herramientas digitales en un solo flujo automatizado.',
        desc: 'Información en tiempo real. Cero procesos manuales innecesarios.',
        bg: 'radial-gradient(ellipse at 55% 45%, #00dfd818 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, #0070f310 0%, transparent 55%)',
        accentFrom: '#00dfd8',
        accentTo: '#0070f3',
        glowColor: 'rgba(0,223,216,0.3)',
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
    center: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] } }),
};

const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (i = 0) => ({ y: 0, opacity: 1, transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' } }),
};

/* ─── COMPONENT ─────────────────────────────────────── */
const About = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index, dir = 1) => {
        setDirection(dir);
        setCurrent(index);
    }, []);

    const next = useCallback(() => {
        goTo((current + 1) % slides.length, 1);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length, -1);
    }, [current, goTo]);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [paused, next]);

    const slide = slides[current];
    const isIntro = slide.type === 'intro';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <div className="min-h-screen pt-20 overflow-x-hidden">

            {/* ─── HERO ──────────────────────────────────── */}
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

            {/* ─── QUIÉNES SOMOS ──────────────────────── */}
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

            {/* ─── PROPÓSITO & VISIÓN ─────────────────── */}
            <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
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

            {/* ─── NUESTROS SERVICIOS ─ Full Screen Carousel ─── */}
            <section
                className="relative overflow-hidden"
                style={{ height: '100svh', minHeight: '600px' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Background layer */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`bg-${current}`}
                        custom={direction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.8 } }}
                        exit={{ opacity: 0, transition: { duration: 0.4 } }}
                        className="absolute inset-0 bg-[#050505]"
                        style={{ background: slide.bg }}
                    >
                        {/* Large decorative number */}
                        {slide.tag && (
                            <div
                                className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
                                style={{ fontSize: 'clamp(200px, 30vw, 400px)', color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.05em' }}
                            >
                                {slide.tag}
                            </div>
                        )}
                        {/* Glow orb */}
                        <div
                            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
                            style={{ background: slide.glowColor, opacity: 0.5 }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Section label (top left) */}
                <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                    <div className="w-6 h-px bg-accent" />
                    <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs">Nuestros Servicios</span>
                </div>

                {/* Slide counter (top right) */}
                <div className="absolute top-8 right-8 z-20 font-black text-sm tracking-widest text-white/30">
                    <span className="text-white/70">{String(current + 1).padStart(2, '0')}</span>
                    <span> / {String(slides.length).padStart(2, '0')}</span>
                </div>

                {/* Slide content */}
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
                            /* ── INTRO SLIDE ── */
                            <div className="max-w-4xl mx-auto">
                                <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-sm"
                                >
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-softWhite/60">Groob Code Technology</span>
                                </motion.div>

                                <motion.h2 variants={fadeUp} custom={1} initial="hidden" animate="visible"
                                    className="font-black uppercase tracking-tighter italic leading-[0.9] mb-8"
                                    style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                        No solo <br />desarrollamos.
                                    </span>
                                </motion.h2>

                                <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
                                    className="text-xl md:text-2xl text-softWhite/60 leading-relaxed max-w-2xl mx-auto font-light"
                                >
                                    Construimos ecosistemas digitales que{' '}
                                    <span className="text-transparent bg-clip-text font-semibold"
                                        style={{ backgroundImage: `linear-gradient(to right, ${slide.accentFrom}, ${slide.accentTo})` }}>
                                        venden, automatizan y escalan
                                    </span>{' '}
                                    negocios.
                                </motion.p>
                            </div>
                        ) : (
                            /* ── SERVICE SLIDE ── */
                            <div className="max-w-3xl mx-auto">
                                {/* Icon */}
                                <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
                                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 text-white"
                                    style={{ background: `linear-gradient(135deg, ${slide.accentFrom}22, ${slide.accentTo}33)`, border: `1px solid ${slide.accentFrom}40` }}
                                >
                                    {slide.icon}
                                </motion.div>

                                {/* Tag */}
                                <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible"
                                    className="text-xs font-black tracking-[0.5em] uppercase mb-4"
                                    style={{ color: slide.accentFrom }}
                                >
                                    Servicio {slide.tag}
                                </motion.div>

                                {/* Headline */}
                                <motion.h2 variants={fadeUp} custom={2} initial="hidden" animate="visible"
                                    className="font-black uppercase tracking-tighter italic leading-tight mb-5"
                                    style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', backgroundImage: `linear-gradient(to right, #fff, #ffffff99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                >
                                    {slide.headline}
                                </motion.h2>

                                {/* Subtitle */}
                                <motion.p variants={fadeUp} custom={3} initial="hidden" animate="visible"
                                    className="text-lg md:text-xl font-semibold mb-4"
                                    style={{ color: slide.accentFrom }}
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {/* Description */}
                                {slide.desc && (
                                    <motion.p variants={fadeUp} custom={4} initial="hidden" animate="visible"
                                        className="text-base md:text-lg text-softWhite/50 leading-relaxed"
                                    >
                                        {slide.desc}
                                    </motion.p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── LEFT ARROW ── */}
                <motion.button
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={prev}
                    className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {/* ── RIGHT ARROW ── */}
                <motion.button
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={next}
                    className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>

                {/* ── DOT NAVIGATION ── */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > current ? 1 : -1)}
                            className="transition-all duration-400 rounded-full"
                            style={{
                                width: i === current ? '28px' : '8px',
                                height: '8px',
                                background: i === current ? slide.accentFrom : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>

                {/* ── PROGRESS BAR ── */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
                    <motion.div
                        key={`progress-${current}`}
                        initial={{ width: '0%' }}
                        animate={paused ? {} : { width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="h-full"
                        style={{ background: `linear-gradient(to right, ${slide.accentFrom}, ${slide.accentTo})` }}
                    />
                </div>
            </section>

            {/* ─── CIERRE: TECNOLOGÍA CON VISIÓN ─────── */}
            <section className="py-28 px-6 bg-white/[0.015] border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                    >
                        Nuestra filosofía
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6"
                    >
                        Tecnología con{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
                            visión de negocio
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-lg text-softWhite/50 leading-relaxed mb-16 max-w-2xl mx-auto"
                    >
                        Branding, automatización, IA y ventas trabajando como un solo sistema.
                    </motion.p>

                    {/* Pillars */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {visionPillars.map((p, i) => (
                            <motion.div
                                key={i}
                                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                whileHover={{ y: -6, scale: 1.03 }}
                                className="group flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.03] hover:border-accent/30 hover:bg-white/[0.06] transition-all cursor-default"
                            >
                                <div className="p-4 rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                                    {p.icon}
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest text-softWhite/80">{p.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── NUESTROS VALORES ───────────────────── */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight italic"
                        >
                            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">Valores</span>
                        </motion.h2>
                        <div className="h-1.5 w-32 bg-accent mx-auto" />
                    </div>

                    <motion.div
                        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                    >
                        {values.map((v, i) => (
                            <motion.div
                                key={i} variants={itemVariants}
                                className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-accent/30 transition-all group"
                            >
                                <div className="p-4 bg-accent/10 rounded-2xl text-accent mb-6 group-hover:scale-110 transition-transform inline-block">
                                    {v.icon}
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">{v.title}</h4>
                                <p className="text-xs text-softWhite/40 leading-relaxed italic">{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── FINAL SLOGAN BANNER ─────────────────── */}
            <section className="py-24 px-6 pb-24">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="relative p-12 md:p-24 rounded-[60px] overflow-hidden text-center bg-accent"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                        <h2 className="relative z-10 text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                            Build. Scale. <span className="text-black">Lead.</span>
                        </h2>
                        <p className="relative z-10 text-white/90 text-xl font-medium tracking-widest uppercase mb-12">
                            Convertimos código en ventaja competitiva.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="relative z-10 px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-sm rounded-full shadow-2xl hover:bg-white hover:text-black transition-all"
                        >
                            Hablemos de tu proyecto
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
