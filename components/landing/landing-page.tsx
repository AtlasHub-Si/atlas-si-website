import { AtlasLanding } from "@/components/atlas/atlas-landing";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
export function LandingPage({locale}:{locale:Locale;dict:Dictionary}) { return <AtlasLanding locale={locale}/>; }
