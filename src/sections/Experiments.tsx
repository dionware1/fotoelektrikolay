import { useEffect, useRef, useState } from 'react';
import { FlaskConical, Play, Pause, RotateCcw, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Experiments() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [frequency, setFrequency] = useState(50);
  const [intensity, setIntensity] = useState(50);
  const [thresholdEnergy, setThresholdEnergy] = useState(40);
  const [electronCount, setElectronCount] = useState(0);
  const [electronEnergy, setElectronEnergy] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate results based on parameters
  useEffect(() => {
    const photonEnergy = frequency * 2; // Simplified calculation
    const workFunction = thresholdEnergy;
    
    if (photonEnergy > workFunction) {
      const kineticEnergy = photonEnergy - workFunction;
      setElectronEnergy(Math.max(0, kineticEnergy));
      setElectronCount(Math.floor(intensity / 10));
    } else {
      setElectronEnergy(0);
      setElectronCount(0);
    }
  }, [frequency, intensity, thresholdEnergy]);

  const reset = () => {
    setIsRunning(false);
    setFrequency(50);
    setIntensity(50);
    setThresholdEnergy(40);
    setElectronCount(0);
    setElectronEnergy(0);
  };

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <FlaskConical className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-200">Deneyler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">İnteraktif </span>
            <span className="text-gradient">Simülasyon</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fotoelektrik olayın çalışma prensibini bu interaktif simülasyonla keşfedin.
            Frekans, ışık şiddeti ve eşik enerjisini1 değiştirerek sonuçları gözlemleyin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Simulation */}
          <Card
            className={`glass border-white/10 p-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Fotoelektrik Deney Simülasyonu
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsRunning(!isRunning)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isRunning ? (
                    <Pause className="w-4 h-4 mr-1" />
                  ) : (
                    <Play className="w-4 h-4 mr-1" />
                  )}
                  {isRunning ? 'Durdur' : 'Başlat'}
                </Button>
                <Button size="sm" variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Sıfırla
                </Button>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-white/10">
              {/* Light Source */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center transition-all duration-300 ${
                    isRunning ? 'animate-pulse shadow-lg shadow-yellow-500/50' : ''
                  }`}
                  style={{
                    opacity: intensity / 100,
                    boxShadow: isRunning
                      ? `0 0 ${frequency}px rgba(250, 204, 21, 0.5)`
                      : 'none',
                  }}
                >
                  <span className="text-2xl">☀️</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-yellow-400">Işık Kaynağı</span>
                </div>
              </div>

              {/* Photon Beam */}
              {isRunning && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-40 bg-gradient-to-b from-yellow-400/50 to-transparent" />
              )}

              {/* Metal Surface */}
              <div className="absolute bottom-0 left-0 right-0 h-32">
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-600 to-slate-500 rounded-t-3xl"
                  style={{
                    opacity: 0.5 + thresholdEnergy / 200,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-300 font-mono text-sm">METAL</span>
                  </div>
                </div>

                {/* Electrons */}
                {isRunning &&
                  [...Array(electronCount)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-blue-400 rounded-full animate-bounce"
                      style={{
                        bottom: `${20 + (i % 3) * 25}px`,
                        left: `${15 + (i * 10) % 70}%`,
                        animationDelay: `${i * 0.1}s`,
                        boxShadow: `0 0 ${electronEnergy / 5}px rgba(96, 165, 250, 0.8)`,
                      }}
                    >
                      <span className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50" />
                    </div>
                  ))}
              </div>

              {/* Ejected Electrons */}
              {isRunning &&
                electronEnergy > 0 &&
                [...Array(Math.min(electronCount, 3))].map((_, i) => (
                  <div
                    key={`ejected-${i}`}
                    className="absolute w-3 h-3 bg-green-400 rounded-full"
                    style={{
                      bottom: '130px',
                      left: `${25 + i * 25}%`,
                      animation: `eject${i} 1.5s ease-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}

              {/* No electron message */}
              {isRunning && electronCount === 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-red-400 text-lg font-semibold">
                    Elektron Kopmuyor!
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Foton enerjisi eşik enerjisinden düşük
                  </div>
                </div>
              )}

              {/* CSS Animations */}
              <style>{`
                @keyframes eject0 {
                  0% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(-30px, -100px); opacity: 0; }
                }
                @keyframes eject1 {
                  0% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(0, -120px); opacity: 0; }
                }
                @keyframes eject2 {
                  0% { transform: translate(0, 0); opacity: 1; }
                  100% { transform: translate(30px, -100px); opacity: 0; }
                }
              `}</style>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-muted-foreground">Elektron</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-muted-foreground">Fotoelektron</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-muted-foreground">Foton</span>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card
            className={`glass border-white/10 p-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Kontrol Paneli
            </h3>

            <div className="space-y-8">
              {/* Frequency Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    Işık Frekansı
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Frekans arttıkça foton enerjisi artar. Eşik frekansından
                            düşük frekanslı ışık elektron koparamaz.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <span className="text-blue-400 font-mono">{frequency}%</span>
                </div>
                <Slider
                  value={[frequency]}
                  onValueChange={(value) => setFrequency(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Düşük</span>
                  <span>Yüksek</span>
                </div>
              </div>

              {/* Intensity Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    Işık Şiddeti
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Işık şiddeti, birim zamanda gelen foton sayısını belirler.
                            Şiddet arttıkça kopan elektron sayısı artar.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <span className="text-purple-400 font-mono">{intensity}%</span>
                </div>
                <Slider
                  value={[intensity]}
                  onValueChange={(value) => setIntensity(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Zayıf</span>
                  <span>Güçlü</span>
                </div>
              </div>

              {/* Threshold Energy Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium flex items-center gap-2">
                    Eşik Enerjisi (Metal)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Her metalin elektron koparmak için gereken minimum enerjisi
                            vardır. Farklı metaller farklı eşik enerjilerine sahiptir.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <span className="text-orange-400 font-mono">{thresholdEnergy}%</span>
                </div>
                <Slider
                  value={[thresholdEnergy]}
                  onValueChange={(value) => setThresholdEnergy(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Düşük</span>
                  <span>Yüksek</span>
                </div>
              </div>

              {/* Results */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Sonuçlar
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-sm text-muted-foreground mb-1">
                      Kopan Elektron Sayısı
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                      {electronCount}
                    </div>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="text-sm text-muted-foreground mb-1">
                      Kinetik Enerji
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      {electronEnergy.toFixed(1)} eV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Real Experiment Info */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="glass border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Gerçek Laboratuvar Deneyi
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fotoelektrik olay deneyinde, bir vakum tüp içindeki katot levha üzerine
                  farklı frekanslarda ışık gönderilir. Anot levha ile katot arasına uygulanan
                  gerilim değiştirilerek fotoelektronların kinetik enerjisi ölçülür.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Elektroskop ve çinko levha kullanılır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Morötesi ışık elektron koparır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Kırmızı ışık elektron koparamaz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Durma gerilimi ile kinetik enerji ölçülür</span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src="/lab-experiment.jpg"
                  alt="Laboratuvar Deneyi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
