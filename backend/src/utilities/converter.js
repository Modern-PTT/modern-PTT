const hashStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

const toArticleURL = (brdname, aid) => {
  return `https://www.ptt.cc/bbs/${brdname}/${aid}.html`
}

const toAIDc = (aidu, brdname) => {
  const [_, timestamp, random] = aidu.match(/^(?:M|G)\.(\d+)\.A(?:\.([0-9A-F]{3}))?/);

  let aidc = "";
  for(let r = parseInt(random, 16); r > 0; r = Math.floor(r / 64)) {
    aidc = hashStr[r % 64] + aidc;
  }
  aidc = aidc.padStart(2, '0');

  for(let t = parseInt(timestamp); t > 0; t = Math.floor(t / 64)) {
    aidc = hashStr[t % 64] + aidc;
  }
  return `#${aidc}(${brdname})`;
}

export { toArticleURL, toAIDc };