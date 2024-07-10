import { CampaignType, SubCampaignType } from "@/types/CampaignType";
import SubCampaignItem from "./SubCampaignItem";
import { Box, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import helpers from "@/utils/helpers";
type Props = {
  campaign: CampaignType;
  subCampaigns: SubCampaignType[];
  selectedSubCampaign: SubCampaignType;
  setSelectedSubCampaign: (value: SubCampaignType) => void;
  setCampaign: (value: CampaignType) => void;
  isSubmit: boolean;
};

const ListSubCampaign = ({
  campaign,
  subCampaigns,
  selectedSubCampaign,
  setCampaign,
  setSelectedSubCampaign,
  isSubmit,
}: Props) => {
  const handleAddNewSubCampaign = () => {
    const newSubCampaign: SubCampaignType = {
      id: helpers.generateUniqueId(),
      name: "Chiến dịch con mới",
      status: true,
      ads: [
        {
          id: helpers.generateUniqueId(),
          name: "Quảng cáo mới",
          quantity: 1,
        },
      ],
    };
    const newCampaign = { ...campaign };
    newCampaign.subCampaign.push(newSubCampaign);
    setCampaign(newCampaign);
    setSelectedSubCampaign(newSubCampaign);
  };
  return (
    <Grid container>
      <Grid
        item
        xs={1}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          color="primary"
          size="large"
          sx={{ backgroundColor: "rgb(237, 237, 237)" }}
          onClick={handleAddNewSubCampaign}
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            gap: 2,
            overflow: "auto",
          }}
        >
          {subCampaigns?.map((item: SubCampaignType) => {
            return (
              <SubCampaignItem
                key={item?.id}
                subCampaign={item}
                selectedSubCampaign={selectedSubCampaign}
                setSelectedSubCampaign={setSelectedSubCampaign}
                isSubmit={isSubmit}
              />
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ListSubCampaign;
