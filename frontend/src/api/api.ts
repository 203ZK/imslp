import type { MirroredLinkApiResponse, ScoresApiResponse, WorkApiResponse } from "../types/api";
import { constructUrl, fetchApi } from "./client";

export async function fetchWorks(input: string) {
  const path = constructUrl(input);
  const works = await fetchApi<WorkApiResponse[]>(path);
  return works;
};

export async function fetchScores(workId: number) {
  const path = constructUrl(`work/${workId}`);
  const scores = await fetchApi<ScoresApiResponse>(path);
  return scores;
};

export async function fetchMirroredLink(imslpKey: string, link: string) {
  const encodedLink = link.slice(8, 13)+ imslpKey + "-" + link.slice(13);
  const path = constructUrl("score");

  const mirroredLink = await fetchApi<MirroredLinkApiResponse>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encodedLink: encodedLink }),
  });
  
  return mirroredLink;
};