import { Card } from "@/components/ui/card";
import { CheckCircle2, Shield } from "lucide-react";

interface ResultsProps {
  prediction: {
    class: string;
    confidence: number;
  } | null;
}

export const Results = ({ prediction }: ResultsProps) => {
  if (!prediction) return null;

  const confidencePercentage = (prediction.confidence * 100).toFixed(1);

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Detection Results
        </h2>

        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 backdrop-blur">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-primary" />
            <h3 className="text-3xl font-bold">Safety Analysis Complete</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Helmet Detection
              </p>
              <p className={`text-4xl font-bold ${
                prediction.class === 'All_wearing_helmet' ? 'text-green-500' :
                prediction.class === 'No_helmet' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {prediction.class.split('_').join(' ')}
              </p>
            </div>

            <div className="text-center p-6 bg-background/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Confidence Score
              </p>
              <p className="text-4xl font-bold text-primary">{confidencePercentage}%</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm">Analysis completed successfully</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
