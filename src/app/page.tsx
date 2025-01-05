"use client";
import { useState, useRef } from "react";
import VideoUploader from "../components/VideoUploader";
import VideoPlayer from "../components/VideoPlayer";
import ImageExtractor from "../components/ImageExtractor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Play } from "lucide-react";
import Logo from "@/components/icons/logo";

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [timeInSeconds, setTimeInSeconds] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    setCapturedImage(null);
    toast.success("Video uploaded successfully");
  };

  const handlePreview = () => {
    if (!videoRef.current || !timeInSeconds) return;

    const time = parseFloat(timeInSeconds);
    if (isNaN(time)) {
      toast.error("Please enter a valid time in seconds");
      return;
    }

    videoRef.current.currentTime = time;
    handleCapture();
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");
    setCapturedImage(image);
    toast.success("Frame captured successfully");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Logo />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900">Frameify</h1>
            <p className="text-gray-500">
              Extract high-quality frames from your videos
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
          {!videoFile ? (
            <>
              <h2 className="text-xl font-semibold text-center">
                Upload Video
              </h2>
              <VideoUploader onUpload={handleVideoUpload} />
            </>
          ) : (
            <div className="space-y-6">
              <VideoPlayer videoFile={videoFile} ref={videoRef} />

              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time (seconds)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter the Timing"
                    value={timeInSeconds}
                    onChange={(e) => setTimeInSeconds(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handlePreview}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" /> Preview
                </Button>
              </div>

              {capturedImage && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-center">Preview</h2>
                  <ImageExtractor image={capturedImage} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 text-gray-600">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
