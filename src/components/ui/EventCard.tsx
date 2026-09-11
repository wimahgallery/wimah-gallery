import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(95,101,88,0.08)] hover:border-accent/20 transition-[transform,colors] duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary/30">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.couple_name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-heading text-text-secondary/30">
            {event.couple_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-heading font-normal text-text-primary">
          {event.couple_name}
        </h3>
        <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-accent-light">
          {event.event_name}
        </p>
        <div className="mt-1.5 flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-text-secondary">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(event.event_date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {event.location}
          </span>
        </div>
        {event.images_source && (
          <a
            href={event.images_source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-[11px] sm:text-xs font-medium text-text-primary transition-[transform,colors] duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-accent hover:bg-accent/15 hover:text-accent"
          >
            View Gallery
          </a>
        )}
      </div>
    </div>
  );
}
