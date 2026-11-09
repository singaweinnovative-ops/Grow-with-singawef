type FormSubmissionRow = {
  id: string;
  created_at: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  payload: Record<string, unknown>;
  status: "new" | "in_progress" | "responded" | "archived";
  assigned_to: string | null;
  internal_notes: string | null;
};

type SiteOpportunityRow = {
  id: string;
  title: string;
  org: string;
  category: string;
  opens: string | null;
  closes: string | null;
  body: string;
  url: string;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type SitePersonRow = {
  slug: string;
  name: string;
  circle: string;
  field: string;
  place: string;
  initials: string;
  photo: string | null;
  year: number | null;
  joined: string | null;
  brief: string;
  story: string[];
  quote: string | null;
  links: { label: string; url: string }[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type Timestamps = { created_at: string; updated_at: string };
type Publishable = { is_published: boolean; sort_order: number };

type SiteBlockRow = { key: string; data: unknown; description: string | null } & Timestamps;

type SiteNewsRow = {
  slug: string;
  date: string;
  label: string;
  title: string;
  excerpt: string;
  body: string[];
  image_url: string | null;
} & Publishable &
  Timestamps;

type SiteProgrammeRow = {
  slug: string;
  family: "Programme" | "Initiative";
  label: string | null;
  name: string;
  kicker: string;
  body: string;
  points: string[];
  image: string | null;
  logo: string | null;
  dossier: Record<string, unknown> | null;
  brand: Record<string, unknown> | null;
} & Publishable &
  Timestamps;

type SiteGalleryEventRow = {
  id: string;
  title: string;
  theme: string;
  year: number;
  month: number;
  date: string;
  overview: string;
  photos: { src: string; caption: string }[];
  has_video: boolean;
  video_url: string | null;
  programme_slug: string | null;
} & Publishable &
  Timestamps;

type SitePressRow = {
  id: string;
  date: string;
  kind: string;
  title: string;
  summary: string;
  file_url: string | null;
  file_label: string | null;
} & Publishable &
  Timestamps;

type SiteResourceRow = {
  id: string;
  title: string;
  category: string;
  description: string;
  file_url: string;
} & Publishable &
  Timestamps;

type Table<Row, Required extends keyof Row> = {
  Row: Row;
  Insert: Partial<Row> & Pick<Row, Required>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      form_submissions: {
        Row: FormSubmissionRow;
        Insert: Partial<FormSubmissionRow> & { form_type: string };
        Update: Partial<FormSubmissionRow>;
        Relationships: [];
      };
      site_opportunities: {
        Row: SiteOpportunityRow;
        Insert: Partial<SiteOpportunityRow> & {
          id: string;
          title: string;
          org: string;
          category: string;
          body: string;
          url: string;
        };
        Update: Partial<SiteOpportunityRow>;
        Relationships: [];
      };
      site_people: {
        Row: SitePersonRow;
        Insert: Partial<SitePersonRow> & {
          slug: string;
          name: string;
          circle: string;
          field: string;
          place: string;
          initials: string;
          brief: string;
        };
        Update: Partial<SitePersonRow>;
        Relationships: [];
      };
      site_blocks: Table<SiteBlockRow, "key" | "data">;
      site_news: Table<SiteNewsRow, "slug" | "date" | "label" | "title" | "excerpt">;
      site_programmes: Table<SiteProgrammeRow, "slug" | "family" | "name" | "kicker" | "body">;
      site_gallery_events: Table<
        SiteGalleryEventRow,
        "id" | "title" | "theme" | "year" | "month" | "date" | "overview"
      >;
      site_press: Table<SitePressRow, "id" | "date" | "kind" | "title" | "summary">;
      site_resources: Table<
        SiteResourceRow,
        "id" | "title" | "category" | "description" | "file_url"
      >;
    };
    Views: Record<string, never>;
    Functions: {
      consume_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: boolean;
      };
    };
  };
};
