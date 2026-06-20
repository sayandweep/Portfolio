import { useRef, useEffect, useState } from 'react'
import { reels, reviews } from './components/maps.tsx'

// ─── Lazy Video Card ────────────────────────────────────────────────
const ReelCard = ({ reel }: { reel: { id: string; src: string; webmSrc?: string } }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Load only when near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 } // start loading 200px before visible
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )
    playObserver.observe(video)
    return () => playObserver.disconnect()
  }, [shouldLoad])

  return (
    <div
      ref={containerRef}
      className="relative rounded-md overflow-hidden bg-zinc-900 aspect-9/16"
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline          // required for iOS Safari autoplay
          preload="none"       // don't fetch until IntersectionObserver triggers
          className="w-full h-full object-cover rounded-md"
        >
          {/* WebM first — VP9, ~40% smaller than MP4 */}
          {reel.webmSrc && <source src={reel.webmSrc} type="video/webm" />}
          {/* MP4 fallback for Safari */}
          <source src={reel.src} type="video/mp4" />
        </video>
      ) : (
        // Shimmer placeholder — holds layout, no layout shift
        <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-md" />
      )}
    </div>
  )
}

// ─── App ────────────────────────────────────────────────────────────
function App() {
  return (
    <div>
      <div className="evnH">
        <h1 className="hDng">
          Evnin <br />
          Agency
          <div className="degnE">
            <img src="/evnin.webp" alt="ev-logo" />
          </div>
        </h1>

        {/* Reviews marquee — unchanged */}
        <div className="reviews overflow-x-hidden w-full">
          <div className="maRq">
            {reviews.map((review) => (
              <div
                className="block whitespace-break-spaces mx-1 text-[.7em] px-4 rounded-md border border-zinc-800 font-1 shadow-2xl text-left w-50"
                key={review.id}
              >
                <div className="nM -mb-1 pt-1 text-[.7em] flex items-center">
                  {review.name} ✦ <span className="inline-block">{review.company}</span>
                </div>
                <div className="rV pb-2 text-white">{review.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reels grid — lazy loaded */}
        <div className="reels">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 w-150">
            {reels.map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App