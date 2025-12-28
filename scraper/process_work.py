import re

from bs4 import BeautifulSoup, Tag
from requests_html import HTMLSession
from requests import Response
from typing import Dict, List

from logger import createLogger
from custom_types import FileInfo, ScoreProps

logger = createLogger("process_work.py")

def fetchWorkPage(session: HTMLSession, link: str) -> Response:
    try:
        return session.get(link)
    except Exception as e:
        logger.error(f"Error getting page {link}: {e}")


def parseTabsFromPage(response: Response) -> List[Tag]:
    """Return all tab objects in the page."""

    soup = BeautifulSoup(response.text, "lxml")
    score_section = soup.find("div", {"id": "wpscore_tabs"})
    tabs = score_section.find_all("div", {"class": "jq-ui-tabs"})
    return tabs


def extractSourceInfo(collection: Tag) -> Dict:
    """Extract source info (editor, publisher, etc.) of a particular collection of score files."""
    source_section = collection.find("table", {"class": "we_edition_info"}, recursive=False)
    table_data = source_section.find("td", {"class": "we_edition_info_i"})
    table_body = table_data.find("table") if table_data else None
    table_rows = table_body.find_all("tr") if table_body else []

    source_info = dict()
    for row in table_rows:
        header = row.find("th") 
        header_text = header.get_text(strip=True) if header else ""
        data = row.find("td")
        data_text = data.get_text(strip=True) if data else ""
        
        if header_text != "Purchase":
            source_info[header_text] = data_text

    return source_info


def extractFileInfo(file: Tag) -> FileInfo:
    """Extract file info (title, file size, link, etc.) of a particular score file."""
    try:
        div_we_file_download = file.find("div", {"class": "we_file_download"})
        span_file_title = div_we_file_download.find("span", {"title": "Download this file"})
        file_title: str = span_file_title.get_text(strip=True) if span_file_title else ""

        file_details = div_we_file_download.find("span", {"class": "we_file_info2"})

        tag = file_details.find("a", href=re.compile(r"^/wiki"))
        text = tag.get_text(strip=True) if tag else ""
        imslp_key: int = int(text[1:]) if text.startswith("#") else ""

        details_text = file_details.get_text()
        matches = re.findall(r"- (.+), (\d+) pp", details_text)
        file_size, page_count = matches[0] if (len(matches) == 1 and len(matches[0]) == 2) else ("", "")

        a_file_link = file_details.find("a", {"href": re.compile(r"^/images")})
        file_link: str = a_file_link["href"] if a_file_link else ""

        span_download = file_details.find("span", {"title": re.compile(r"^Total")})
        download_count: int = int(span_download.find("a").get_text(strip=True)) if span_download else ""

        span_user = file_details.find("span", {"class": "ms555"})
        # uploader: str = span_user.find("a").get_text(strip=True) if span_user else ""
        uploader: str = span_user.get_text(strip=True) if span_user else ""

        return FileInfo(imslp_key, file_title, file_size, page_count, download_count, file_link, uploader)

    except Exception as e:
        logger.error("Error extracting file info: " + e)
        return None


def parseFilesInCollection(collection: Tag) -> List[FileInfo]:
    """Process each score file in the collection."""
    file_infos: List[FileInfo] = []
    files: List[Tag] = collection.find_all("div", {"id": re.compile(r"^IMSLP")})

    for file in files:
        file_info = extractFileInfo(file)
        file_infos.append(file_info)

    return file_infos


def isScoreCollection(tag: Tag) -> bool:
    return tag.has_attr("class") and tag["class"][0] == "we"


def processFileInfos(file_infos: List[FileInfo], source_info: Dict, work_id: int, tab_title: str,
                     movement_title: str, arrangement_title: str) -> List[ScoreProps]:
    return [ScoreProps(work_id, tab_title, movement_title, 
                       arrangement_title, file_info.asString(), str(source_info)) for file_info in file_infos]


def parseScoreCollection(tag: Tag, work_id: int, tab_title: str,
                         movement_title: str, arrangement_title: str) -> List[ScoreProps]:
    scores: List[ScoreProps] = []

    if isScoreCollection(tag):
        file_infos = parseFilesInCollection(tag)
        source_info = extractSourceInfo(tag)
        scores = processFileInfos(file_infos, source_info, work_id, tab_title, movement_title, arrangement_title)
    
    return scores


def parseTabItems(tab: Tag, work_id: int = 0) -> List[ScoreProps]:
    """
    Iterate through an entire tab and parse all files.
    
    Returns:
    List[ScoreProps]: The list of scores in the tab, ready to be inserted into the DB.
    """

    tab_title: str = ""
    current_movement: str = ""
    current_arrangement: str = ""

    tab_items: List[ScoreProps] = []
    tag: Tag
    for tag in tab.children:
        match tag.name:
            case "h3":
                tab_title = tag.find("span").get_text()
            case "h4":
                current_movement = tag.find("span").get_text()
            case "h5":
                current_arrangement = tag.find("span").get_text()
            case "div":
                scores = parseScoreCollection(tag, work_id, tab_title, current_movement, current_arrangement)
                tab_items += scores

    return tab_items


def processWork(work_url: str, id) -> List[ScoreProps]:    
    s: HTMLSession = HTMLSession()
    resp = fetchWorkPage(s, work_url)
    tabs = parseTabsFromPage(resp)

    all_scores: List[ScoreProps] = []
    for tab in tabs:
        scores_in_tab = parseTabItems(tab, int(id))
        all_scores += scores_in_tab
    
    return all_scores