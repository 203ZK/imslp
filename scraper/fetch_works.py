import logging

from json import dump, load
from pathlib import Path
from requests import get, Response

API_WORKS = "http://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start={id}/retformat=json"
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def getPage(index: int):
    response: Response = get(API_WORKS.format(id = index))
    print(f"Retrieved page index: {index}")
    return response.json()

def parseResponse(r: dict):
    results = []
    for key, entry in r.items():
        if key.isnumeric():
            results.append(entry)

    print(f"Parsed count: {len(results)}")
    return results

def updateList(works):
    current_file = Path(__file__).resolve()
    file_path = current_file.parents[2] / "list_of_works.json"
    f = open(file_path, "r+", encoding="utf-8")
    data = load(f)

    for work in works:
        try:
            data["works"].append(work)
            f.seek(0)
        except Exception as e:
            logging.error(f"Error writing to file: {work["id"]}")
    
    dump(data, f, indent=4, ensure_ascii=False)
    f.close()
        
def main():
    current_file = Path(__file__).resolve()
    file_path = current_file.parents[2] / "list_of_works.json"
    f = open(file_path, "r+", encoding="utf-8")
    data = load(f)
    print(len(data["works"]))

if __name__ == "__main__":
    main()