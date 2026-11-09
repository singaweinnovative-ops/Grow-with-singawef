import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_SITE_CONTENT, withDerived, type SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent | undefined;
  children: ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content ?? DEFAULT_SITE_CONTENT}>
      {children}
    </SiteContentContext.Provider>
  );
}

/**
 * The site's editable content — what the management site has published in
 * Supabase, or the bundled defaults where nothing is published. Returns the
 * same names as @/lib/site-content, e.g. `const { SITE, FAQS } = useSiteContent();`
 */
export function useSiteContent() {
  const content = useContext(SiteContentContext);
  return useMemo(() => withDerived(content), [content]);
}
