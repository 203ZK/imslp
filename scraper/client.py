import os

from dotenv import load_dotenv
from supabase import acreate_client, AsyncClient
from typing import Dict, List

from asyncio import run
from logger import createLogger
from process_work import processWork
from upload_scores import uploadScores
from constants import HORIZONTAL_BAR

logger = createLogger("client.py")

async def processWorks(supabase: AsyncClient, works: List[Dict]) -> None:
    for work in works:
        try:
            id, work_title, composer, perm_link = work.values()
            all_scores = processWork(perm_link, id)

            if len(all_scores) == 0:
                raise Exception(f"work contains no scores: {work_title}")
            
            await uploadScores(supabase, all_scores)
            logger.info(f"Successfully processed work: ID {id}, {work_title} ({composer})")

        except Exception as e:
            logger.error(f"Error processing work: {e}")

            with open("errors.txt", "a") as f:
                f.write(f"client.py - Error processing work {id}: {e}\n")


async def processPage(supabase: AsyncClient, page_num: int, page_size: int) -> None:
    start, end = getRowRange(page_num, page_size)

    try:
        response = await (
            supabase.table("works")
            .select("id", "work_title", "composer", "perm_link")
            .range(start, end)
            .execute()
        )
        works: List[Dict] = response.data if response else []
        await processWorks(supabase, works)

    except Exception as e:
        logger.error(f"Error fetching page {e}:")


def getRowRange(page_num: int, page_size: int):
    start = (page_num - 1) * page_size
    end = start + page_size - 1
    return start, end


async def main():
    load_dotenv()
    url: str = os.getenv("SUPABASE_URL2")
    service_role_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY2")
    supabase: AsyncClient = await acreate_client(url, service_role_key)

    try:
        # id, work_title, composer, perm_link = work.values()
        id = 228059
        composer = "Beethoven, Ludwig van"
        work_title = "Symphony No.9, Op.125"
        all_scores = processWork("https://imslp.org/wiki/Symphony_No.9%2C_Op.125_(Beethoven%2C_Ludwig_van)", id)

        if len(all_scores) == 0:
            raise Exception(f"work contains no scores: {work_title}")
        
        await uploadScores(supabase, all_scores)
        logger.info(f"Successfully processed work: ID {id}, {work_title} ({composer})")

    except Exception as e:
        logger.error(f"Error processing work: {e}")

        with open("errors.txt", "a") as f:
            f.write(f"client.py - Error processing work {id}: {e}\n")

    # MAX_PAGE_COUNT = 2531  # First one 147-500, 2nd 501-1000, 3rd 1001-1500, 4th 1501-2000, 5th 2001-2500, 6th 2501-2531
    # page_num = 1 # Skipped last few rows of page 1898
    # page_size = 100
    
    # while page_num <= MAX_PAGE_COUNT: # current last page is page 2531
    #     await processPage(supabase, page_num, page_size)
    #     logger.info(f"Finished processing page {page_num}")
    #     print(HORIZONTAL_BAR)
    #     page_num += 1
    
if __name__ == "__main__":
    run(main())
