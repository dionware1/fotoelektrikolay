import { useEffect, useRef, useState } from 'react';
import { Calculator, TrendingUp, Lightbulb, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Formula {
  name: string;
  formula: string;
  description: string;
  variables: Array<{ symbol: string; meaning: string; unit?: string }>;
}

const formulas: Formula[] = [
  {
    name: 'Foton Enerjisi',
    formula: 'E = h · f = h · c/λ',
    description: 'Bir fotonun sahip olduğu enerji, frekansıyla doğru orantılı, dalga boyuyla ters orantılıdır.',
    variables: [
      { symbol: 'E', meaning: 'Foton enerjisi', unit: 'Joule (J) veya eV' },
      { symbol: 'h', meaning: 'Planck sabiti', unit: '6.626 × 10⁻³⁴ J·s' },
      { symbol: 'f', meaning: 'Frekans', unit: 'Hertz (Hz)' },
      { symbol: 'c', meaning: 'Işık hızı', unit: '3 × 10⁸ m/s' },
      { symbol: 'λ', meaning: 'Dalga boyu', unit: 'Metre (m)' },
    ],
  },
  {
    name: 'Einstein Fotoelektrik Denklemi',
    formula: 'E_foton = E_bağ + E_kinetik',
    description: 'Fotonun enerjisi, bağlanma enerjisi ve elektronun kinetik enerjisinin toplamına eşittir.',
    variables: [
      { symbol: 'E_foton', meaning: 'Gelen fotonun enerjisi', unit: 'Joule (J)' },
      { symbol: 'E_bağ', meaning: 'Metalin bağlanma enerjisi', unit: 'Joule (J)' },
      { symbol: 'E_kinetik', meaning: 'Elektronun maksimum kinetik enerjisi', unit: 'Joule (J)' },
    ],
  },
  {
    name: 'Kinetik Enerji',
    formula: 'E_k = ½ · m · v² = h·f - W',
    description: 'Kopan elektronun kinetik enerjisi, foton enerjisinden bağlanma enerjisinin çıkarılmasıyla bulunur.',
    variables: [
      { symbol: 'E_k', meaning: 'Kinetik enerji', unit: 'Joule (J)' },
      { symbol: 'm', meaning: 'Elektron kütlesi', unit: '9.11 × 10⁻³¹ kg' },
      { symbol: 'v', meaning: 'Elektron hızı', unit: 'm/s' },
      { symbol: 'W', meaning: 'İş fonksiyonu (eşik enerji)', unit: 'Joule (J)' },
    ],
  },
  {
    name: 'Eşik Frekansı',
    formula: 'f₀ = W/h',
    description: 'Elektron koparmak için gereken minimum frekanstır. Bu frekanstan düşük frekanslı ışık elektron koparamaz.',
    variables: [
      { symbol: 'f₀', meaning: 'Eşik frekansı', unit: 'Hertz (Hz)' },
      { symbol: 'W', meaning: 'İş fonksiyonu', unit: 'Joule (J)' },
      { symbol: 'h', meaning: 'Planck sabiti', unit: '6.626 × 10⁻³⁴ J·s' },
    ],
  },
];

const keyConcepts = [
  {
    icon: Lightbulb,
    title: 'Eşik Enerjisi (W)',
    description:
      'Her metalin elektron koparmak için gereken minimum enerjisi vardır. Bu enerjiden düşük enerjili fotonlar elektron koparamaz.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Frekansın Etkisi',
    description:
      'Işığın frekansı arttıkça, kopan elektronların kinetik enerjisi artar. Ancak elektron sayısı değişmez.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Activity,
    title: 'Işık Şiddetinin Etkisi',
    description:
      'Işık şiddeti (foton sayısı) arttıkça, kopan elektron sayısı artar. Ancak her elektronun kinetik enerjisi değişmez.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Calculator,
    title: 'Anlık Olay',
    description:
      'Fotoelektrik olay anında gerçekleşir. Işık yüzeye düştüğü anda elektronlar kopmaya başlar.',
    color: 'from-purple-500 to-pink-500',
  },
];

export function PhysicsPrinciples() {
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
      id="principles"
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
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-200">Fiziksel Prensipler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Temel </span>
            <span className="text-gradient">Formüller</span>
            <span className="text-white"> ve İlkeler</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fotoelektrik olayı matematiksel olarak açıklayan temel denklemler
            ve fiziksel prensipler.
          </p>
        </div>

        {/* Formulas Tabs */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Tabs defaultValue="E = h · f = h · c/λ" className="w-full">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-transparent">
              {formulas.map((formula) => (
                <TabsTrigger
                  key={formula.name}
                  value={formula.formula}
                  className="glass data-[state=active]:bg-blue-500/20 data-[state=active]:border-blue-500/50 border border-transparent px-4 py-3 text-sm"
                >
                  {formula.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {formulas.map((formula) => (
              <TabsContent key={formula.name} value={formula.formula}>
                <Card className="glass border-white/10 p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Formula Display */}
                    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6 text-center">
                        {formula.formula}
                      </div>
                      <p className="text-center text-muted-foreground">
                        {formula.description}
                      </p>
                    </div>

                    {/* Variables */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Değişkenler
                      </h4>
                      <div className="space-y-3">
                        {formula.variables.map((variable) => (
                          <div
                            key={variable.symbol}
                            className="flex items-start gap-4 p-3 rounded-lg bg-white/5"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-blue-400">
                                {variable.symbol}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {variable.meaning}
                              </div>
                              {variable.unit && (
                                <div className="text-sm text-muted-foreground">
                                  {variable.unit}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Key Concepts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyConcepts.map((concept, index) => (
            <Card
              key={concept.title}
              className={`glass border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${concept.color} flex items-center justify-center mb-4`}
              >
                <concept.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {concept.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {concept.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Important Notes */}
        <div
          className={`mt-16 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="glass border-yellow-500/30 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Önemli Notlar
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      Fotoelektrik olay için ışığın frekansı metalin eşik frekansından büyük olmalıdır.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      Işık şiddeti arttıkça kopan elektron sayısı artar, ancak enerjileri değişmez.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      Frekans arttıkça kopan elektronların kinetik enerjisi artar, ancak sayıları değişmez.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      Olay anında gerçekleşir, herhangi bir gecikme söz konusu değildir.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
