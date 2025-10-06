import { Card } from "@/components/ui/card";
import { Brain, Layers, Zap } from "lucide-react";

export const AboutAI = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Powered by Convolutional Neural Networks (CNN) and TensorFlow for accurate safety gear detection
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">CNN Technology</h3>
            <p className="text-muted-foreground leading-relaxed">
              Convolutional Neural Networks analyze visual patterns in images to identify safety gear with high accuracy, learning from thousands of examples.
            </p>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Deep Learning</h3>
            <p className="text-muted-foreground leading-relaxed">
              Multiple neural network layers process image features hierarchically, from basic edges to complex object recognition.
            </p>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Real-Time Detection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Instant analysis and classification of biker safety equipment, providing confidence scores for each prediction.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
