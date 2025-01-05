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
import Avatar from "@/components/avatar";

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
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-700">
              Developed by:
            </span>
            <Avatar
              avatar={"/images/omar.png"}
              name={"Omar Elhassani Alaoui"}
              links={[
                {
                  label: "Github",
                  url: "https://github.com/OmarElhassaniAlaoui",
                },
                {
                  label: "LinkedIn",
                  url: "https://www.linkedin.com/in/omar-el-hassani-alaoui/",
                },
                { label: "X", url: "https://x.com/omarelhassani_" },
              ]}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-700">
              Designed by:
            </span>
            <Avatar
              avatar={"/images/zakaria.png"}
              name={"Zakaria Zyami"}
              links={[
                { label: "Instagram", url: "https://www.instagram.com/zakaria_zyami/ " },
                { label: "X (Twitter)", url: "" },
              ]}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex  justify-between items-start pt-8 text-gray-600">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
