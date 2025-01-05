import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';

interface ImageExtractorProps {
  image: string;
}

const ImageExtractor = ({ image }: ImageExtractorProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `captured-frame-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center min-h-[200px]">
        <Image 
          src={image} 
          alt="Captured frame" 
          className="max-h-[50vh] object-contain"
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleDownload}
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
        >
          <Download className="w-4 h-4" />
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default ImageExtractor;