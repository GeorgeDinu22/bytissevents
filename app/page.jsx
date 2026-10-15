import CtaFinal from "./components/CtaFinal/CtaFinal";
import DeCeNoi from "./components/DeCeNoi/DeCeNoi";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Joburi from "./components/Joburi/Joburi";
import Marquee from "./components/Marquee/Marquee";
import Navbar from "./components/Navbar/Navbar";
import Personal from "./components/Personal/Personal";
import Petrecere from "./components/Petrecere/Petrecere";
import Testimoniale from "./components/Testimoniale/Testimoniale";

export default function Home() {
  return (
    <>
      <Navbar />
      <main data-smooth-scroll>
        <Hero />
        <DeCeNoi />
        <Marquee />
        <Joburi />
        <Personal />
        <Testimoniale />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
