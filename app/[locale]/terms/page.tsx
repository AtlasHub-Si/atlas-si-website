import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternateLanguages, isLocale, localePath } from "@/lib/i18n/config";

const copy = {
  pt: {
    title: "Termos e documentação legal",
    scope: "Atlas-SI e AtlasBot são iniciativas da ATLAS GLOBAL TECH LTD. Esta página identifica as fontes jurídicas e técnicas pertinentes, sem atribuir à Atlas obrigações ou declarações de terceiros.",
    source: "Documentos da operação original",
    intro: "A base técnica AtlasBot tem origem no projeto OpenBot. Os documentos originais são aqui disponibilizados como referência e atribuição, sem reprodução ou alteração da autoria.",
    terms: "Termos e Condições — OpenBot (original)",
    privacy: "Política de Privacidade — OpenBot (original)",
    boundary: "Os documentos originais regulam os serviços OpenBot e identificam o seu próprio operador. Não constituem automaticamente os Termos de utilização nem a Política de Privacidade de uma conta ou serviço AtlasBot.",
    atlas: "Aplicação e serviços Atlas",
    license: "O código AtlasBot é disponibilizado segundo a licença e os avisos legais existentes no seu repositório oficial. Componentes de terceiros mantêm os respetivos direitos e licenças.",
    available: "Os serviços de conta, acesso remoto e instaladores comerciais AtlasBot só serão disponibilizados após validação das condições aplicáveis, política específica de tratamento de dados e homologação técnica.",
    site: "A Política de Privacidade atualmente publicada pela Atlas-SI refere-se exclusivamente ao website institucional e à sua demonstração local.",
    sitePrivacy: "Privacidade do website Atlas-SI",
    credits: "Créditos e licenças",
    code: "Código, licença MIT e avisos AtlasBot",
    contact: "Questões sobre termos ou dados pessoais: sergiomonteiro@atlashub.si.",
    back: "Voltar ao Atlas-SI",
  },
  en: {
    title: "Terms and legal documentation",
    scope: "Atlas-SI and AtlasBot are initiatives of ATLAS GLOBAL TECH LTD. This page identifies relevant legal and technical sources without attributing third-party statements or obligations to Atlas.",
    source: "Original operator documents",
    intro: "AtlasBot's technical foundation originates in the OpenBot project. The original documents are linked here for reference and attribution, without reproducing or changing their authorship.",
    terms: "Terms & Conditions — OpenBot (original)",
    privacy: "Privacy Policy — OpenBot (original)",
    boundary: "The original documents govern OpenBot services and identify their own operator. They are not automatically the Terms of Use or Privacy Policy for AtlasBot accounts or services.",
    atlas: "Atlas software and services",
    license: "AtlasBot source code is provided under the licence and notices in its official repository. Third-party components retain their respective rights and licences.",
    available: "AtlasBot account services, remote access and commercial installers will be released only after applicable terms, specific data-processing policies and technical acceptance are validated.",
    site: "The currently published Atlas-SI Privacy Policy covers the institutional website and local demo only.",
    sitePrivacy: "Atlas-SI website privacy",
    credits: "Credits and licences",
    code: "AtlasBot source, MIT licence and notices",
    contact: "Questions about terms or personal data: sergiomonteiro@atlashub.si.",
    back: "Return to Atlas-SI",
  },
  fr: {
    title: "Conditions et documentation juridique",
    scope: "Atlas-SI et AtlasBot sont des initiatives d’ATLAS GLOBAL TECH LTD. Cette page identifie les sources juridiques et techniques pertinentes sans attribuer à Atlas les déclarations ou obligations de tiers.",
    source: "Documents de l'opérateur d'origine",
    intro: "La base technique d’AtlasBot provient du projet OpenBot. Les documents originaux sont référencés ici avec attribution, sans reproduction ni modification de leur auteur.",
    terms: "Conditions générales — OpenBot (original)",
    privacy: "Politique de confidentialité — OpenBot (original)",
    boundary: "Les documents originaux régissent les services OpenBot et désignent leur propre opérateur. Ils ne sont pas automatiquement les conditions d’utilisation ou la politique de confidentialité des comptes et services AtlasBot.",
    atlas: "Logiciel et services Atlas",
    license: "Le code source d’AtlasBot est fourni conformément à la licence et aux notices de son dépôt officiel. Les composants tiers conservent leurs droits et licences.",
    available: "Les comptes, l'accès à distance et les installateurs commerciaux AtlasBot ne seront publiés qu’après validation des conditions applicables, des politiques de traitement des données et des tests techniques.",
    site: "La politique de confidentialité Atlas-SI actuellement publiée ne couvre que le site institutionnel et sa démonstration locale.",
    sitePrivacy: "Confidentialité du site Atlas-SI",
    credits: "Crédits et licences",
    code: "Code source, licence MIT et notices AtlasBot",
    contact: "Questions sur les conditions ou les données personnelles : sergiomonteiro@atlashub.si.",
    back: "Retour à Atlas-SI",
  },
  es: {
    title: "Términos y documentación legal",
    scope: "Atlas-SI y AtlasBot son iniciativas de ATLAS GLOBAL TECH LTD. Esta página identifica las fuentes jurídicas y técnicas relevantes sin atribuir a Atlas declaraciones u obligaciones de terceros.",
    source: "Documentos del operador original",
    intro: "La base técnica de AtlasBot procede del proyecto OpenBot. Los documentos originales se enlazan aquí como referencia y atribución, sin reproducirlos ni alterar su autoría.",
    terms: "Términos y Condiciones — OpenBot (original)",
    privacy: "Política de Privacidad — OpenBot (original)",
    boundary: "Los documentos originales regulan los servicios OpenBot e identifican a su propio operador. No constituyen automáticamente los términos de uso ni la política de privacidad de cuentas o servicios AtlasBot.",
    atlas: "Software y servicios Atlas",
    license: "El código fuente AtlasBot se proporciona bajo la licencia y los avisos de su repositorio oficial. Los componentes de terceros mantienen sus derechos y licencias.",
    available: "Las cuentas, el acceso remoto y los instaladores comerciales AtlasBot solo se publicarán después de validar las condiciones aplicables, las políticas de tratamiento de datos y la aceptación técnica.",
    site: "La política de privacidad Atlas-SI publicada actualmente se refiere solo al sitio institucional y su demostración local.",
    sitePrivacy: "Privacidad del sitio Atlas-SI",
    credits: "Créditos y licencias",
    code: "Código, licencia MIT y avisos AtlasBot",
    contact: "Consultas sobre términos o datos personales: sergiomonteiro@atlashub.si.",
    back: "Volver a Atlas-SI",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: copy[locale].title,
    alternates: { canonical: localePath(locale, "/terms"), languages: alternateLanguages(locale, "/terms") },
  };
}

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <main className="atlas-v2 a-legal">
      <Link className="a-brand" href={localePath(locale, "/")}>Atlas-<em>SI</em></Link>
      <article className="a-panel">
        <h1>{t.title}</h1>
        <p>{t.scope}</p>
        <h2>{t.source}</h2>
        <p>{t.intro}</p>
        <ul>
          <li><a href="https://openbot.run/terms" rel="noopener noreferrer">{t.terms}</a></li>
          <li><a href="https://openbot.run/privacy" rel="noopener noreferrer">{t.privacy}</a></li>
        </ul>
        <p><strong>{t.boundary}</strong></p>
        <h2>{t.atlas}</h2>
        <p>{t.license}</p>
        <p>{t.available}</p>
        <p>{t.site} <Link href={localePath(locale, "/privacy")}>{t.sitePrivacy}</Link>.</p>
        <ul>
          <li><Link href={localePath(locale, "/credits")}>{t.credits}</Link></li>
          <li><a href="https://github.com/AtlasHub-Si/Atlas-Bot-Desktop" rel="noopener noreferrer">{t.code}</a></li>
        </ul>
        <p>{t.contact}</p>
        <Link className="a-button a-outline" href={localePath(locale, "/")}>{t.back}</Link>
      </article>
    </main>
  );
}
