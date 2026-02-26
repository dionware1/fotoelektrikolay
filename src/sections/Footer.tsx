import { Atom, BookOpen, ExternalLink, Github, Heart, Mail } from 'lucide-react';

const resources = [
  { name: 'PHET Simülasyonu', url: 'https://phet.colorado.edu/tr/simulation/legacy/photoelectric' },
  { name: 'Wikipedia - Fotoelektrik Olay', url: 'https://tr.wikipedia.org/wiki/Fotoelektrik_olay' },
  { name: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics/quantum-physics' },
  { name: 'EBA Fizik Materyalleri', url: 'http://ogmmateryal.eba.gov.tr' },
];

const topics = [
  'Fotoelektrik Olay Nedir?',
  'Einstein\'ın Açıklaması',
  'Günlük Hayat Uygulamaları',
  'Fotoelektrik Denklem',
  'Eşik Enerjisi',
  'Foton Kavramı',
];

export function Footer() {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-background to-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Atom className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">
                  Fotoelektrik Olay
                </h3>
                <p className="text-xs text-muted-foreground">
                  12. Sınıf Fizik - Modern Fizik
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Bu web sitesi, 12. sınıf fizik dersi fotoelektrik olay konusunu
              öğrencilere interaktif ve görsel bir şekilde öğretmek amacıyla
              hazırlanmıştır. Modern fizik ve kuantum mekaniğinin temel taşlarından
              biri olan bu olay, günlük hayatımızda birçok uygulama alanı bulmaktadır.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Fizik öğrenmeyi seviyoruz</span>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Konular
            </h4>
            <ul className="space-y-2">
              {topics.map((topic) => (
                <li key={topic}>
                  <span className="text-muted-foreground hover:text-white transition-colors cursor-pointer">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-green-400" />
              Kaynaklar
            </h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025 Fotoelektrik Olay Eğitim Sitesi. 12. Sınıf Fizik Ders Materyali.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:info@fizikegitim.com"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-sm text-muted-foreground italic">
            "Fizik, evrenin nasıl çalıştığını anlamamızı sağlayan en büyüleyici bilim dalıdır."
          </blockquote>
        </div>
      </div>
    </footer>
  );
}
