import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import type { Categories } from "../api/utils";
import ScoreCategory from "./ScoreCategory";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ScoreTabsProps {
  scores: Categories;
  handleOpen: (imslpKey: string, link: string) => Promise<void>;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pl: 2, pr: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ScoreTabs = ({ scores, handleOpen }: ScoreTabsProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
          {Object.keys(scores).map((category: string, i: number) => {
            return <Tab label={category} {...a11yProps(i)} />
          })}
        </Tabs>
      </Box>
      {Object.keys(scores).map((category: string, i: number) => {
        return (
          <CustomTabPanel value={tabIndex} index={i}>
            <ScoreCategory key={i} movements={scores[category]} handleOpen={handleOpen} />
          </CustomTabPanel>);
      })}
    </Box>
  );
};

export default ScoreTabs;