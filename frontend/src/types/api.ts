import type { PostgrestError } from "@supabase/supabase-js";

export interface Work {
  id: number;
  work_title: string;
  composer: string;
  icat_no: string;
  page_id: string;
  perm_link: string;
}

export interface WorksApiResponse {
  data: Work[] | null;
  count: number | null;
  error: PostgrestError | null;
}

export interface Score {
  imslp_key: string;
  link: string;
}

export interface ScoresApiResponse {
  scores: Score[];
}

export interface MirroredLinkApiResponse {
  link: string;
}