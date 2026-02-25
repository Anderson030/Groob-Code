import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Rocket, Diamond, Shield, Zap, Globe, Cpu, ChevronRight, ChevronLeft, LayoutTemplate, Building2, Code2, Bot, MessageSquare, ShoppingCart, Plug } from 'lucide-react';
import Logo from '../../components/ui/Logo';

const About = () => {
    const values = [
        { icon: <Zap className="w-6 h-6" />, title: 'Innovación constante', desc: 'Evolucionamos con la tecnología para ofrecer siempre lo último.' },
        { icon: <Shield className="w-6 h-6" />, title: 'Compromiso con la calidad', desc: 'No entregamos proyectos, entregamos excelencia técnica.' },
        { icon: <Globe className="w-6 h-6" />, title: 'Transparencia total', desc: 'Comunicación clara y honesta en cada fase del proceso.' },
        { icon: <Target className="w-6 h-6" />, title: 'Pensamiento estratégico', desc: 'Cada línea de código tiene un propósito de negocio.' },
        { icon: <Diamond className="w-6 h-6" />, title: 'Mentalidad de crecimiento', desc: 'Escalamos junto a nuestros clientes.' },
    ];

    const services = [
        {
            icon: <LayoutTemplate className="w-10 h-10" />,
            tag: '01',
            title: 'Landing Pages de Alto Rendimiento',
            subtitle: 'Convierte visitantes en clientes 24/7.',
            desc: 'Optimización, velocidad y copy persuasivo diseñados para maximizar conversiones desde el primer clic.',
            color: 'from-accent to-cyan-400',
            glow: 'accent',
        },
        {
            icon: <Building2 className="w-10 h-10" />,
            tag: '02',
            title: 'Sitios Web Corporativos',
            subtitle: 'Presencia digital sólida y profesional.',
            desc: 'Escalables, administrables y optimizados para SEO — tu empresa en el primer lugar del buscador.',
            color: 'from-highlight to-blue-400',
            glow: 'highlight',
        },
        {
            icon: <Code2 className="w-10 h-10" />,
            tag: '03',
            title: 'Sistemas Web a la Medida',
            subtitle: 'Automatiza procesos y reduce errores.',
            desc: 'Software personalizado con seguridad avanzada, construido exactamente para tu modelo de negocio.',
            color: 'from-purple-500 to-accent',
            glow: 'purple-500',
        },
        {
            icon: <Bot className="w-10 h-10" />,
            tag: '04',
            title: 'Automatizaciones con IA',
            subtitle: 'Agentes inteligentes que trabajan por ti.',
            desc: 'Clasifican, analizan y optimizan en automático — libera a tu equipo de tareas repetitivas.',
            color: 'from-emerald-400 to-cyan-500',
            glow: 'emerald-400',
        },
        {
            icon: <MessageSquare className="w-10 h-10" />,
            tag: '05',
            title: 'Chatbots Inteligentes',
            subtitle: 'Atención inmediata y ventas constantes.',
            desc: 'WhatsApp, web y redes sociales integradas — tu negocio activo las 24 horas sin intervención humana.',
            color: 'from-pink-500 to-accent',
            glow: 'pink-500',
        },
        {
            icon: <ShoppingCart className="w-10 h-10" />,
            tag: '06',
            title: 'Tiendas Online (E-commerce)',
            subtitle: 'Vende sin límites geográficos.',
            desc: 'Pagos integrados, inventario y envíos automatizados — tu tienda lista para vender en cualquier lugar del mundo.',
            color: 'from-orange-400 to-pink-500',
            glow: 'orange-400',
        },
        {
            icon: <Plug className="w-10 h-10" />,
            tag: '07',
            title: 'Integraciones y Automatización Empresarial',
            subtitle: 'Conecta tus herramientas y elimina tareas manuales.',
            desc: 'Todo sincronizado en tiempo real — CRMs, ERPs, APIs y plataformas trabajando como un solo sistema.',
            color: 'from-highlight to-emerald-400',
            glow: 'highlight',
        },
    ];

    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index, dir = 1) => {
        setDirection(dir);
        setCurrent(index);
    }, []);

    const next = useCallback(() => {
        const nextIdx = (current + 1) % services.length;
        goTo(nextIdx, 1);
    }, [current, services.length, goTo]);

    const prev = useCallback(() => {
        const prevIdx = (current - 1 + services.length) % services.length;
        goTo(prevIdx, -1);
    }, [current, services.length, goTo]);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [paused, next]);

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }),
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen pt-20 pb-24 overflow-hidden">
            {/* HER0 / SLOGAN SECTION */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="container mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Engineered for Growth</span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter uppercase italic">
                            Digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-highlight to-accent">Power</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* QUIÉNES SOMOS */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
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

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square"
                        >
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

            {/* PROPÓSITO & VISIÓN */}
            <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Propósito */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 bg-darkCharcoal/60 rounded-[40px] border border-white/5 relative overflow-hidden group"
                        >
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

                        {/* Visión */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 bg-darkCharcoal/60 rounded-[40px] border border-white/5 relative overflow-hidden group"
                        >
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

            {/* VALORES */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight italic"
                        >
                            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">Valores</span>
                        </motion.h2>
                        <div className="h-1.5 w-32 bg-accent mx-auto" />
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                    >
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-accent/30 transition-all group"
                            >
                                <div className="p-4 bg-accent/10 rounded-2xl text-accent mb-6 group-hover:scale-110 transition-transform inline-block">
                                    {v.icon}
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">{v.title}</h4>
                                <p className="text-xs text-softWhite/40 leading-relaxed italic">
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SERVICIOS CAROUSEL */}
            <section className="py-32 px-6 bg-white/[0.02] border-t border-white/5 overflow-hidden">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
                        >
                            Lo que hacemos
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight italic"
                        >
                            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">Servicios</span>
                        </motion.h2>
                        <div className="h-1.5 w-32 bg-accent mx-auto" />
                    </div>

                    <div
                        className="relative max-w-4xl mx-auto"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Slide area */}
                        <div className="relative overflow-hidden rounded-[40px] min-h-[360px] bg-darkCharcoal/60 border border-white/10 shadow-2xl">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={current}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-16 p-10 md:p-16"
                                >
                                    {/* Glow bg */}
                                    <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${services[current].color} opacity-10 rounded-full blur-[100px] pointer-events-none`} />

                                    {/* Icon block */}
                                    <div className="flex-shrink-0">
                                        <div className={`p-6 rounded-3xl bg-gradient-to-br ${services[current].color} bg-opacity-10 border border-white/10 text-white shadow-xl`}>
                                            {services[current].icon}
                                        </div>
                                    </div>

                                    {/* Text block */}
                                    <div className="flex-1 text-center md:text-left">
                                        <span className={`text-xs font-black tracking-[0.4em] uppercase bg-gradient-to-r ${services[current].color} bg-clip-text text-transparent`}>
                                            Servicio {services[current].tag}
                                        </span>
                                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mt-2 mb-3 leading-tight">
                                            {services[current].title}
                                        </h3>
                                        <p className={`text-sm font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${services[current].color} bg-clip-text text-transparent`}>
                                            {services[current].subtitle}
                                        </p>
                                        <p className="text-softWhite/60 text-base leading-relaxed">
                                            {services[current].desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-8 px-2">
                            {/* Prev */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 hover:border-accent/50 flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {services.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i, i > current ? 1 : -1)}
                                        className={`transition-all duration-300 rounded-full ${i === current
                                                ? 'w-8 h-2 bg-accent'
                                                : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Next */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 hover:border-accent/50 flex items-center justify-center transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL SLOGAN BANNER */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
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
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
