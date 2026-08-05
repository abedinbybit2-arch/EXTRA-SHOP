import { CheckCircle2, ThumbsUp } from "lucide-react";

import { Rating } from "@/components/ui/rating";
import { formatDate } from "@/lib/utils";
import type { Product, Review } from "@/types";

/** Ratings breakdown plus the individual review cards. */
export function ReviewsPanel({
  product,
  reviews,
}: {
  product: Product;
  reviews: Review[];
}) {
  // Distribution derived from the sample so the bars always match the list.
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    return {
      stars,
      count,
      percent: reviews.length ? (count / reviews.length) * 100 : 0,
    };
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
      {/* Summary */}
      <div>
        <div className="rounded-2xl border border-border bg-card p-7 text-center">
          <p className="font-display text-6xl font-light leading-none">
            {product.rating.toFixed(1)}
          </p>
          <Rating value={product.rating} className="mt-4 justify-center" size="lg" />
          <p className="mt-3 text-sm text-muted-foreground">
            Based on {product.reviewCount.toLocaleString()} reviews
          </p>
        </div>

        <ul className="mt-6 space-y-2.5">
          {distribution.map((row) => (
            <li key={row.stars} className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-xs text-muted-foreground">
                {row.stars} star
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-gold"
                  style={{ width: `${row.percent}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                {row.count}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Reviews are collected from verified orders only. We do not remove
          negative feedback.
        </p>
      </div>

      {/* Review list */}
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm text-accent">
                  {review.initials}
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {review.author}
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[11px] font-normal text-success">
                        <CheckCircle2 className="size-3.5" />
                        Verified
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(review.date)}
                  </p>
                </div>
              </div>
              <Rating value={review.rating} size="sm" />
            </div>

            <h4 className="mt-5 font-sans text-base font-medium">{review.title}</h4>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>

            <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <ThumbsUp className="size-3.5" />
              {review.helpful} people found this helpful
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
