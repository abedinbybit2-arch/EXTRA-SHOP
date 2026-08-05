import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductSection } from "@/components/product/product-section";
import { ProductTabs } from "@/components/product/product-tabs";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { getReviews } from "@/data/reviews";
import { getProduct, relatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** One static page per product. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  const brand = getBrand(product.brand);
  const description = `${product.tagline}. ${product.description.slice(0, 140)}…`;

  return {
    title: `${product.name}${brand ? ` — ${brand.name}` : ""}`,
    description,
    openGraph: {
      title: `${product.name} · ${formatPrice(product.price)}`,
      description,
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const brand = getBrand(product.brand);
  const reviews = getReviews(product.slug, product.rating, product.reviewCount);
  const related = relatedProducts(product, 8);

  // Structured data so search engines can render a rich product result.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: brand?.name ?? siteConfig.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised product data for search engines; contains no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-luxe pt-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            ...(category
              ? [{ label: category.name, href: `/categories/${category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <article className="container-luxe grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <ProductGallery images={product.images} name={product.name} />
        <PurchasePanel product={product} />
      </article>

      <section className="container-luxe py-12 lg:py-16" id="reviews">
        <ProductTabs product={product} reviews={reviews} />
      </section>

      <div className="bg-secondary/40">
        <ProductSection
          eyebrow="You may also like"
          title="Related pieces"
          description={`More from ${category?.name.toLowerCase() ?? "this department"} and from ${brand?.name ?? "the same house"}.`}
          products={related}
        />
      </div>

      <RecentlyViewed currentSlug={product.slug} />
    </>
  );
}
