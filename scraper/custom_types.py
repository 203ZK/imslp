from dataclasses import asdict, dataclass
from json import dumps

@dataclass
class FileInfo:
    imslp_key: int
    file_title: str
    file_size: str
    page_count: int
    download_count: int
    file_link: str
    uploader: str

    def asString(self):
        return str(asdict(self))

@dataclass
class ScoreProps:
    work_id: int
    category: str = ""
    movement_title: str = ""
    arrangement_title: str = ""
    file_info: str = ""
    source_info: str = ""

    def toJson(self):
        return asdict(self)