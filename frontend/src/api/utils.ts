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
      console.error(`Error parsing file info: ${error}`);
    }
  }
  if (score.source_info) {
    try {
      sourceInfo = JSON.parse(score.source_info);
    } catch (error) {
      console.error(`Error parsing source info: ${error}`);
    }
  }

  return { ...score, file_info: fileInfo, source_info: sourceInfo };
};

function comparator(a: Score, b: Score) {
  const aDownloads = a.file_info?.download_count ?? 0;
  const bDownloads = b.file_info?.download_count ?? 0;
  return bDownloads - aDownloads;
}

function sortScores(categories: Categories): Categories {
  let category: string;
  for (category in categories) {
    const movements = categories[category];
    let movement: string;

    for (movement in movements) {
      const arrangements = movements[movement];
      let arrangement: string;

      for (arrangement in arrangements) {
        const scores = arrangements[arrangement];
        arrangements[arrangement] = scores.sort(comparator);
      }
    }
  }

  return categories;
}

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
  const sortedScores: Categories = sortScores(orderedScores);
  
  return sortedScores;
}