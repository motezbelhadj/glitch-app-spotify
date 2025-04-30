import { DiscoverSection } from "@/components/sections/discover-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { RecentlyPlayedSection } from "@/components/sections/recently-played-section";
import { NewReleasesSection } from "@/components/sections/new-releases-section";

export default function Home() {
  return (
    <div className="px-6 py-6 md:px-8 lg:px-10 pb-32 space-y-10">
      <FeaturedSection />
      <RecentlyPlayedSection />
      <DiscoverSection />
      <NewReleasesSection />
    </div>
  );
}