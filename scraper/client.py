import os

from dotenv import load_dotenv
from supabase import acreate_client, AsyncClient
from typing import Dict, List
import re

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
    url1: str = os.getenv("SUPABASE_URL1")
    service_role_key1: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY1")
    supabase1: AsyncClient = await acreate_client(url1, service_role_key1)

    url2: str = os.getenv("SUPABASE_URL2")
    service_role_key2: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY2")
    supabase2: AsyncClient = await acreate_client(url2, service_role_key2)

    WORK_ID_CUTOFF = 140000

    try:
        # id, work_title, composer, perm_link = work.values()
        id = 23490
        composer = "Darke, Harold"
        work_title = "3 Chorale Preludes, Op.20"
        link = "https://imslp.org/wiki/3_Chorale_Preludes,_Op.20_(Darke,_Harold)"
        all_scores = processWork(link, id)

        if len(all_scores) == 0:
            raise Exception(f"work contains no scores: {work_title}")
        
        supabase = supabase1 if id <= WORK_ID_CUTOFF else supabase2
        await uploadScores(supabase, all_scores)
        logger.info(f"Successfully processed work: ID {id}, {work_title} ({composer})")

    except Exception as e:
        logger.error(f"Error processing work: {e}")

        # with open("errors.txt", "a") as f:
        #     f.write(f"client.py - Error processing work {id}: {e}\n")

    # MAX_PAGE_COUNT = 2531  # First one 147-500, 2nd 501-1000, 3rd 1001-1500, 4th 1501-2000, 5th 2001-2500, 6th 2501-2531
    # page_num = 1 # Skipped last few rows of page 1898
    # page_size = 100
    
    # while page_num <= MAX_PAGE_COUNT: # current last page is page 2531
    #     await processPage(supabase, page_num, page_size)
    #     logger.info(f"Finished processing page {page_num}")
    #     print(HORIZONTAL_BAR)
    #     page_num += 1

def getWorkIds():
    work_ids: list[int] = []

    # with open("concatenateStrError.txt", "r") as f:
    #     errors = f.readlines()
    #     for error in errors:
    #         matches = re.findall(r"Error processing work (\d+):", error)
    #         work_id = int(matches[0])
    #         work_ids.append(work_id)
    
    with open("noneTypeObjectError.txt", "r") as f:
        errors = f.readlines()
        for error in errors:
            matches = re.findall(r"Error processing work (\d+):", error)
            work_id = int(matches[0])
            work_ids.append(work_id)

    return work_ids

async def getLink(work_id, supabase: AsyncClient):
    response = await supabase.table("works").select("perm_link").eq("id", work_id).execute()
    data = response.data[0]["perm_link"]
    return data

async def fixWork(work_id: int, idx, supabase1, supabase2):
    WORK_ID_CUTOFF = 140000
    supabase = supabase1 if work_id <= WORK_ID_CUTOFF else supabase2

    link = await getLink(work_id, supabase)

    try:
        all_scores = processWork(link, work_id)

        if len(all_scores) == 0:
            raise Exception(f"work contains no scores: {work_id}")
        
        supabase = supabase1 if work_id <= WORK_ID_CUTOFF else supabase2
        await uploadScores(supabase, all_scores)
        logger.info(f"Successfully processed work: ID {work_id}, index {idx}")

    except Exception as e:
        logger.error(f"Error processing work: {e}")

        with open("concatenateStrFixErrors.txt", "a") as f:
            f.write(f"client.py - Error processing work {work_id}: {e}\n")


async def fixConcatStrErrors():
    load_dotenv()
    url1: str = os.getenv("SUPABASE_URL1")
    service_role_key1: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY1")
    supabase1: AsyncClient = await acreate_client(url1, service_role_key1)

    url2: str = os.getenv("SUPABASE_URL2")
    service_role_key2: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY2")
    supabase2: AsyncClient = await acreate_client(url2, service_role_key2)

    work_ids = getWorkIds()
    for i, work_id in enumerate(work_ids):
        await fixWork(work_id, i, supabase1, supabase2)
    
if __name__ == "__main__":
    # run(main())
    run(fixConcatStrErrors())