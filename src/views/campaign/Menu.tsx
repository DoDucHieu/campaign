"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import Information from "./Information";
import SubCampaigns from "./sub-campaigns";
import {
  AdsType,
  CampaignType,
  InformationType,
  SubCampaignType,
} from "@/types/CampaignType";
import helpers from "@/utils/helpers";
import { CheckedAll, CheckedObject } from "./sub-campaigns/TableAds";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
      {value === index && (
        <Box
          sx={{ p: 3, backgroundColor: "#FFF", borderRadius: 3, marginTop: 2 }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const defaultCampaign: CampaignType = {
  information: {
    name: "Chiến dịch",
    describe: "Chiến dịch hello world",
  },
  subCampaign: [
    {
      id: helpers.generateUniqueId(),
      name: "Chiến dịch con 1",
      status: true,
      ads: [
        {
          id: helpers.generateUniqueId(),
          name: "Quảng cáo 1",
          quantity: 1,
        },
        {
          id: helpers.generateUniqueId(),
          name: "Quảng cáo 2",
          quantity: 3,
        },
      ],
    },
  ],
};

export type ContextType = {
  objCheckedAll: CheckedAll;
  setObjCheckedAll: (value: CheckedAll) => void;
  objChecked: CheckedObject;
  setObjChecked: (value: CheckedObject) => void;
};

export const CheckContext = createContext<ContextType | undefined>(undefined);

const Menu = () => {
  const [value, setValue] = useState(0);
  const [campaign, setCampaign] = useState<CampaignType>(defaultCampaign);
  const [selectedSubCampaign, setSelectedSubCampaign] =
    useState<SubCampaignType>(defaultCampaign.subCampaign[0]);
  const [objCheckedAll, setObjCheckedAll] = useState<CheckedAll>({});
  const [objChecked, setObjChecked] = useState<CheckedObject>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (selectedSubCampaign?.id && campaign?.subCampaign) {
      const res = campaign.subCampaign.find(
        (item: SubCampaignType) => item.id === selectedSubCampaign.id
      );
      if (res) setSelectedSubCampaign(JSON.parse(JSON.stringify(res)));
    }
  }, [campaign]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (campaign: CampaignType) => {
    const err = validator(campaign);
    setIsErr(err);
    setIsSubmit(true);
    setOpenDialog(true);
  };

  const validator = (campaign: CampaignType) => {
    let err = false;
    if (!campaign?.information?.name) {
      err = true;
      return err;
    }
    campaign?.subCampaign?.forEach((item: SubCampaignType) => {
      if (!item?.name) {
        err = true;
      }
      item?.ads?.forEach((x: AdsType) => {
        if (!x.name) err = true;
        if (!x?.quantity || x?.quantity <= 0) err = true;
      });
      if (!item?.ads?.length) {
        err = true;
      }
    });
    return err;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => handleSubmit(campaign)}>
          Submit
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="THÔNG TIN" {...a11yProps(0)} />
          <Tab label="CHIẾN DỊCH CON" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CheckContext.Provider
        value={{ objChecked, objCheckedAll, setObjChecked, setObjCheckedAll }}
      >
        <CustomTabPanel value={value} index={0}>
          <Information
            information={campaign.information}
            campaign={campaign}
            setCampaign={setCampaign}
            isSubmit={isSubmit}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SubCampaigns
            subCampaigns={campaign.subCampaign}
            selectedSubCampaign={selectedSubCampaign}
            setSelectedSubCampaign={setSelectedSubCampaign}
            campaign={campaign}
            setCampaign={setCampaign}
            isSubmit={isSubmit}
          />
        </CustomTabPanel>
      </CheckContext.Provider>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isErr ? "Lỗi" : "Thành công"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isErr
              ? "Vui lòng điền đúng và đầy đủ thông tin"
              : JSON.stringify(campaign)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Menu;
