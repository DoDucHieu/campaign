import { AdsType, CampaignType, SubCampaignType } from "@/types/CampaignType";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { CheckContext, ContextType } from "../Menu";
import helpers from "@/utils/helpers";

type Props = {
  subCampaignId: string;
  dataAds: AdsType[];
  campaign: CampaignType;
  setCampaign: (value: CampaignType) => void;
  isSubmit: boolean;
};

export type CheckedObject = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export type CheckedAll = {
  [key: string]: boolean;
};
const TableAds = ({
  dataAds,
  campaign,
  setCampaign,
  subCampaignId,
  isSubmit,
}: Props) => {
  const {
    objChecked,
    objCheckedAll,
    setObjChecked,
    setObjCheckedAll,
  }: ContextType | any = useContext(CheckContext);

  useEffect(() => {
    if (dataAds?.length && subCampaignId) {
      const obj: CheckedObject = { ...objChecked };
      if (!obj[subCampaignId]) obj[subCampaignId] = {};
      dataAds.forEach((item: AdsType) => {
        if (!obj[subCampaignId][item.id]) obj[subCampaignId][item.id] = false;
      });
      setObjChecked(obj);

      let count = 0;
      dataAds.forEach((item: AdsType) => {
        if (obj[subCampaignId]?.[item.id]) count++;
      });
      const newObjCheckedAll = { ...objCheckedAll };
      newObjCheckedAll[subCampaignId] = count === dataAds.length;
      setObjCheckedAll(newObjCheckedAll);

      //handle checked all
      if (!objCheckedAll[subCampaignId]) objCheckedAll[subCampaignId] = false;
    }
  }, [dataAds, subCampaignId]);

  const handleCheckAll = (value: boolean) => {
    const obj: CheckedObject = { ...objChecked };
    obj[subCampaignId] = {};
    dataAds?.forEach((item: AdsType) => {
      obj[subCampaignId][item.id] = value;
    });
    setObjChecked(obj);

    const newObjCheckedAll = { ...objCheckedAll };
    newObjCheckedAll[subCampaignId] = value;
    setObjCheckedAll(newObjCheckedAll);
  };

  const handleCheck = (id: string, value: boolean) => {
    const newObj = { ...objChecked };
    newObj[subCampaignId][id] = value;
    setObjChecked(newObj);

    const listKey = dataAds?.map((item: AdsType) => item.id);

    if (listKey?.length) {
      let count = 0;
      listKey.forEach((item: string) => {
        if (newObj[subCampaignId][item]) count++;
      });
      const newObjCheckedAll = { ...objCheckedAll };
      if (count === dataAds.length) {
        newObjCheckedAll[subCampaignId] = true;
      } else newObjCheckedAll[subCampaignId] = false;
      setObjCheckedAll(newObjCheckedAll);
    }
  };

  const handleChangeName = (id: string, value: string) => {
    const arr = dataAds?.map((item: AdsType) => {
      if (item.id === id) item.name = value;
      return item;
    });
    const arrSubCampaign = campaign?.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === subCampaignId) {
          item.ads = arr;
        }
        return item;
      }
    );
    const newCampaign: CampaignType = { ...campaign };
    newCampaign.subCampaign = arrSubCampaign;
    setCampaign(newCampaign);
  };

  const handleChangeQuantity = (id: string, value: number) => {
    const arr = dataAds?.map((item: AdsType) => {
      if (item.id === id) item.quantity = value;
      return item;
    });
    const arrSubCampaign = campaign?.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === subCampaignId) {
          item.ads = arr;
        }
        return item;
      }
    );
    const newCampaign: CampaignType = { ...campaign };
    newCampaign.subCampaign = arrSubCampaign;
    setCampaign(newCampaign);
  };

  const handleDeleteAds = (adsId: string[]) => {
    const newCampaign = { ...campaign };
    newCampaign.subCampaign = newCampaign.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === subCampaignId) {
          item.ads = item.ads.filter((x: AdsType) => !adsId?.includes(x.id));
          if (!item.ads.length) {
            const newObjCheckedAll = { ...objCheckedAll };
            newObjCheckedAll[subCampaignId] = false;
            setObjCheckedAll(newObjCheckedAll);
          }
        }
        return item;
      }
    );
    setCampaign(newCampaign);
  };

  const handleAddAds = () => {
    const newCampaign = { ...campaign };
    newCampaign.subCampaign = newCampaign.subCampaign?.map(
      (item: SubCampaignType) => {
        if (item.id === subCampaignId) {
          const newAds: AdsType = {
            id: helpers.generateUniqueId(),
            name: "Quảng cáo mới",
            quantity: 1,
          };
          item.ads.push(newAds);
        }
        return item;
      }
    );
    setCampaign(newCampaign);
  };

  return (
    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={
              !dataAds
                ?.map((item: AdsType) => item.id)
                ?.some((x: string) => objChecked?.[subCampaignId]?.[x])
            }
            onClick={() =>
              handleDeleteAds(
                dataAds
                  ?.filter(
                    (item: AdsType) => objChecked?.[subCampaignId]?.[item.id]
                  )
                  ?.map((x: AdsType) => x.id)
              )
            }
          >
            Xóa
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddAds}
          >
            Thêm
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={objCheckedAll[subCampaignId] ? true : false}
                    onChange={() =>
                      handleCheckAll(!objCheckedAll[subCampaignId])
                    }
                  />
                </TableCell>
                <TableCell>Tên quảng cáo *</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAds.map((row: AdsType) => {
                return (
                  <TableRow key={row?.id}>
                    <TableCell component="th" scope="row">
                      <Checkbox
                        color="primary"
                        checked={
                          objChecked?.[subCampaignId]?.[row.id] ? true : false
                        }
                        onChange={(event) => {
                          handleCheck(row?.id, event.target.checked);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        // variant="standard"
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                        value={row?.name}
                        error={isSubmit && !row?.name}
                        onChange={(event: any) =>
                          handleChangeName(row?.id, event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        // variant="standard"
                        type="number"
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                        value={row?.quantity}
                        error={isSubmit && !(row?.quantity > 0)}
                        onChange={(event: any) =>
                          handleChangeQuantity(row?.id, event.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleDeleteAds([row?.id])}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TableAds;
