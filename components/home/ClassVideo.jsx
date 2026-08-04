import { home } from "@/content";
import VideoPlaceholder from "@/components/common/VideoPlaceholder";

export default function ClassVideo() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{home.classVideo.heading}</h2>
        <p className="mt-2 text-secondary">{home.classVideo.subheading}</p>
        <div className="mt-10">
          <VideoPlaceholder
            label={home.classVideo.videoLabel}
            sublabel={home.classVideo.videoNote}
            aspectClassName="aspect-video"
          />
        </div>
      </div>
    </section>
  );
}
