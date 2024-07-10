import { AdsType, SubCampaignType } from "@/types/CampaignType";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type Props = {
  subCampaign: SubCampaignType;
  selectedSubCampaign: SubCampaignType;
  setSelectedSubCampaign: (value: SubCampaignType) => void;
  isSubmit: boolean;
};

const SubCampaignItem = ({
  subCampaign,
  selectedSubCampaign,
  setSelectedSubCampaign,
  isSubmit,
}: Props) => {
  const validator = (subCampaign: SubCampaignType) => {
    let err = false;
    if (!subCampaign.name) {
      err = true;
      return err;
    }
    subCampaign?.ads?.forEach((item: AdsType) => {
      if (!item?.name) err = true;
      if (!item?.quantity || item?.quantity <= 0) err = true;
    });

    if (!subCampaign?.ads?.length) err = true;

    return err;
  };

  return (
    <Card
      sx={{
        minWidth: "250px",
        maxWidth: "250px",
        border:
          subCampaign?.id === selectedSubCampaign?.id
            ? "2px solid rgb(33, 150, 243)"
            : "none",
      }}
    >
      <CardActionArea
        onClick={() => {
          setSelectedSubCampaign(subCampaign);
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ color: subCampaign?.status ? "green" : "gray" }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              margin: 0,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: `${validator(subCampaign) && isSubmit ? "red" : "black"}`,
            }}
          >
            {subCampaign.name}
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {subCampaign?.ads?.reduce((total: number, item: AdsType) => {
              return (total += Number(item?.quantity));
            }, 0)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SubCampaignItem;
