import type { FileInfo, Score, ScoreApiResponse, ScoresSupabaseResponse, WorksSupabaseResponse } from "../types/api";
import { fetchApi } from "./client";
import { supabase1, supabase2 } from "./supabase";

const WORK_ID_CUTOFF = 140000;

export async function fetchWorks(
  title: string, composerName: string, pageNum: number, pageSize: number
): Promise<WorksSupabaseResponse> {
  const from: number = (pageNum - 1) * pageSize;
  const to: number = from + pageSize - 1;

  const { data, count, error } = await supabase1
    .rpc('search_works', { title: title, composer_name: composerName }, { count: 'exact' })
    .select('*')
    .range(from, to);
  
  if (error) {
    console.error(`Error fetching works from Supabase: ${error}`);
    return { data: [], count: null, error: error };
  }

  return { data: data, count: count, error: null };
};

export async function fetchScores(workId: number): Promise<ScoresSupabaseResponse> {
  const supabase = workId < WORK_ID_CUTOFF ? supabase1 : supabase2;

  const { data, error }: ScoresSupabaseResponse = await supabase
    .from("scores")
    .select()
    .eq("work_id", workId);

  if (error) {
    console.error(`Error fetching scores from Supabase: ${error}`);
    return { data: [], error: error };
  }

  return { data: data, error: null };
};

export function processScoresResponse(scores: ScoreApiResponse[]): Score[] {
  const extractDetails = (score: ScoreApiResponse): Score => {
    if (score.file_info) { 
      const fileInfo: FileInfo = JSON.parse(score.file_info);
      return {
        imslp_key: fileInfo.imslp_key ?? 0,
        link: fileInfo.file_link ?? "",
      }
    } else {
      return { imslp_key: null, link: null };
    }
  }; 

  return scores.map(score => extractDetails(score));
}

export async function fetchMirroredLink(imslpKey: string, link: string) {
  const encodedLink = link.slice(8, 13)+ imslpKey + "-" + link.slice(13);
  const path = "";

  const mirroredLink = await fetchApi(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encodedLink: encodedLink }),
  });
  
  return mirroredLink;
};