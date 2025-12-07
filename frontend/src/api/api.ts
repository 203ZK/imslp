import type { WorksApiResponse } from "../types/api";
import { constructUrl, fetchApi } from "./client";
import { supabase1, supabase2 } from "./supabase";

const WORK_ID_CUTOFF = 140000;

export async function fetchWorks(title: string, composer_name: string): Promise<WorksApiResponse> {
  const { data, error } = await supabase1.rpc('search_works', { title: title, composer_name: composer_name });
  
  if (error) {
    console.error(`Error fetching works from Supabase: ${error}`);
    return { data: [], error: error };
  }

  return { data: data, error: null };
};

export async function fetchScores(workId: number) {
  const supabase = workId < WORK_ID_CUTOFF ? supabase1 : supabase2;
  const scores = await supabase.from("scores").select().eq("work_id", workId);
  return scores;
};

export async function fetchMirroredLink(imslpKey: string, link: string) {
  const encodedLink = link.slice(8, 13)+ imslpKey + "-" + link.slice(13);
  const path = constructUrl("score");

  const mirroredLink = await fetchApi(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encodedLink: encodedLink }),
  });
  
  return mirroredLink;
};