import { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Electron animation
    const electrons: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const createElectron = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
      };
    };

    for (let i = 0; i < 50; i++) {
      electrons.push(createElectron());
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      electrons.forEach((electron, index) => {
        electron.x += electron.vx;
        electron.y += electron.vy;
        electron.vx += (Math.random() - 0.5) * 0.1;

        ctx.beginPath();
        ctx.arc(electron.x, electron.y, electron.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${electron.alpha})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, electron.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${electron.alpha * 0.2})`;
        ctx.fill();

        if (electron.y < -20) {
          electrons[index] = createElectron();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-photoelectric.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Canvas for electron animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-200">Can Baroudi - 12D</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Fotoelektrik</span>
          <br />
          <span className="text-gradient">Olay</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Işığın maddeyle etkileşiminin en büyüleyici fenomenlerinden biri.
          Elektronların ışık tarafından koparılması ve kuantum fiziğinin
          temel taşlarından biri.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => scrollToSection('#what-is')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl glow"
          >
            <Zap className="w-5 h-5 mr-2" />
            Keşfet
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('#applications')}
            className="border-white/20 hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
          >
            Günlük Hayat Uygulamaları
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-400">1887</div>
            <div className="text-sm text-muted-foreground mt-1">Keşif Yılı</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-400">1921</div>
            <div className="text-sm text-muted-foreground mt-1">Nobel Ödülü</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-cyan-400">∞</div>
            <div className="text-sm text-muted-foreground mt-1">Uygulama</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#what-is')}
          className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
}
