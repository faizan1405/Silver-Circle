import switzerland from "@/assets/dest-switzerland.jpg";
import france from "@/assets/dest-france.jpg";
import italy from "@/assets/dest-italy.jpg";
import uk from "@/assets/dest-uk.jpg";
import japan from "@/assets/dest-japan.jpg";
import singapore from "@/assets/dest-singapore.jpg";
import bali from "@/assets/dest-bali.jpg";
import thailand from "@/assets/dest-thailand.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import turkey from "@/assets/dest-turkey.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: "Europe" | "Asia" | "Middle East";
  style: ("Scenic & Nature" | "Culture & Heritage" | "Relaxed Leisure" | "City & Comfort")[];
  image: string;
  duration: string;
  priceFrom: number;
  priceTo: number;
  blurb: string;
  highlights: string[];
  inclusions: string[];
  bestTime: string;
};

const baseInclusions = [
  "4/5-star stays",
  "Comfortable private transfers",
  "Selected meals",
  "Guided sightseeing",
  "Tour manager throughout",
  "24x7 emergency support",
  "Unhurried pacing for Silver Travellers",
];

export const DESTINATIONS: Destination[] = [
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "Europe",
    style: ["Scenic & Nature", "Relaxed Leisure"],
    image: switzerland,
    duration: "8N / 9D",
    priceFrom: 350000,
    priceTo: 420000,
    blurb:
      "Lakeside towns, gentle mountain railways and unhurried Alpine mornings — Switzerland at a pace that suits you.",
    highlights: ["Jungfraujoch by cog railway", "Lake Lucerne cruise", "Interlaken & Zermatt", "Only 3 hotel changes"],
    inclusions: [...baseInclusions, "Visa assistance"],
    bestTime: "April – September",
  },
  {
    slug: "france-switzerland",
    name: "France & Switzerland",
    region: "Europe",
    style: ["Culture & Heritage", "Scenic & Nature"],
    image: france,
    duration: "9N / 10D",
    priceFrom: 300000,
    priceTo: 360000,
    blurb:
      "Paris in soft golden light, then the calm of the Alps — two classics joined by comfortable rail journeys.",
    highlights: ["Seine dinner cruise", "Eiffel Tower level 2", "Alpine rail to Lucerne", "Wheelchair-friendly routes"],
    inclusions: [...baseInclusions, "Schengen visa assistance"],
    bestTime: "April – October",
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    style: ["Culture & Heritage", "Relaxed Leisure"],
    image: italy,
    duration: "8N / 9D",
    priceFrom: 280000,
    priceTo: 340000,
    blurb:
      "Rome, Florence and Venice with shorter drives, longer lunches and guides who never rush a single step.",
    highlights: ["Vatican skip-the-line", "Private gondola ride", "Tuscan countryside lunch", "Indian meals arranged"],
    inclusions: [...baseInclusions, "Schengen visa assistance"],
    bestTime: "March – October",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    style: ["Culture & Heritage", "City & Comfort"],
    image: uk,
    duration: "8N / 9D",
    priceFrom: 270000,
    priceTo: 330000,
    blurb:
      "London, Edinburgh and the countryside in between — English-speaking ease and familiar comforts throughout.",
    highlights: ["Thames cruise", "Windsor Castle", "Scottish Highlands day", "Indian restaurants included"],
    inclusions: [...baseInclusions, "UK visa assistance"],
    bestTime: "May – September",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    style: ["Culture & Heritage", "Scenic & Nature"],
    image: japan,
    duration: "8N / 9D",
    priceFrom: 300000,
    priceTo: 380000,
    blurb:
      "Cherry blossoms, calm gardens and immaculate bullet trains — exceptionally welcoming and comfortable for Silver Travellers.",
    highlights: ["Shinkansen reserved seats", "Mt. Fuji & Hakone", "Kyoto temple gardens", "Vegetarian meals arranged"],
    inclusions: [...baseInclusions, "Visa assistance"],
    bestTime: "March – May, October – November",
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia",
    style: ["City & Comfort", "Relaxed Leisure"],
    image: singapore,
    duration: "5N / 6D",
    priceFrom: 140000,
    priceTo: 180000,
    blurb:
      "Short flights, spotless streets and everything within easy reach — a gentle first international journey.",
    highlights: ["Gardens by the Bay", "Sentosa cable car", "Night safari (seated tram)", "Indian food everywhere"],
    inclusions: baseInclusions,
    bestTime: "Year round",
  },
  {
    slug: "bali",
    name: "Bali",
    region: "Asia",
    style: ["Relaxed Leisure", "Scenic & Nature"],
    image: bali,
    duration: "6N / 7D",
    priceFrom: 130000,
    priceTo: 170000,
    blurb:
      "Rice terraces, temple mornings and long restful afternoons at a resort you will not want to leave.",
    highlights: ["Ubud terraces by car", "Tanah Lot sunset", "Two resorts only", "In-resort Ayurvedic spa"],
    inclusions: baseInclusions,
    bestTime: "April – October",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    style: ["Relaxed Leisure", "Culture & Heritage"],
    image: thailand,
    duration: "6N / 7D",
    priceFrom: 110000,
    priceTo: 150000,
    blurb:
      "Golden temples in Bangkok and quiet sea-view mornings in Phuket, with unhurried transfers between them.",
    highlights: ["Grand Palace guided walk", "Chao Phraya dinner cruise", "Seaview rooms", "Jain & vegetarian menus"],
    inclusions: baseInclusions,
    bestTime: "November – March",
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    style: ["City & Comfort", "Relaxed Leisure"],
    image: dubai,
    duration: "5N / 6D",
    priceFrom: 120000,
    priceTo: 160000,
    blurb:
      "A short, luxurious break with air-conditioned comfort from arrival to departure — ideal for winter travel.",
    highlights: ["Burj Khalifa level 124", "Desert evening (soft-drive)", "Dhow cruise", "Abu Dhabi day trip"],
    inclusions: [...baseInclusions, "Visa assistance"],
    bestTime: "October – March",
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Europe",
    style: ["Culture & Heritage", "Scenic & Nature"],
    image: turkey,
    duration: "8N / 9D",
    priceFrom: 210000,
    priceTo: 270000,
    blurb:
      "Istanbul's grand mosques, Cappadocia's balloons at sunrise and thermal terraces at Pamukkale.",
    highlights: ["Hagia Sophia & Blue Mosque", "Cappadocia balloon (optional)", "Bosphorus cruise", "Indian meals daily"],
    inclusions: [...baseInclusions, "E-visa assistance"],
    bestTime: "April – June, September – November",
  },
];

export const TRAVEL_STYLES = [
  "Scenic & Nature",
  "Culture & Heritage",
  "Relaxed Leisure",
  "City & Comfort",
] as const;

export function formatINR(amount: number) {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2).replace(/\.00$/, "")} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}
