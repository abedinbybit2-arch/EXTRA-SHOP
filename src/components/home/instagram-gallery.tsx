import { Camera, Heart } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { instagramPosts } from "@/data/content";
import { formatCompact } from "@/lib/utils";

/** Social proof gallery. Links are illustrative — this is a frontend demo. */
export function InstagramGallery() {
  return (
    <section className="container-luxe pb-20 lg:pb-28">
      <SectionHeading
        eyebrow="@abedinshop"
        title="From the community"
        description="Tag your pieces with #AbedinShopFound to be featured here."
        align="center"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {instagramPosts.map((post, index) => (
          <Reveal key={post.id} delay={(index % 6) * 0.05}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Instagram"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                <Camera className="size-5 text-white" />
                <span className="flex items-center gap-1.5 text-xs text-white">
                  <Heart className="size-3.5 fill-current" />
                  {formatCompact(post.likes)}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
