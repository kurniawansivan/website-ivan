import { notFound } from "next/navigation";

/** Any unknown path under a locale lands here so the 404 renders inside the site layout. */
export default function CatchAllPage() {
  notFound();
}
