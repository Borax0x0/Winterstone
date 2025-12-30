import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-dark">
      <Hero />
      <div id="sanctuary">
        <About />
      </div>
      <Rooms />
    </main>
  );
}