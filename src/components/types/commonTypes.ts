export interface IPhotoObject {
  album: string;
  id: number;
  marked?: boolean;
  path: string;
  aldate?: string;
}

export interface IAlbumInfo {
  albumDate: string;
  albumName: string;
  photoAmount: number;
  hasMarked: boolean;
  marketCount: number;
}

export interface ICountryTypeInfo {
  id: number;
  countryCode: string;
  name: string;
  phoneCode: string;
}

export interface ICountriesType {
  id: number;
  name: string;
  currency: string;
  phone: number;
  capital: string;
  code: string;
  code3: string;
  number: number;
}
