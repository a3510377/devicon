import axios from 'axios';

export const gitHubPath = 'devicons/devicon';
export const versionStr = '@master';
export const baseURL = `https://cdn.jsdelivr.net/gh/${gitHubPath}${versionStr}/`;

export const mainVersionsArray = [
  'plain',
  'line',
  'original',
  'plain-wordmark',
  'line-wordmark',
  'original-wordmark',
];

export const getDeviconData = async () => {
  const returnData: deviconDictType = {};
  const deviconData: deviconRequestDataType[] = await axios
    .get(`${baseURL}devicon.json`)
    .then((data) => data.data);

  deviconData.forEach((data) => {
    let baseVersion = data.versions.font[0];

    for (const version of mainVersionsArray) {
      if (version in data.versions.font) baseVersion = version;
    }

    returnData[data.name] = { ...data, base: baseVersion };
  });

  return returnData;
};

export const getSvgURL = (name: string, svgVersion: string) =>
  `${baseURL}icons/${name}/${name}-${svgVersion}.svg`;

// export const getDeviconSvg = (name: string, svgVersion: string) =>
//   axios.get(getSvgURL(name, svgVersion)).then((data): string => data.data);

export interface deviconRequestDataType {
  name: string;
  tags: string[];
  versions: { svg: string[]; font: string[] };
  color: string;
  aliases: { base: string; alias: string }[];
}

export interface deviconDataType extends deviconRequestDataType {
  base: string;
}

export type deviconDictType = Record<string, deviconDataType>;
