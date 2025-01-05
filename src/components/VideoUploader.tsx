import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface VideoUploaderProps {
  onUpload: (file: File) => void;
}

const VideoUploader = ({ onUpload }: VideoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      validateAndUpload(files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      onUpload(file);
    } else {
      alert('Please upload a valid video file');
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleFileInput}
      />
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Upload className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <button className="text-blue-600 font-medium">Upload a file</button>
          <span className="text-gray-600"> or drag and drop</span>
        </div>
        <p className="text-gray-500 text-sm">
          MP4, AVI, MOV up to 100MB
        </p>
      </div>
    </div>
  );
};

export default VideoUploader;