import { forwardRef } from 'react';

interface VideoPlayerProps {
  videoFile: File;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoFile }, ref) => {
    return (
      <div className="relative rounded-lg overflow-hidden bg-secondary">
        <video
          ref={ref}
          className="w-full max-h-[70vh] object-contain"
          src={URL.createObjectURL(videoFile)}
          controls
        />
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;