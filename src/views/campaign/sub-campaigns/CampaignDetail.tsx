import { CampaignType, SubCampaignType } from "@/types/CampaignType";
import { Checkbox, Grid, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableAds from "./TableAds";

type Props = {
  selectedSubCampaign: SubCampaignType;
  campaign: CampaignType;
  setCampaign: (value: CampaignType) => void;
  isSubmit: boolean;
};
const CampaignDetail = ({
  selectedSubCampaign,
  campaign,
  setCampaign,
  isSubmit,
}: Props) => {
  const handleChangeSubCampaignName = (value: string) => {
    const arrSubCampaign = campaign?.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === selectedSubCampaign.id) {
          item.name = value;
        }
        return item;
      }
    );
    const newCampaign: CampaignType = { ...campaign };
    newCampaign.subCampaign = arrSubCampaign;
    setCampaign(newCampaign);
  };

  const handleChangeSubCampaignStatus = (value: boolean) => {
    const arrSubCampaign = campaign?.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === selectedSubCampaign.id) {
          item.status = value;
        }
        return item;
      }
    );
    const newCampaign: CampaignType = { ...campaign };
    newCampaign.subCampaign = arrSubCampaign;
    setCampaign(newCampaign);
  };
  return (
    <Grid container spacing={8}>
      <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-required"
            label="Tên chiến dịch con"
            value={selectedSubCampaign.name}
            error={isSubmit && !selectedSubCampaign?.name}
            onChange={(event: any) =>
              handleChangeSubCampaignName(event.target.value)
            }
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedSubCampaign?.status ? true : false}
                onChange={(event: any) =>
                  handleChangeSubCampaignStatus(event.target.checked)
                }
              />
            }
            label="Đang hoạt động"
          />
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography>DANH SÁCH QUẢNG CÁO</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableAds
            subCampaignId={selectedSubCampaign.id}
            dataAds={selectedSubCampaign.ads}
            campaign={campaign}
            setCampaign={setCampaign}
            isSubmit={isSubmit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampaignDetail;
