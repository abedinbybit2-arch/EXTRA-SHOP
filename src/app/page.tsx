import type { Metadata } from "next";

import { BrandsStrip } from "@/components/home/brands-strip";
import { Collections } from "@/components/home/collections";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FlashSale } from "@/components/home/flash-sale";
import { HeroSlider } from "@/components/home/hero-slider";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";
import { OfferBanners } from "@/components/home/offer-banners";
import { Testimonials } from "@/components/home/testimonials";
import { ValueProps } from "@/components/home/value-props";
import { ProductSection } from "@/components/product/product-section";
import { bestSellers, newArrivals, trending } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "EXTRA SHOP — Objects of lasting desire",
  description:
    "A curated destination for modern luxury: watches, leather goods, footwear, fine jewellery, audio, eyewear, apparel and fragrance from twelve houses we work with directly.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <FeaturedCategories />

      <ProductSection
        eyebrow="Trending now"
        title="What the floor is moving"
        description="Ranked by a blend of rating and review volume over the past thirty days."
        products={trending(8)}
        action={{ label: "View all", href: "/shop?sort=rating" }}
      />

      {/* Alternate surface so consecutive rails do not blur together. */}
      <div className="bg-secondary/40">
        <ProductSection
          eyebrow="Popular"
          title="Bought most often"
          description="The pieces our customers return to — and recommend most."
          products={bestSellers(8)}
          action={{ label: "All best sellers", href: "/best-sellers" }}
        />
      </div>

      <ProductSection
        eyebrow="New arrivals"
        title="Just landed"
        description="The most recent additions across all nine departments."
        products={newArrivals(8)}
        action={{ label: "See what's new", href: "/new-arrivals" }}
      />

      <FlashSale />

      <OfferBanners />

      <BrandsStrip />

      <Collections />

      <ValueProps />

      <div className="bg-secondary/40">
        <Testimonials />
      </div>

      <Newsletter />

      <InstagramGallery />
    </>
  );
}
