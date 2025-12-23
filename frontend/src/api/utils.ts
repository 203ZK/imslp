import type { FileInfo, Score, ScoreApiResponse } from "../types/api";

export interface Arrangements {
  [arrangementTitle: string]: Score[];
}

export interface Movements {
  [movementTitle: string]: Arrangements;
}

export interface Categories {
  [categories: string]: Movements;
}

function extractDetails(score: ScoreApiResponse): Score {
  let fileInfo: FileInfo | undefined;
  let sourceInfo: Record<string, any> = {};

  if (score.file_info) {
    try {
      fileInfo = JSON.parse(score.file_info);
    } catch (error) {
      // console.log("File info:", score.file_info);
      // console.error(`Error parsing file info: ${error}`);
    }
  }
  if (score.source_info) {
    try {
      sourceInfo = JSON.parse(score.source_info);
    } catch (error) {
      // console.log("Source info:", score.source_info);
      // console.error(`Error parsing source info: ${error}`);
    }
  }

  return { ...score, file_info: fileInfo, source_info: sourceInfo };
};

function orderScores(scores: Score[]): Categories {
  const categories: Categories = {};

  let score: Score;
  for (score of scores) {
    const category: string = String(score.category) ?? "";
    const movementTitle: string = String(score.movement_title) ?? "";
    const arrangementTitle: string = String(score.arrangement_title) ?? "";

    categories[category] ??= {};
    categories[category][movementTitle] ??= {};
    categories[category][movementTitle][arrangementTitle] ??= [];
    categories[category][movementTitle][arrangementTitle].push(score);
  }

  return categories;
}

export function processScoresResponse(scores: ScoreApiResponse[]): Categories {
  const extractedScores: Score[] = scores.map(score => extractDetails(score));
  const orderedScores: Categories = orderScores(extractedScores);
  return orderedScores;
}