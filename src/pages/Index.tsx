import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { Results } from "@/components/Results";
import { AboutAI } from "@/components/AboutAI";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  class: string;
  confidence: number;
}

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('image', file);

      // Placeholder API call - replace with actual endpoint
      // const response = await fetch('/predict', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // Simulated response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPrediction: PredictionResult = {
        class: 'Helmet',
        confidence: 0.95
      };

      setPrediction(mockPrediction);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${mockPrediction.class} (${(mockPrediction.confidence * 100).toFixed(1)}% confidence)`,
      });

      // Scroll to results
      setTimeout(() => {
        document.querySelector('.py-20.px-4.bg-card\\/30')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ImageUpload onPredict={handlePredict} isLoading={isLoading} />
      <Results prediction={prediction} />
      <AboutAI />
      <Footer />
    </div>
  );
};

export default Index;
