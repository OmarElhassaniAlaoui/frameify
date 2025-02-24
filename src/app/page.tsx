"use client";
import { useState, useRef } from "react";
import VideoUploader from "../components/VideoUploader";
import VideoPlayer from "../components/VideoPlayer";
import ImageExtractor from "../components/ImageExtractor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Instagram, Play } from "lucide-react";
import Logo from "@/components/icons/logo";
import ModeToggle from "@/components/themeToggle";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";

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

  const people = [
    {
      id: 1,
      name: "Omar Elhassani Alaoui",
      designation: "Software Developer",
      image: "/images/omar.png",
      socialLinks: [
        {
          platform: "Github",
          url: "https://github.com/OmarElhassaniAlaoui",
          icon: <GithubIcon size={20} />,
        },
        {
          platform: "LinkedIn",
          url: "https://www.linkedin.com/in/omar-el-hassani-alaoui/",
          icon: <LinkedinIcon size={20} />,
        },
        {
          platform: "X",
          url: "https://x.com/omarelhassani_",
          icon: <TwitterIcon size={20} />,
        },
      ],
    },
    {
      id: 2,
      name: "Zakaria Zyami",
      designation: "UX/UI Designer",
      image: "/images/zakaria.png",
      socialLinks: [
        {
          platform: "Instagram",
          url: "https://www.instagram.com/zakaria_zyami/ ",
          icon: <Instagram  size={20} />,
        },
        {
          platform: "X (Twitter)",
          url: "",
          icon: <TwitterIcon size={20} />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Logo />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Frameify
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Extract high-quality frames from your videos
            </p>
          </div>
          <div className="flex-1 text-right">
            <ModeToggle />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-8 space-y-6">
          {!videoFile ? (
            <>
              <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
                Upload Video
              </h2>
              <VideoUploader onUpload={handleVideoUpload} />
            </>
          ) : (
            <div className="space-y-6">
              <VideoPlayer videoFile={videoFile} ref={videoRef} />

              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time (seconds)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter the Timing"
                    value={timeInSeconds}
                    onChange={(e) => setTimeInSeconds(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                </div>
                <Button
                  onClick={handlePreview}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Play className="w-4 h-4 mr-2" /> Preview
                </Button>
              </div>

              {capturedImage && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
                    Preview
                  </h2>
                  <ImageExtractor image={capturedImage} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-300"> Made by : </div>
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </div>
  );
};

export default Index;
