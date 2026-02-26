import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Atom, Waves, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function WhatIsPhotoelectric() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: 'Işık-Madde Etkileşimi',
      description:
        'Fotoelektrik olay, bir metal yüzeyine düşürülen ışığın metalden elektron koparması olayıdır. Bu olay ışığın parçacık doğasının en önemli kanıtlarından biridir.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Atom,
      title: 'Fotoelektronlar',
      description:
        'Işık tarafından koparılan elektronlara fotoelektron denir. Her foton sadece bir elektron koparabilir ve foton yok olarak enerjisini elektrona aktarır.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Waves,
      title: 'Eşik Enerjisi',
      description:
        'Elektronların metalden koparılabilmesi için ışığın belirli bir minimum enerjiye (eşik enerjisi) sahip olması gerekir. Bu enerji metalin türüne bağlıdır.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Kinetik Enerji',
      description:
        'Fotonun enerjisi eşik enerjisinden fazla ise, fazla olan enerji elektronun kinetik enerjisine dönüşür. Bu Einstein\'ın fotoelektrik denklemiyle açıklanır.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section
      id="what-is"
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
            <Atom className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-200">Temel Kavramlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Fotoelektrik Olay </span>
            <span className="text-gradient">Nedir?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fotoelektrik olay, belirli bir metal yüzeye yeterli frekansta ışık düşürüldüğünde,
            metalden elektron sökülmesi olayıdır. Bu fenomen, ışığın hem dalga hem de parçacık
            özellikleri gösterdiğini kanıtlayan en önemli deneysel gözlemlerden biridir.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Interactive Visualization */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Metal Surface */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-3xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-400 font-mono text-sm">METAL YÜZEY</span>
                </div>
              </div>

              {/* Electrons in metal */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`electron-${i}`}
                  className="absolute w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                  style={{
                    bottom: `${20 + Math.random() * 60}px`,
                    left: `${10 + i * 12}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <span className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50" />
                </div>
              ))}

              {/* Photon beam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`photon-${i}`}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
                    style={{
                      top: `${i * 60}px`,
                      animation: `drop 2s linear infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <span className="absolute inset-0 bg-yellow-300 rounded-full animate-ping" />
                  </div>
                ))}
              </div>

              {/* Ejected electrons */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`ejected-${i}`}
                  className="absolute w-3 h-3 bg-green-400 rounded-full"
                  style={{
                    bottom: '120px',
                    left: `${30 + i * 20}%`,
                    animation: `eject 2s ease-out infinite`,
                    animationDelay: `${i * 0.6 + 1}s`,
                  }}
                />
              ))}

              {/* Labels */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                <span className="text-xs text-yellow-300">Foton (Işık)</span>
              </div>
              <div className="absolute bottom-36 left-4 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                <span className="text-xs text-blue-300">Elektron</span>
              </div>
              <div className="absolute top-1/2 right-4 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                <span className="text-xs text-green-300">Fotoelektron</span>
              </div>
            </div>

            {/* CSS Animations */}
            <style>{`
              @keyframes drop {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(300px); opacity: 0; }
              }
              @keyframes eject {
                0% { transform: translate(0, 0); opacity: 1; }
                100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}50px, -150px); opacity: 0; }
              }
            `}</style>
          </div>

          {/* Right: Detailed Explanation */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Olayın Tanımı
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fotoelektrik olay, bir metal yüzeyine düşürülen ışığın metalden elektron koparmasıdır.
                Bu olay ilk olarak 1887 yılında Heinrich Hertz tarafından keşfedilmiştir. Hertz,
                elektromanyetik dalga deneyleri sırasında, elektrotların üzerine ışık düştüğünde
                aralarındaki kıvılcımın güçlendiğini fark etmiştir.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                1905 yılında Albert Einstein, bu olayı açıklamak için ışığın kuantum doğasını öne sürmüş
                ve bu çalışmasıyla 1921 Nobel Fizik Ödülü\'nü kazanmıştır. Einstein\'a göre ışık,
                foton adı verilen enerji paketçiklerinden oluşur ve her fotonun enerjisi
                E = h·f formülüyle hesaplanır.
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Temel Özellikler
              </h3>
              <ul className="space-y-3">
                {[
                  'Bir foton sadece bir elektron koparabilir',
                  'Fotonun enerjisi eşik enerjisinden büyük olmalıdır',
                  'Işık şiddeti arttıkça kopan elektron sayısı artar',
                  'Frekans arttıkça elektronların kinetik enerjisi artar',
                  'Olay anında gerçekleşir (gecikme yoktur)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400 font-bold">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`glass border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${700 + index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
