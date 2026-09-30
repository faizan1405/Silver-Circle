import { ArrowUpRight, Check, Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DESTINATIONS, Destination, formatINR } from "@/data/destinations";
import { Reveal } from "./Reveal";
import { openWhatsApp } from "@/lib/site";

export function DestinationCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  return (
    <Reveal variant={index % 2 ? "right" : "left"} delay={(index % 3) * 80} className="group overflow-hidden rounded-[2rem] bg-card shadow-soft card-tilt interactive-card">
      <div className="relative aspect-[1.2] overflow-hidden">
        <img src={destination.image} alt={`${destination.name} travel experience`} loading={index > 2 ? "lazy" : "eager"} className="img-zoom h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="label-eyebrow text-white/75">{destination.region}</p>
            <h3 className="mt-1 pb-0.5 text-white">{destination.name}</h3>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md">{destination.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="min-h-[4.5rem] text-base leading-relaxed text-muted-foreground">{destination.blurb}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Starting from</p>
            <p className="mt-1 text-xl font-semibold text-navy-deep">{formatINR(destination.priceFrom)}<span className="text-sm font-normal text-muted-foreground"> / person</span></p>
          </div>
          <Link to="/contact" className="hover-glow inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-navy-deep hover:bg-gold hover:text-navy-deep" aria-label={`Enquire about ${destination.name}`}>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function PackageCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  return (
    <Reveal variant="scale" delay={index * 90} className="group interactive-card overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
      <div className="relative aspect-[1.45] overflow-hidden">
        <img src={destination.image} alt={`${destination.name} curated journey`} loading="lazy" className="img-zoom h-full w-full object-cover" />
        <div className="hover-glow absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-navy-deep">{destination.duration}</div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="label-eyebrow text-muted-foreground">Signature journey</p><h3 className="mt-1 pb-0.5">{destination.name}</h3></div>
          <Sparkles className="mt-1 h-5 w-5 shrink-0 text-gold" />
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{destination.highlights.slice(0, 2).join(" · ")}</p>
        <div className="mt-5 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage" /> 4/5-star stays</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-sage" /> Gentle pacing</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage" /> 24x7 support</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sage" /> Guided touring</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Starting from</p><p className="text-xl font-semibold text-navy-deep">{formatINR(destination.priceFrom)}<span className="text-sm font-normal text-muted-foreground"> / person</span></p></div>
          <button type="button" className="btn-base btn-primary !px-5 !py-3 text-sm" onClick={() => openWhatsApp(`Hello Silver Circle Travel, I would like to enquire about the ${destination.name} journey.`)}>Enquire</button>
        </div>
      </div>
    </Reveal>
  );
}

export function FourFeaturedDestinations() {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{DESTINATIONS.slice(0, 4).map((d, i) => <DestinationCard key={d.slug} destination={d} index={i} />)}</div>;
}