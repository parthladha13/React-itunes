export const FBAppId = "284201858767022"; // Something like 851689001674888

export const populate = (data, key) =>
  [...new Set(data.map(e => e[key]))].map(i => ({
    value: i,
    label: i
  }));
