import os
import json
import logging

from asyncio import run
from dotenv import load_dotenv
from dataclasses import dataclass
from supabase import acreate_client, AsyncClient
from pathlib import Path

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@dataclass
class Work:
    work_title: str
    composer: str
    icat_no: str
    page_id: str
    perm_link: str

def retrieve_data(path):
    current_file = Path(__file__).resolve()
    file_path = current_file.parents[2] / path
    f = open(file_path, "r+", encoding="utf-8")
    data = json.load(f)
    return data

async def insert_work(client: AsyncClient, work: Work, index: int):
    work_json = {
        "work_title": work.work_title,
        "composer": work.composer,
        "icat_no": work.icat_no,
        "page_id": work.page_id,
        "perm_link": work.perm_link
    }

    try:
        await client.table("works").insert(work_json).execute()
        print(f"Work {index} successfully inserted")
    except Exception as e:
        logging.error(e)

def parseWork(work: dict):
    details: dict = work["intvals"]
    return Work(
        work_title=details.get("worktitle", ""),
        composer=details.get("composer", ""),
        icat_no=details.get("icatno", ""),
        page_id=details.get("pageid", ""),
        perm_link=work.get("permlink", "")
    )

async def main():
    load_dotenv()
    url: str = os.getenv("SUPABASE_URL")
    service_role_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    supabase: AsyncClient = await acreate_client(url, service_role_key)

    data: dict = retrieve_data("list_of_works.json")
    works: list = data["works"]

    n = len(works)
    for id in range(n):
        work: dict = works[id]
        parsedWork: Work = parseWork(work)
        await insert_work(supabase, parsedWork, id)

if __name__ == "__main__":
    run(main())