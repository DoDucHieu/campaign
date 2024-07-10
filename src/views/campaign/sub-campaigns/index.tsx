import { Grid } from "@mui/material";
import ListSubCampaign from "./ListSubCampaign";
import CampaignDetail from "./CampaignDetail";
import { CampaignType, SubCampaignType } from "@/types/CampaignType";

type Props = {
  campaign: CampaignType;
  subCampaigns: SubCampaignType[];
  selectedSubCampaign: SubCampaignType;
  setSelectedSubCampaign: (value: SubCampaignType) => void;
  setCampaign: (value: CampaignType) => void;
  isSubmit: boolean;
};

const SubCampaigns = ({
  subCampaigns,
  selectedSubCampaign,
  setSelectedSubCampaign,
  campaign,
  setCampaign,
  isSubmit,
}: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ListSubCampaign
          subCampaigns={subCampaigns}
          selectedSubCampaign={selectedSubCampaign}
          campaign={campaign}
          setCampaign={setCampaign}
          setSelectedSubCampaign={setSelectedSubCampaign}
          isSubmit={isSubmit}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <CampaignDetail
          selectedSubCampaign={selectedSubCampaign}
          campaign={campaign}
          setCampaign={setCampaign}
          isSubmit={isSubmit}
        />
      </Grid>
    </Grid>
  );
};
export default SubCampaigns;
