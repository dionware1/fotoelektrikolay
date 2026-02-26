import { useEffect, useRef, useState } from 'react';
import { Calculator, Check, X, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Question {
  id: number;
  question: string;
  given: string[];
  asked: string;
  solution: string[];
  answer: string;
  hint: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Bağlanma enerjisi 2 eV olan bir metalin yüzeyine dalga boyu 3100 Å olan ışık düşürülüyor. Fotoelektronların maksimum kinetik enerjisi kaç eV olur? (h·c = 12400 eV·Å)',
    given: ['W = 2 eV', 'λ = 3100 Å', 'h·c = 12400 eV·Å'],
    asked: 'E_k = ?',
    solution: [
      'E_foton = h·c/λ = 12400/3100 = 4 eV',
      'E_foton = W + E_k',
      '4 = 2 + E_k',
      'E_k = 4 - 2 = 2 eV',
    ],
    answer: '2 eV',
    hint: 'Önce foton enerjisini bulun, sonra Einstein denklemini kullanın.',
  },
  {
    id: 2,
    question: 'Eşik dalga boyu 4000 Å olan bir metal yüzeyine 2500 Å dalga boylu ışık düşürülürse, sökülen elektronların kinetik enerjisi kaç joule olur? (h·c = 12400 eV·Å, 1 eV = 1.6×10⁻¹⁹ J)',
    given: ['λ₀ = 4000 Å', 'λ = 2500 Å', 'h·c = 12400 eV·Å', '1 eV = 1.6×10⁻¹⁹ J'],
    asked: 'E_k = ? (Joule)',
    solution: [
      'W = h·c/λ₀ = 12400/4000 = 3.1 eV',
      'E_foton = h·c/λ = 12400/2500 = 4.96 eV',
      'E_k = E_foton - W = 4.96 - 3.1 = 1.86 eV',
      'E_k = 1.86 × 1.6×10⁻¹⁹ = 2.976×10⁻¹⁹ J',
    ],
    answer: '2.98×10⁻¹⁹ J',
    hint: 'Önce eşik enerjisini (bağlanma enerjisini) bulun.',
  },
  {
    id: 3,
    question: 'Bir fotosel yüzeyine 4 eV enerjili ışık düşürüldüğünde sökülen fotoelektronların maksimum kinetik enerjileri 1.2 eV olarak ölçülüyor. Fotosel katodunun bağlanma enerjisi kaç eV\'tur?',
    given: ['E_foton = 4 eV', 'E_k = 1.2 eV'],
    asked: 'W = ?',
    solution: [
      'E_foton = W + E_k',
      '4 = W + 1.2',
      'W = 4 - 1.2 = 2.8 eV',
    ],
    answer: '2.8 eV',
    hint: 'Einstein fotoelektrik denklemini kullanın.',
  },
  {
    id: 4,
    question: 'Bir metal yüzeyden elektron sökebilmek için dalga boyu en fazla 3000 Å olan ışık kullanılıyor. Buna göre katodun eşik enerjisi kaç joule dur? (h = 6.6×10⁻³⁴ J·s, c = 3×10⁸ m/s)',
    given: ['λ_max = 3000 Å = 3000×10⁻¹⁰ m', 'h = 6.6×10⁻³⁴ J·s', 'c = 3×10⁸ m/s'],
    asked: 'W = ? (Joule)',
    solution: [
      'W = h·c/λ_max',
      'W = (6.6×10⁻³⁴ × 3×10⁸) / (3000×10⁻¹⁰)',
      'W = (19.8×10⁻²⁶) / (3×10⁻⁷)',
      'W = 6.6×10⁻¹⁹ J',
    ],
    answer: '6.6×10⁻¹⁹ J',
    hint: 'Eşik dalga boyu, elektron koparabilmek için gereken maksimum dalga boyudur.',
  },
];

export function Calculations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

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

  const checkAnswer = (questionId: number, correctAnswer: string) => {
    const userAnswer = userAnswers[questionId]?.toLowerCase().replace(/\s/g, '');
    const correct = correctAnswer.toLowerCase().replace(/\s/g, '');
    return userAnswer === correct || (userAnswer && correct.includes(userAnswer));
  };

  return (
    <section
      id="calculations"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-slate-900/30 to-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calculator className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-200">Hesaplamalar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Örnek </span>
            <span className="text-gradient">Sorular</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fotoelektrik olay ile ilgili çözümlü örnek problemler.
            Formülleri uygulayarak kendinizi test edin.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <Card
              key={q.id}
              className={`glass border-white/10 overflow-hidden transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Question Header */}
              <div
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() =>
                  setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-blue-400">
                        {q.id}
                      </span>
                    </div>
                    <div>
                      <p className="text-white leading-relaxed">{q.question}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    {expandedQuestion === q.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedQuestion === q.id && (
                <div className="px-6 pb-6 border-t border-white/10">
                  <div className="pt-6 space-y-6">
                    {/* Given */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                        Verilenler:
                      </h4>
                      <ul className="space-y-1">
                        {q.given.map((item, i) => (
                          <li key={i} className="text-sm text-white font-mono">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Asked */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                        İstenen:
                      </h4>
                      <p className="text-sm text-white font-mono">{q.asked}</p>
                    </div>

                    {/* Hint */}
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-200">{q.hint}</p>
                      </div>
                    </div>

                    {/* User Answer Input */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">
                        Cevabınız:
                      </h4>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Cevabınızı girin..."
                          value={userAnswers[q.id] || ''}
                          onChange={(e) =>
                            setUserAnswers({
                              ...userAnswers,
                              [q.id]: e.target.value,
                            })
                          }
                          className="glass border-white/20"
                        />
                        <Button
                          onClick={() =>
                            setShowResults({ ...showResults, [q.id]: true })
                          }
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Kontrol Et
                        </Button>
                      </div>

                      {/* Result */}
                      {showResults[q.id] && (
                        <div
                          className={`mt-4 p-4 rounded-lg border ${
                            checkAnswer(q.id, q.answer)
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {checkAnswer(q.id, q.answer) ? (
                              <>
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="text-green-400 font-semibold">
                                  Doğru!
                                </span>
                              </>
                            ) : (
                              <>
                                <X className="w-5 h-5 text-red-400" />
                                <span className="text-red-400 font-semibold">
                                  Yanlış
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Doğru cevap:{' '}
                            <span className="text-white font-mono">
                              {q.answer}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">
                        Çözüm:
                      </h4>
                      <div className="p-4 bg-white/5 rounded-lg space-y-2">
                        {q.solution.map((step, i) => (
                          <p
                            key={i}
                            className="text-sm text-muted-foreground font-mono"
                          >
                            {i + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Formula Reference */}
        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }}`}
        >
          <Card className="glass border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Formül Referansı
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-lg font-mono text-blue-400 mb-2">
                  E = h·f = h·c/λ
                </div>
                <p className="text-sm text-muted-foreground">
                  Foton enerjisi
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-lg font-mono text-green-400 mb-2">
                  E_k = E_foton - W
                </div>
                <p className="text-sm text-muted-foreground">
                  Kinetik enerji
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-lg font-mono text-purple-400 mb-2">
                  W = h·f₀ = h·c/λ₀
                </div>
                <p className="text-sm text-muted-foreground">
                  Bağlanma/eşik enerjisi
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-lg font-mono text-orange-400 mb-2">
                  f₀ = W/h
                </div>
                <p className="text-sm text-muted-foreground">
                  Eşik frekansı
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">
                Sabitler
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">
                  <span className="text-white font-mono">h</span> = 6.626 × 10⁻³⁴ J·s
                </div>
                <div className="text-muted-foreground">
                  <span className="text-white font-mono">c</span> = 3 × 10⁸ m/s
                </div>
                <div className="text-muted-foreground">
                  <span className="text-white font-mono">m_e</span> = 9.11 × 10⁻³¹ kg
                </div>
                <div className="text-muted-foreground">
                  <span className="text-white font-mono">1 eV</span> = 1.6 × 10⁻¹⁹ J
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
