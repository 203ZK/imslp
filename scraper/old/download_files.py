import logging
from re import compile
from typing import List

from requests import Response
from requests_html import Element, HTMLSession, HTMLSession
from bs4 import BeautifulSoup, Tag

from constants import MIRRORS, STATUS_CODE_OK

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def getWorkPage(session: HTMLSession, link: str) -> Response:
    try:
        return session.get(link)
    except Exception as e:
        logging.error(f"Error getting page {link}: {e}")


def getTabsFromPage(response: Response) -> List[Element]:
    soup = BeautifulSoup(response.text, "html.parser")
    score_section = soup.find("div", {"id": "wpscore_tabs"})
    score_tabs = score_section.find_all("div", {"class": "jq-ui-tabs"})
    return score_tabs


def getScoreLinksFromTab(tab: Tag) -> List[str]:
    # score_listings = tab.find_all("div", {"id": compile(r"^IMSLP")})

    # score_links = []
    # for score_listing in score_listings:
    #     file_id = score_listing["id"]
    #     file_info = score_listing.find("span", {"class": "we_file_info2"})
    #     file_link = file_info.find("a", attrs={"href": compile(r"^/images")})
    #     score_links.append((file_id, file_link["href"]))

    # return score_links
    print("I'M HERE")


def fetchFileViaMirrors(session: HTMLSession, imslp_key: str, file: str):
    for mirror in MIRRORS:
        final_link = mirror + file[8:13] + imslp_key + "-" + file[13:]
        print(f"Testing: {final_link}")
        # r: Response = session.get(final_link)
        # if r.status_code == STATUS_CODE_OK:
        #     saveFile("score-{key}.pdf".format(key=imslp_key), r.content)
        #     break


def saveFile(file, content) -> bool:
    try:
        with open(file, "wb") as f:
            f.write(content)
        logging.info("File downloaded successfully!")
        return True
    except Exception as e:
        logging.error(f"Error downloading file: {e}")
        return False


def main():
    s: HTMLSession = HTMLSession()

    TEMP_WORK_URL = "https://imslp.org/wiki/Piano_Trio_No.1,_Op.8_(Brahms,_Johannes)"
    resp: Response = getWorkPage(s, TEMP_WORK_URL)
    tabs: List[Element] = getTabsFromPage(resp)

    # TESTING
    links: List[str] = getScoreLinksFromTab(tabs[0])
    imslp_key, file_url = links[-1]
    fetchFileViaMirrors(s, imslp_key, file_url)

    return

if __name__ == "__main__":
    main()