import { NotFoundCard } from "@/components/not-found-card";

/*
 * The closest not-found boundary cannot read route params, so the card
 * component derives the locale from the pathname on the client.
 */
export default function NotFound() {
  return <NotFoundCard />;
}
