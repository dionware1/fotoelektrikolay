import { useEffect, useRef, useState } from 'react';
import {
  Sun,
  DoorOpen,
  Camera,
  Droplets,
  Shield,
  Lightbulb,
  Scan,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Application {
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  details: string[];
  color: string;
}

const applications: Application[] = [
  {
    icon: Sun,
    title: 'Güneş Panelleri',
    shortDesc: 'Fotovoltaik hücreler güneş ışığını elektriğe dönüştürür',
    fullDesc:
      'Güneş panelleri, fotoelektrik olay prensibiyle çalışan en önemli teknolojilerden biridir. Fotovoltaik hücreler içindeki yarı iletken malzemeler (genellikle silikon), güneş ışığındaki fotonlar tarafından vurulduğunda elektronlar serbest bırakır ve elektrik akımı oluşturur.',
    image: '/solar-panels.jpg',
    details: [
      'Temiz ve yenilenebilir enerji kaynağı',
      'Uzay araştırmalarında yaygın kullanım',
      'Evsel ve endüstriyel elektrik üretimi',
      'Verimlilik sürekli artmaktadır',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: DoorOpen,
    title: 'Otomatik Kapılar',
    shortDesc: 'Işık sensörleri hareketi algılar ve kapıları açar',
    fullDesc:
      'Otomatik kapılarda bir ışık kaynağı ve fotosel bulunur. Işık demeti fotosel üzerine sürekli düşer. Bir kişi veya nesne ışığı kestiğinde fotoseldeki akım kesilir ve bu durum kapının açılmasını tetikler.',
    image: '/automatic-door.jpg',
    details: [
      'Alışveriş merkezlerinde yaygın kullanım',
      'Hijyenik temassız geçiş imkanı',
      'Güvenlik sistemlerinde kullanım',
      'Engelli erişimi için ideal',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Camera,
    title: 'Dijital Kameralar',
    shortDesc: 'CCD/CMOS sensörler ışığı dijital görüntüye dönüştürür',
    fullDesc:
      'Dijital fotoğraf makinelerinin CCD (Charge-Coupled Device) veya CMOS (Complementary Metal-Oxide-Semiconductor) sensörleri, ışığı algılayarak elektrik sinyallerine dönüştüren milyonlarca küçük fotosel içerir.',
    image: '/camera-sensor.jpg',
    details: [
      'Milyonlarca pikselden oluşan sensörler',
      'Işık şiddetine göre sinyal oluşturma',
      'Renk filtreleri ile RGB algılama',
      'Profesyonel fotoğrafçılığın temeli',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Droplets,
    title: 'Fotoselli Musluklar',
    shortDesc: 'Hijyenik ve su tasarruflu otomatik musluklar',
    fullDesc:
      'Fotoselli musluklarda bir ışık kaynağı ve sensör bulunur. El sensörün önüne geldiğinde ışık yansıması değişir ve bu değişiklik musluğun açılmasını tetikler.',
    image: '/lab-experiment.jpg',
    details: [
      'Hijyenik kullanım (temassız)',
      'Su tasarrufu sağlar',
      'Hastane ve halka açık alanlarda yaygın',
      'Otomatik kapanma özelliği',
    ],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Hırsız Alarm Sistemleri',
    shortDesc: 'Işık demetini kesen cisimleri algılar',
    fullDesc:
      'Güvenlik sistemlerinde bir ışık kaynağı ve alıcı fotosel karşılıklı olarak yerleştirilir. Işık demetini kesen bir cisim alarmı tetikler.',
    image: '/automatic-door.jpg',
    details: [
      'Ev ve iş yeri güvenliği',
      'Müze ve galeri koruma sistemleri',
      'Gizli ve açık montaj seçenekleri',
      'Lazer tabanlı hassas sistemler',
    ],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Sokak Lambaları',
    shortDesc: 'Otomatik açılıp kapanan aydınlatma sistemleri',
    fullDesc:
      'Fotoseller, hava karardığında otomatik olarak yanmakta ve aydınlandığında sönmektedir. Bu sayede enerji tasarrufu sağlanır.',
    image: '/solar-panels.jpg',
    details: [
      'Otomatik açılıp kapanma',
      'Enerji tasarrufu',
      'Gün ışığına göre ayarlanabilirlik',
      'Akıllı şehir aydınlatması',
    ],
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Scan,
    title: 'Barkod Okuyucular',
    shortDesc: 'Ürün kodlarını optik olarak okuma',
    fullDesc:
      'Barkod tarayıcılarda fotodiyotlar, barkoddaki çizgilerden yansıyan ışığı algılar ve dijital sinyallere dönüştürür.',
    image: '/camera-sensor.jpg',
    details: [
      'Perakende satış sistemleri',
      'Envanter yönetimi',
      'Hızlı ve doğru okuma',
      'Lazer ve LED tabanlı sistemler',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Flame,
    title: 'Duman Dedektörleri',
    shortDesc: 'Yangın algılama sistemleri',
    fullDesc:
      'Duman dedektörlerinde bir ışık kaynağı ve sensör bulunur. Duman sensörün önüne geldiğinde ışık saçılır ve alarm tetiklenir.',
    image: '/lab-experiment.jpg',
    details: [
      'Ev ve iş yeri güvenliği',
      'Erken yangın uyarı sistemi',
      'Iyonizasyon ve optik tipler',
      'Hayat kurtarıcı öneme sahip',
    ],
    color: 'from-orange-500 to-red-500',
  },
];

export function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

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
      id="applications"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-slate-900/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Lightbulb className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-200">Günlük Hayat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Günlük Hayatta </span>
            <span className="text-gradient">Fotoelektrik Olay</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fotoelektrik olay, modern yaşamımızın birçok alanında karşımıza çıkar.
            İşte bu büyüleyici fiziksel olayın günlük hayattaki uygulamaları.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, index) => (
            <Card
              key={app.title}
              className={`glass border-white/10 overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => setSelectedApp(app)}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div
                  className={`absolute top-4 left-4 w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center`}
                >
                  <app.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {app.shortDesc}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-blue-400 hover:text-blue-300 hover:bg-transparent group/btn"
                >
                  Detayları Gör
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              Fotoelektrik Olay Hayatımızı Nasıl Kolaylaştırıyor?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Fotoelektrik olay, güneş enerjisinden dijital fotoğrafçılığa, otomatik kapılardan
              güvenlik sistemlerine kadar modern yaşamımızın vazgeçilmez bir parçası haline gelmiştir.
              Bu teknolojiler sayesinde enerji tasarrufu sağlanmakta, hijyenik ortamlar oluşturulmakta
              ve güvenlik artırılmaktadır. Albert Einstein\'ın 1905\'teki devrimsel açıklaması,
              günümüzde milyarlarca cihazın çalışmasını mümkün kılmaktadır.
            </p>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="glass border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedApp.color} flex items-center justify-center`}
                  >
                    <selectedApp.icon className="w-6 h-6 text-white" />
                  </div>
                  <DialogTitle className="text-2xl text-white">
                    {selectedApp.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedApp.shortDesc}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <img
                  src={selectedApp.image}
                  alt={selectedApp.title}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />

                <p className="text-white leading-relaxed mb-6">
                  {selectedApp.fullDesc}
                </p>

                <h4 className="text-lg font-semibold text-white mb-3">
                  Özellikler
                </h4>
                <ul className="space-y-2">
                  {selectedApp.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedApp.color} mt-2 flex-shrink-0`}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
