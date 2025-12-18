import type { PostgrestError } from "@supabase/supabase-js";

export interface Work {
  id: number;
  work_title: string;
  composer: string;
  icat_no: string;
  page_id: string;
  perm_link: string;
}

export interface WorksSupabaseResponse {
  data: Work[] | null;
  count: number | null;
  error: PostgrestError | null;
}

export interface Score {
  imslp_key: number | null;
  link: string | null;
}

export interface FileInfo {
  imslp_key?: number;
  file_title?: string;
  file_size?: string;
  page_count?: string;
  download_count?: number;
  file_link?: string;
  uploader?: string;
}

export interface ScoreApiResponse {
  id: number;
  work_id: number;
  movement_title: string;
  arrangement_title: string;
  file_info: string;
  source_info: Record<string, any>;
  category: string;
}

export interface ScoresSupabaseResponse {
  data: ScoreApiResponse[] | null;
  error: PostgrestError | null;
}

export interface MirroredLinkApiResponse {
  link: string;
}