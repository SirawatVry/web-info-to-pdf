import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-biker.jpg";

export const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-black mb-6 text-gradient glow-primary">
          BIKER VISION
        </h1>
        <p className="text-xl md:text-3xl font-light mb-8 text-foreground/90 tracking-wide">
          Ride Safe with AI
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Advanced CNN-powered detection system for identifying biker safety gear. 
          Upload an image and let our AI analyze it instantly.
        </p>
        
        <button
          onClick={scrollToUpload}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-red-500 text-white font-bold text-lg rounded-lg hover:scale-105 transition-all duration-300 border-glow"
        >
          Start Detection
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
};
