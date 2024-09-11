export type Countries = {
  code: string;
  name: string;
  capital: string;
  languages: Array<{
    native: string;
  }>;
  states: Array<{
    name: string;
  }>;
  continent: {
    code: string;
    name: string;
  };
  currency?: string;
  imageUrl?: string;
};

export type DataToSearch = {
  country: string;
  continents: Array<string>;
};
