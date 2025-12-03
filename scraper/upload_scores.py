from supabase import AsyncClient
from typing import List
import pprint

from logger import createLogger
from constants import HORIZONTAL_BAR
from custom_types import ScoreProps

logger = createLogger("upload_scores.py")

async def uploadScores(supabase: AsyncClient, scores: List[ScoreProps]) -> None:
    for score in scores:
        score_json = score.toJson()

        try:
            response = await supabase.table("scores").insert([score_json]).execute()

            if len(response.data) > 0:
                logger.info(f"Successfully inserted score {score.work_id}!")
            else:
                raise Exception(f"unable to insert score {score.work_id}")

        except Exception as e:
            logger.error(f"Error inserting score {score.work_id}: {e}")

            with open("errors.txt", "a") as f:
                f.write(f"upload_scores.py - Error uploading score: {score.work_id}: {e}\n")

        finally:
            print(HORIZONTAL_BAR)
