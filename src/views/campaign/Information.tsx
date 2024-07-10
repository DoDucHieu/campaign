import { CampaignType, InformationType } from "@/types/CampaignType";
import { Grid, TextField } from "@mui/material";

type Props = {
  information: InformationType;
  campaign: CampaignType;
  setCampaign: (value: CampaignType) => void;
  isSubmit: boolean;
};

const Information = ({
  information,
  campaign,
  setCampaign,
  isSubmit,
}: Props) => {
  const handleChangeName = (value: string) => {
    const newCampaign: CampaignType = JSON.parse(JSON.stringify(campaign));
    newCampaign.information.name = value;
    setCampaign(newCampaign);
  };

  const handleChangeDescribe = (value: string) => {
    const newCampaign: CampaignType = JSON.parse(JSON.stringify(campaign));
    newCampaign.information.describe = value;
    setCampaign(newCampaign);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          sx={{ width: "100%" }}
          required
          label="Tên chiến dịch"
          value={information?.name}
          error={isSubmit && !campaign?.information?.name}
          onChange={(event: any) => handleChangeName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          sx={{ width: "100%" }}
          label="Mô tả"
          value={information?.describe}
          onChange={(event: any) => handleChangeDescribe(event.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default Information;
