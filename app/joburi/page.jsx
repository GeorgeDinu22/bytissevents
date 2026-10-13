import CtaFinal from "../components/CtaFinal/CtaFinal";
import Footer from "../components/Footer/Footer";
import JoburiLista from "../components/JoburiLista/JoburiLista";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "Joburi disponibile — bytissevents",
  description:
    "Toate tipurile de joburi pentru evenimente și campanii cu care lucrăm: sampling, hostess, flyering, festivaluri și altele.",
};

export default function JoburiPage() {
  return (
    <>
      <Navbar />
      <main>
        <JoburiLista />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
