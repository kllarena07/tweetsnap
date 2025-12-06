import { useRef, useState } from "react";
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "react-tweet";
import { type Tweet } from "react-tweet/api";
import useSWR from "swr";
import { domToPng } from "modern-screenshot";

interface TweetViewerProps {
  tweetId: string;
  onBack: () => void;
}

async function fetcher(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}

export default function TweetViewer({ tweetId, onBack }: TweetViewerProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const { data, error, isLoading } = useSWR<Tweet>(
    `https://react-tweet.vercel.app/api/tweet/${tweetId}`,
    fetcher,
  );

  const captureTweet = async () => {
    if (!tweetRef.current) return;

    setIsCapturing(true);
    try {
      // Find the article element within the tweet container
      const articleElement = tweetRef.current.querySelector("article");
      const targetElement = articleElement || tweetRef.current;

      const dataUrl = await domToPng(targetElement, {
        quality: 1,
        scale: 2,
        backgroundColor: "#15202b", // Dark background for dark mode
      });

      // Convert to blob and copy to clipboard
      const blob = await (await fetch(dataUrl)).blob();

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        alert("Tweet screenshot copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard write failed:", clipboardError);
        // Fallback: create download link
        const link = document.createElement("a");
        link.download = `tweet-${tweetId}.png`;
        link.href = dataUrl;
        link.click();
        alert("Screenshot downloaded as file (clipboard access denied)");
      }
    } catch (error) {
      console.error("Failed to capture tweet:", error);
      alert("Failed to capture tweet. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound error={error} />;

  return (
    <div className="tweet-viewer">
      <div className="tweet-header">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <button
          onClick={captureTweet}
          disabled={isCapturing}
          className="screenshot-button"
        >
          {isCapturing ? "Capturing..." : "📸 Copy Screenshot"}
        </button>
      </div>

      <div className="tweet-content">
        <div ref={tweetRef} className="tweet-container">
          <div className="dark">
            <EmbeddedTweet tweet={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
