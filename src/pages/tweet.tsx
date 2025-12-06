import { useParams } from "react-router-dom";
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "react-tweet";
import { type Tweet } from "react-tweet/api";
import useSWR from "swr";
import { domToPng } from "modern-screenshot";
import { useRef, useState } from "react";

async function fetcher(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}

export const TweetPage = () => {
  const params = useParams();
  const tweetRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const { data, error, isLoading } = useSWR<Tweet>(
    // `/api/tweet` does not run locally with the vite server but it will work on Vercel.
    import.meta.env.PROD
      ? `/api/tweet/${params.id}`
      : `https://react-tweet.vercel.app/api/tweet/${params.id}`,
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
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      alert("Tweet screenshot copied to clipboard!");
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
    <div className="dark">
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={captureTweet}
          disabled={isCapturing}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: isCapturing ? "#ccc" : "#1d9bf0",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: isCapturing ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          {isCapturing ? "Capturing..." : "📸 Copy Screenshot"}
        </button>
      </div>
      <div ref={tweetRef}>
        <EmbeddedTweet tweet={data} />
      </div>
    </div>
  );
};
