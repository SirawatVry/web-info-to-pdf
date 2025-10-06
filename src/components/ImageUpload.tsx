import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onPredict: (file: File) => Promise<void>;
  isLoading: boolean;
}

export const ImageUpload = ({ onPredict, isLoading }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (selectedFile) {
      await onPredict(selectedFile);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          Upload & Analyze
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Drop your image or click to browse
        </p>

        <Card className="p-8 bg-card/50 backdrop-blur border-2 border-border hover:border-primary/50 transition-colors">
          {!preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="p-6 rounded-full bg-primary/10 border border-primary/20">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">
                    Drop your image here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-4 right-4 p-2 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <Button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-cyan-400 via-primary to-teal-400 hover:scale-[1.02] transition-all border-glow text-background"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Predict Safety Gear'
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
