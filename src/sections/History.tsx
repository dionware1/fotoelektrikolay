import { useEffect, useRef, useState } from 'react';
import { Calendar, Award, Microscope, BookOpen } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  scientist: string;
  image?: string;
  highlight?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1887',
    title: 'İlk Keşif',
    scientist: 'Heinrich Hertz',
    description:
      'Alman fizikçi Heinrich Hertz, elektromanyetik dalga deneyleri sırasında, iki elektrot arasındaki kıvılcımın, üzerlerine morötesi ışık düştüğünde güçlendiğini gözlemledi. Bu, fotoelektrik olayın ilk keşfi oldu.',
    image: '/hertz-experiment.jpg',
    highlight: 'İlk gözlem',
  },
  {
    year: '1900',
    title: 'İyonizasyon Çalışmaları',
    scientist: 'Philipp Lenard',
    description:
      'Lenard, gazların üzerine morötesi ışık düşürdüğünde iyonize olduğunu ve pozitif yüklü iyonların oluştuğunu gösterdi. Ancak bu olayı klasik elektromanyetizma çerçevesinde açıklamak mümkün değildi.',
    highlight: 'Deneysel çalışmalar',
  },
  {
    year: '1905',
    title: 'Kuantum Açıklaması',
    scientist: 'Albert Einstein',
    description:
      'Einstein, ışığın fotonlardan oluştuğunu öne sürdü. Her fotonun enerjisi E=h·f formülüyle hesaplanır. Bu devrimsel açıklama, kuantum mekaniğinin temellerini attı ve ışığın parçacık doğasını kanıtladı.',
    image: '/einstein-physics.jpg',
    highlight: 'Devrimsel teori',
  },
  {
    year: '1921',
    title: 'Nobel Fizik Ödülü',
    scientist: 'Albert Einstein',
    description:
      'Einstein, fotoelektrik olayı açıklamasındaki katkılarından dolayı Nobel Fizik Ödülü\'ne layık görüldü. İlginç bir şekilde, bu ödül genel görelilik teorisinden değil, fotoelektrik olay çalışmalarından dolayı verildi.',
    highlight: 'Nobel Ödülü',
  },
];

export function History() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-slate-900/50 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-200">Tarihçe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Keşiften </span>
            <span className="text-gradient">Nobel\'e</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fotoelektrik olayın keşfinden, Einstein\'ın kuantum açıklamasına ve
            Nobel Ödülü\'ne uzanan büyüleyici yolculuk.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden lg:block" />

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 200}ms` }}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${index % 2 === 1 ? 'lg:order-2 lg:text-left' : 'lg:text-right'}`}
                  >
                    <div className="glass rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
                      {/* Year Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${
                          index === 3
                            ? 'from-yellow-500/20 to-amber-500/20 border border-yellow-500/30'
                            : 'from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                        } mb-4`}
                      >
                        {index === 3 ? (
                          <Award className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Calendar className="w-4 h-4 text-blue-400" />
                        )}
                        <span
                          className={`text-lg font-bold ${
                            index === 3 ? 'text-yellow-400' : 'text-blue-400'
                          }`}
                        >
                          {event.year}
                        </span>
                      </div>

                      {/* Highlight */}
                      {event.highlight && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-muted-foreground">
                            {event.highlight}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {event.title}
                      </h3>

                      {/* Scientist */}
                      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                        <Microscope className="w-4 h-4" />
                        <span className="text-sm">{event.scientist}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Image or Icon */}
                  <div
                    className={`flex justify-center ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  >
                    {event.image ? (
                      <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.scientist}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-2xl glass flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      index === 3
                        ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                        : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <blockquote className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl text-white italic mb-4">
              "Işık, uzayda yayılan bir elektromanyetik dalga değil, hareket eden bir enerji paketçiğidir."
            </p>
            <footer className="text-muted-foreground">
              — Albert Einstein, 1905
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
