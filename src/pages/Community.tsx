import Navbar from "@/components/Navbar";
import CommunityMap from "@/components/CommunityMap";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <CommunityMap />
      </main>
    </div>
  );
};

export default Community;

