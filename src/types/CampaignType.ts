export type InformationType = {
  name: string;
  describe: string;
};

export type AdsType = {
  id: string;
  name: string;
  quantity: number;
};

export type SubCampaignType = {
  id: string;
  name: string;
  status: boolean;
  ads: AdsType[];
};

export type CampaignType = {
  information: InformationType;
  subCampaign: SubCampaignType[];
};
