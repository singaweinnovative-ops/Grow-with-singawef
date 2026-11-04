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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
