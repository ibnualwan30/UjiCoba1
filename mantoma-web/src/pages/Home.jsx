import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import About from '../components/home/About';
import Team from '../components/home/Team';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Team />
    </div>
  );
};

export default Home;