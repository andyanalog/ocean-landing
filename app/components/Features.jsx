import React from 'react';
import { Anchor, Shield, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Anchor className="h-12 w-12 text-blue-400" />,
      title: "Stability",
      description: "Our solutions provide rock-solid stability for your sound operations."
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-400" />,
      title: "Security",
      description: "Enterprise-grade security to protect your most valuable assets."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-400" />,
      title: "Analytics",
      description: "Powerful insights to drive strategic decision making."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Why Choose OceanWaves
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-blue-900/30 backdrop-blur-md p-8 rounded-lg border border-blue-400/20 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}