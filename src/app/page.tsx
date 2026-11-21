import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { CustomerLogos } from "@/components/home/customer-logos";
import { FollowProspect } from "@/components/home/follow-prospect";
import { Dialing } from "@/components/home/dialing";
import { Helios } from "@/components/home/helios";
import { Integrations } from "@/components/home/integrations";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <CustomerLogos />
        <FollowProspect />
        <Dialing />
        <Helios />
        <Integrations />
      </main>
      <SiteFooter />
    </>
  );
}
