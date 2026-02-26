import { useEffect, useState } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { WhatIsPhotoelectric } from './sections/WhatIsPhotoelectric';
import { History } from './sections/History';
import { PhysicsPrinciples } from './sections/PhysicsPrinciples';
import { Applications } from './sections/Applications';
import { Experiments } from './sections/Experiments';
import { Calculations } from './sections/Calculations';
import { Footer } from './sections/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-background transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <ParticleBackground />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <WhatIsPhotoelectric />
        <History />
        <PhysicsPrinciples />
        <Applications />
        <Experiments />
        <Calculations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
