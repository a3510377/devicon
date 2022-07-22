import axios from 'axios';

export const mainVersionsArray = [
  'plain',
  'line',
  'original',
  'plain-wordmark',
  'line-wordmark',
  'original-wordmark',
];

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

export const getDeviconData = () =>
  axios
    .get('https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.json')
    .then((data): deviconRequestDataType[] => data.data)
    .then((data) => {
      return data.map((data) => {
        let baseVersion = data.versions.font[0];

        for (const version of mainVersionsArray) {
          if (version in data.versions.font) baseVersion = version;
        }

        return { ...data, base: baseVersion };
      });
    });
