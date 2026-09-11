import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/features/loading/FloatingWhatsApp";
import AlbumContent from "@/components/features/album/AlbumContent";

export default function AlbumPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">
          {/* Back + Title */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/#album"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
            <h1 className="font-heading text-[28px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
              Album{" "}
              <span className="font-elegant italic text-accent-light">
                Kami
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary">
              Semua event yang telah kami abadikan dalam satu gallery.
            </p>
          </div>

          <AlbumContent />
        </div>
      </div>
    </>
  );
}
