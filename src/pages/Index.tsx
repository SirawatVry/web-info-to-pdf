import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { Results } from "@/components/Results";
import { AboutAI } from "@/components/AboutAI";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import type { ReactElement } from 'react';

interface PredictionResult {
  class: string;
  confidence: number;
}

export default function Index(): ReactElement {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePredict = async (file: File): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('image', file);

      console.log('Sending prediction request...');
      // Use the API URL from environment variable or fallback to local network
      const apiUrl = import.meta.env.VITE_API_URL || 'http://90.90.109.102:5000';
      console.log('Using API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout and retry logic
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      console.log('Response status:', response.status);
      
      const predictionData = await response.json();
      console.log('Response data:', predictionData);

      if (predictionData.error) {
        throw new Error(predictionData.error || 'Server returned an error');
      }

      setPrediction(predictionData);
      
      // Get status info for the predicted class
      const statusInfo = {
        'All_wearing_helmet': { icon: '✅', message: 'Safe - All wearing helmets' },
        'No_helmet': { icon: '⚠️', message: 'Unsafe - No helmets detected' },
        'Partial_use': { icon: '⚠️', message: 'Warning - Partial helmet use' }
      }[predictionData.class] || { icon: '❓', message: 'Unknown status' };

      // Show success message
      toast({
        title: `${statusInfo.icon} Analysis Complete`,
        description: `${statusInfo.message} (${(predictionData.confidence * 100).toFixed(1)}% confidence)`,
        variant: predictionData.class === 'All_wearing_helmet' ? 'default' :
                predictionData.class === 'No_helmet' ? 'destructive' : 'warning'
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
}
