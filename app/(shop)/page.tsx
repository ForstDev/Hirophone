import { Hero, TrustStrip } from "@/components/home/Hero";
import { BrandRail } from "@/components/home/BrandRail";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BranchesPreview } from "@/components/home/BranchesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BrandRail />
      <FeaturedProducts />
      <HowItWorks />
      <BranchesPreview />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
