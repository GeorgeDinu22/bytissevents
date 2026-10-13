import { notFound } from "next/navigation";
import { Suspense } from "react";
import CtaFinal from "../../components/CtaFinal/CtaFinal";
import Footer from "../../components/Footer/Footer";
import JobDetaliu from "../../components/JobDetaliu/JobDetaliu";
import Navbar from "../../components/Navbar/Navbar";
import { companyInfo } from "../../data/companyInfo";
import { getJob, jobs } from "../../data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ job: job.slug }));
}

export async function generateMetadata({ params }) {
  const { job: slug } = await params;
  const job = getJob(slug);
  if (!job) return {};

  const url = `/joburi/${job.slug}`;

  return {
    title: job.title,
    description: job.text,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: companyInfo.name,
      locale: companyInfo.locale,
      url,
      title: `${job.title} — ${companyInfo.name}`,
      description: job.text,
      images: [{ url: job.image, alt: job.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} — ${companyInfo.name}`,
      description: job.text,
      images: [job.image],
    },
  };
}

// Conținutul jobului depinde de adresă, așa că stă într-un <Suspense>:
// navbarul și footerul apar imediat, la orice navigare.
async function JobContent({ params }) {
  const { job: slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return <JobDetaliu job={job} />;
}

export default function JobPage({ params }) {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <JobContent params={params} />
        </Suspense>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
