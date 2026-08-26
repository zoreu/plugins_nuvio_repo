var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const MOD_TEST = false;
const PROXY_CORS = false;
const CORS_PROXY_URL = "https://corsproxy.io/?url=";
const DEMO_STREAMS = {
  "movie": {
    "27205": [
      // Inception
      {
        "name": "Meu Vod",
        "title": "A Origem (Inception) - 1080p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "quality": "FHD"
      },
      {
        "name": "Meu Vod",
        "title": "A Origem (Inception) - 720p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "quality": "HD"
      },
      {
        "name": "Meu Vod",
        "title": "A Origem (Inception) - SD",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "quality": "SD"
      }
    ],
    "155": [
      // The Dark Knight
      {
        "name": "Meu Vod",
        "title": "The Dark Knight - 1080p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "quality": "FHD"
      },
      {
        "name": "Meu Vod",
        "title": "The Dark Knight - 720p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "quality": "HD"
      }
    ],
    "603": [
      // The Matrix
      {
        "name": "Meu Vod",
        "title": "The Matrix - 1080p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "quality": "FHD"
      },
      {
        "name": "Meu Vod",
        "title": "The Matrix - 720p",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "quality": "HD"
      }
    ]
  },
  "series": {
    "1399": {
      // Game of Thrones
      "1": {
        // Season 1
        "1": [
          // Episode 1
          {
            "name": "Meu Vod",
            "title": "Game of Thrones S01E01 - 1080p",
            "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "quality": "FHD"
          },
          {
            "name": "Meu Vod",
            "title": "Game of Thrones S01E01 - 720p",
            "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "quality": "HD"
          }
        ]
      }
    },
    "1396": {
      // Breaking Bad
      "1": {
        // Season 1
        "1": [
          // Episode 1
          {
            "name": "Meu Vod",
            "title": "Breaking Bad S01E01 - 1080p",
            "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "quality": "FHD"
          },
          {
            "name": "Meu Vod",
            "title": "Breaking Bad S01E01 - 720p",
            "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "quality": "HD"
          }
        ]
      }
    }
  }
};
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36",
  "Accept": "application/json",
  "Accept-Language": "pt-BR,en-US;q=0.9"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    console.log(`[HTTP] Fetching: ${url.substring(0, 80)}...`);
    const response = yield fetch(url, __spreadValues({
      headers: __spreadValues(__spreadValues({}, HEADERS), options.headers)
    }, options));
    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : "unknown"}`);
    }
    return response.text();
  });
}
function fetchJson(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const raw = yield fetchText(url, options);
    return JSON.parse(raw);
  });
}
function extractDataFromProxy(data) {
  if (data && typeof data === "object" && data.body) {
    console.log('[MeuVOD] Extraindo dados da chave "body" do proxy');
    try {
      if (typeof data.body === "string") {
        return JSON.parse(data.body);
      }
      return data.body;
    } catch (e) {
      console.error("[MeuVOD] Erro ao fazer parse do body:", e.message);
      return null;
    }
  }
  return data;
}
const PROVIDER_NAME = "Meu Vod";
const TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const MAX_RESULTS = 5;
const CACHE_TIMEOUT = 600;
const MAX_CANDIDATES = 10;
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:109.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
];
let userAgentIndex = 0;
const XTREAM_SERVERS = [
  {
    "url": "http://auth.dnskode.com",
    "username": "ander0545",
    "password": "ander132",
    "name": "Servidor 1"
  },
  {
    "url": "http://auth.dnskode.com",
    "username": "MarcusFatima",
    "password": "22032020",
    "name": "Servidor 2"
  },
  {
    "url": "http://auth.dnskode.com",
    "username": "RAFAELNEGRELLO20",
    "password": "6h6idpmk9mg",
    "name": "Servidor 3"
  },
  {
    "url": "http://auth.dnskode.com",
    "username": "felipaosoares",
    "password": "o73e6f2vqb5",
    "name": "Servidor 4"
  }
];
const cache = {};
const tmdbCache = {};
function getNextUserAgent() {
  const ua = USER_AGENTS[userAgentIndex];
  userAgentIndex = (userAgentIndex + 1) % USER_AGENTS.length;
  return ua;
}
function getCache(cacheObj, key, timeout) {
  if (cacheObj[key]) {
    const cached = cacheObj[key];
    if (Date.now() - cached.timestamp < timeout * 1e3) {
      return cached.data;
    }
  }
  return null;
}
function setCache(cacheObj, key, data) {
  cacheObj[key] = {
    data,
    timestamp: Date.now()
  };
}
function buildUrl(baseUrl, params) {
  const parts = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }
  }
  return baseUrl + "?" + parts.join("&");
}
function normalizeText(text) {
  if (!text) return "";
  text = text.toLowerCase();
  const accents = {
    "\xE1": "a",
    "\xE0": "a",
    "\xE2": "a",
    "\xE3": "a",
    "\xE4": "a",
    "\xE9": "e",
    "\xE8": "e",
    "\xEA": "e",
    "\xEB": "e",
    "\xED": "i",
    "\xEC": "i",
    "\xEE": "i",
    "\xEF": "i",
    "\xF3": "o",
    "\xF2": "o",
    "\xF4": "o",
    "\xF5": "o",
    "\xF6": "o",
    "\xFA": "u",
    "\xF9": "u",
    "\xFB": "u",
    "\xFC": "u",
    "\xE7": "c",
    "\xF1": "n"
  };
  for (const key in accents) {
    if (accents.hasOwnProperty(key)) {
      text = text.replace(new RegExp(key, "g"), accents[key]);
    }
  }
  text = text.replace(/[^\w\s]/g, " ");
  text = text.replace(/\s+/g, " ").trim();
  return text;
}
function tokensContained(normalizedTitle, streamTitleClean) {
  const titleTokens = normalizedTitle.split(" ").filter((t) => t.length > 2);
  if (titleTokens.length === 0) return false;
  const streamTokens = new Set(streamTitleClean.split(" "));
  return titleTokens.every((t) => streamTokens.has(t));
}
function calculateSimilarity(text1, text2) {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);
  const tokens1 = norm1.split(" ");
  const tokens2 = norm2.split(" ");
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = /* @__PURE__ */ new Set([...set1, ...set2]);
  if (union.size === 0) return 0;
  const jaccard = intersection.size / union.size;
  let matches = 0;
  const minLen = Math.min(norm1.length, norm2.length);
  for (let i = 0; i < minLen; i++) {
    if (norm1[i] === norm2[i]) matches++;
  }
  const sequenceSim = matches / Math.max(norm1.length, norm2.length);
  return jaccard * 0.7 + sequenceSim * 0.3;
}
const QUALITY_MAP = {
  "4K": "4K",
  "FHD": "1080p",
  "HD": "720p",
  "SD": "480p",
  "CAM": "CAM"
};
function mapQuality(quality) {
  return QUALITY_MAP[quality] || quality || "480p";
}
function extractQuality(name) {
  const nameLower = name.toLowerCase();
  if (/4k|2160/.test(nameLower)) return "4K";
  if (/fhd|full hd|1080/.test(nameLower)) return "FHD";
  if (/hd|720/.test(nameLower)) return "HD";
  if (/cam|hdcam|cinema|ts/.test(nameLower)) return "CAM";
  return "SD";
}
function extractTitleFromName(name) {
  let title = name.replace(/\s*(?:HD|FHD|4K|CAM|HDCAM|TS|WEB|WEB-DL|BluRay|DVD|HDRip|BDRip|480p|720p|1080p|2160p)\s*/gi, "");
  title = title.replace(/\s*[\[\(]\d{4}[\]\)]\s*/g, "");
  return title.trim();
}
function extractYearFromName(name) {
  const match = name.match(/[\[\(](\d{4})[\]\)]/);
  return match ? match[1] : "";
}
function getVideoQualityFromInfo(info) {
  if (!info) return "SD";
  let quality = "SD";
  const video = info.video || {};
  if (video) {
    const width = video.width || 0;
    const height = video.height || 0;
    if (width >= 3840 || height >= 2160) quality = "4K";
    else if (width >= 1920 || height >= 1080) quality = "FHD";
    else if (width >= 1280 || height >= 720) quality = "HD";
    else if (width > 0 && height > 0) quality = "SD";
  }
  return quality;
}
function getDemoStreams(tmdbId, mediaType, season, episode) {
  console.log(`[MeuVOD] Modo TESTE ativado!`);
  console.log(`[MeuVOD] Retornando streams demonstrativos para: ${tmdbId}`);
  let streams = [];
  if (mediaType === "movie" || mediaType === "movies") {
    const movieStreams = DEMO_STREAMS.movie[tmdbId];
    if (movieStreams) {
      streams = movieStreams.map((s) => ({
        "name": PROVIDER_NAME,
        "title": s.title,
        "url": s.url,
        "quality": mapQuality(s.quality)
      }));
    } else {
      streams = [
        {
          "name": PROVIDER_NAME,
          "title": `Filme (${tmdbId}) - 1080p (DEMO)`,
          "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          "quality": "1080p"
        },
        {
          "name": PROVIDER_NAME,
          "title": `Filme (${tmdbId}) - 720p (DEMO)`,
          "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          "quality": "720p"
        }
      ];
    }
  } else if (mediaType === "tv" || mediaType === "series") {
    const seasonNum = String(season || 1);
    const episodeNum = String(episode || 1);
    const seriesData = DEMO_STREAMS.series[tmdbId];
    if (seriesData && seriesData[seasonNum] && seriesData[seasonNum][episodeNum]) {
      const episodeStreams = seriesData[seasonNum][episodeNum];
      streams = episodeStreams.map((s) => ({
        "name": PROVIDER_NAME,
        "title": s.title,
        "url": s.url,
        "quality": mapQuality(s.quality)
      }));
    } else {
      streams = [
        {
          "name": PROVIDER_NAME,
          "title": `S\xE9rie S${String(season || 1).padStart(2, "0")}E${String(episode || 1).padStart(2, "0")} - 1080p (DEMO)`,
          "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          "quality": "1080p"
        },
        {
          "name": PROVIDER_NAME,
          "title": `S\xE9rie S${String(season || 1).padStart(2, "0")}E${String(episode || 1).padStart(2, "0")} - 720p (DEMO)`,
          "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          "quality": "720p"
        }
      ];
    }
  }
  return streams.slice(0, MAX_RESULTS);
}
function getTMDBInfo(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (MOD_TEST) {
      return {
        "title": tmdbId === "27205" ? "A Origem" : tmdbId === "155" ? "The Dark Knight" : tmdbId === "603" ? "The Matrix" : tmdbId === "1399" ? "Game of Thrones" : tmdbId === "1396" ? "Breaking Bad" : `Filme/S\xE9rie ${tmdbId}`,
        "year": "2020",
        "type": mediaType === "tv" || mediaType === "series" ? "series" : "movie",
        "tmdb_id": parseInt(tmdbId),
        "original_title": ""
      };
    }
    const cacheKey = `tmdb_${tmdbId}_${mediaType}`;
    const cached = getCache(tmdbCache, cacheKey, 86400);
    if (cached) {
      return cached;
    }
    const endpoint = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
    const params = {
      "api_key": TMDB_API_KEY,
      "language": "pt-BR"
    };
    const url = buildUrl(`${TMDB_BASE_URL}/${endpoint}/${tmdbId}`, params);
    try {
      const data = yield fetchJson(url);
      let result = null;
      if (endpoint === "movie") {
        result = {
          "title": data.title || "",
          "year": data.release_date ? data.release_date.substring(0, 4) : "",
          "type": "movie",
          "tmdb_id": data.id,
          "original_title": data.original_title || ""
        };
      } else {
        result = {
          "title": data.name || "",
          "year": data.first_air_date ? data.first_air_date.substring(0, 4) : "",
          "type": "series",
          "tmdb_id": data.id,
          "original_title": data.original_name || ""
        };
      }
      if (result) {
        setCache(tmdbCache, cacheKey, result);
      }
      return result;
    } catch (error) {
      console.error("[MeuVOD] TMDB error:", error.message);
      return null;
    }
  });
}
function makeXtreamRequest(server, action, params) {
  return __async(this, null, function* () {
    const url = server.url + "/player_api.php";
    const queryParams = {
      "username": server.username,
      "password": server.password,
      "action": action
    };
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams[key] = params[key];
        }
      }
    }
    const fullUrl = buildUrl(url, queryParams);
    let finalUrl = fullUrl;
    if (PROXY_CORS) {
      finalUrl = CORS_PROXY_URL + encodeURIComponent(fullUrl);
      console.log(`[MeuVOD] Usando proxy CORS para: ${server.name}`);
    }
    try {
      const rawData = yield fetchJson(finalUrl);
      let data = rawData;
      if (PROXY_CORS) {
        data = extractDataFromProxy(rawData);
        if (!data) {
          throw new Error("Falha ao extrair dados do proxy");
        }
      }
      console.log(`[MeuVOD] Xtream OK (${server.name}): ${action}`);
      return data;
    } catch (error) {
      console.error(`[MeuVOD] Xtream error (${server.name}):`, error.message);
      throw error;
    }
  });
}
function loadServerData(server, loadType) {
  return __async(this, null, function* () {
    const serverKey = `${server.url}_${server.username}_${loadType}`;
    const cached = getCache(cache, serverKey, CACHE_TIMEOUT);
    if (cached) {
      return cached;
    }
    const action = loadType === "movies" ? "get_vod_streams" : "get_series";
    try {
      const data = yield makeXtreamRequest(server, action);
      const items = [];
      const itemsIndex = {};
      if (data && Array.isArray(data)) {
        for (const stream of data) {
          if (typeof stream !== "object") continue;
          const name = stream.name || "";
          const id = stream.stream_id || stream.series_id || "";
          if (name && id) {
            const title = extractTitleFromName(name);
            const year = extractYearFromName(name);
            const quality = extractQuality(name);
            const streamInfo = {
              "name": name,
              "title": title,
              "year": year,
              "quality": quality,
              "id": id,
              "stream_type": loadType === "movies" ? "movie" : "series",
              "raw_data": stream,
              "quality_detailed": false,
              "url": null,
              "server_name": server.name
            };
            if (loadType === "movies") {
              streamInfo.url = `${server.url}/movie/${server.username}/${server.password}/${id}.${stream.container_extension || "mp4"}`;
              streamInfo.stream_id = id;
            } else {
              streamInfo.series_id = id;
            }
            items.push(streamInfo);
            const titleKey = title.toLowerCase();
            if (!itemsIndex[titleKey]) {
              itemsIndex[titleKey] = [];
            }
            itemsIndex[titleKey].push(streamInfo);
          }
        }
      }
      const result = {
        "name": server.name,
        "url": server.url,
        "username": server.username,
        "password": server.password,
        "load_type": loadType,
        "items": items,
        "items_index": itemsIndex,
        "last_update": Date.now()
      };
      setCache(cache, serverKey, result);
      return result;
    } catch (error) {
      console.error(`[MeuVOD] loadServerData error (${server.name}):`, error.message);
      return null;
    }
  });
}
function loadAllServers(loadType) {
  return __async(this, null, function* () {
    const promises = XTREAM_SERVERS.map(
      (server) => loadServerData(server, loadType).catch((error) => {
        console.error(`[MeuVOD] Servidor falhou (${server.name}):`, error);
        return null;
      })
    );
    const results = yield Promise.all(promises);
    return results.filter((result) => result !== null);
  });
}
function findEpisode(seriesInfo, season, episode) {
  const episodes = seriesInfo.episodes || {};
  const seasonKey = String(season);
  if (episodes[seasonKey]) {
    const seasonEpisodes = episodes[seasonKey];
    for (const ep of seasonEpisodes) {
      if (String(ep.episode_num) === String(episode)) {
        return ep;
      }
    }
  }
  return null;
}
function enhanceQuality(server, stream, streamType) {
  return __async(this, null, function* () {
    if (stream.quality_detailed) {
      return stream;
    }
    try {
      if (streamType === "movie") {
        const vodId = stream.stream_id;
        if (!vodId) {
          stream.quality_detailed = true;
          return stream;
        }
        const vodInfo = yield makeXtreamRequest(server, "get_vod_info", { "vod_id": vodId });
        if (vodInfo && vodInfo.info) {
          const detailedQuality = getVideoQualityFromInfo(vodInfo.info);
          if (detailedQuality !== "SD") {
            stream.quality = detailedQuality;
          }
          stream.stream_info = vodInfo.info;
        }
        stream.quality_detailed = true;
        return stream;
      } else {
        const seriesId = stream.series_id;
        if (!seriesId) {
          stream.quality_detailed = true;
          return stream;
        }
        const seriesInfo = yield makeXtreamRequest(server, "get_series_info", { "series_id": seriesId });
        if (seriesInfo && seriesInfo.episodes) {
          for (const seasonKey in seriesInfo.episodes) {
            if (seriesInfo.episodes.hasOwnProperty(seasonKey)) {
              const season = seriesInfo.episodes[seasonKey];
              if (season && season.length > 0) {
                const ep = season[0];
                if (ep.info) {
                  const detailedQuality = getVideoQualityFromInfo(ep.info);
                  if (detailedQuality !== "SD") {
                    stream.quality = detailedQuality;
                  }
                  stream.stream_info = ep.info;
                }
                break;
              }
            }
          }
        }
        stream.quality_detailed = true;
        return stream;
      }
    } catch (error) {
      console.error("[MeuVOD] Enhance quality error:", error.message);
      stream.quality_detailed = true;
      return stream;
    }
  });
}
function findCandidates(serverDataList, title, originalTitle, year, isSeries) {
  var _a;
  const candidates = [];
  const normalizedTitle = normalizeText(title);
  const normalizedOriginal = originalTitle ? normalizeText(originalTitle) : "";
  const titleTokens = new Set(normalizedTitle.split(" "));
  const qualityOrder = { "CAM": 0, "SD": 1, "HD": 2, "FHD": 3, "4K": 4 };
  const commonWords = /* @__PURE__ */ new Set(["o", "a", "os", "as", "de", "da", "do", "em", "para", "por", "com", "sem", "sobre"]);
  for (const serverData of serverDataList) {
    const itemsIndex = serverData.items_index || {};
    const server = XTREAM_SERVERS.find((s) => s.name === serverData.name);
    if (!server) continue;
    for (const streamTitle in itemsIndex) {
      if (!itemsIndex.hasOwnProperty(streamTitle)) continue;
      const streamList = itemsIndex[streamTitle];
      const streamTitleClean = streamTitle.toLowerCase().replace(/[:\-]/g, " ").replace(/\s+/g, " ").trim();
      let exactMatch = normalizedTitle === streamTitleClean;
      let originalMatch = normalizedOriginal && normalizedOriginal === streamTitleClean;
      let similarity = 0;
      if (!exactMatch && !originalMatch) {
        similarity = calculateSimilarity(normalizedTitle, streamTitleClean);
        const streamTokens = new Set(streamTitleClean.split(" "));
        const extraTokens = new Set([...streamTokens].filter((x) => !titleTokens.has(x)));
        const filteredExtra = [...extraTokens].filter((t) => !commonWords.has(t) && t.length > 2);
        if (filteredExtra.length > 2) continue;
        if (tokensContained(normalizedTitle, streamTitleClean)) {
          similarity = Math.max(similarity, 0.85);
        }
        if (similarity < 0.7) continue;
      } else {
        similarity = 1;
      }
      const streamYear = ((_a = streamList[0]) == null ? void 0 : _a.year) || null;
      if (year && streamYear && year !== streamYear && !exactMatch && !originalMatch) {
        continue;
      }
      if (isSeries && similarity < 0.9 && !exactMatch && !originalMatch) {
        continue;
      }
      for (const stream of streamList) {
        const qualityScore = (qualityOrder[stream.quality] || 0) / 4;
        let bonus = 0;
        if (exactMatch) bonus = 0.2;
        else if (originalMatch) bonus = 0.15;
        let yearBonus = 0;
        if (year && streamYear && year === streamYear) yearBonus = 0.1;
        const finalScore = similarity * 0.7 + qualityScore * 0.2 + bonus + yearBonus;
        if (finalScore > 0.5) {
          const streamCopy = __spreadValues({}, stream);
          streamCopy.score = finalScore;
          streamCopy.similarity = similarity;
          streamCopy.exact_match = exactMatch || originalMatch;
          streamCopy.year_match = year && streamYear && year === streamYear || false;
          streamCopy.source = server.name;
          streamCopy.server = server;
          candidates.push(streamCopy);
        }
      }
    }
  }
  return candidates;
}
function processMovieCandidates(candidates) {
  return __async(this, null, function* () {
    const promises = candidates.map((stream) => __async(null, null, function* () {
      if (!stream.url) return stream;
      const server = stream.server || XTREAM_SERVERS.find((s) => s.name === stream.source);
      if (!server) return stream;
      try {
        return yield enhanceQuality(server, stream, "movie");
      } catch (error) {
        return stream;
      }
    }));
    return yield Promise.all(promises);
  });
}
function processSeriesCandidates(candidates, seasonNum, episodeNum) {
  return __async(this, null, function* () {
    const promises = candidates.map((stream) => __async(null, null, function* () {
      const seriesId = stream.series_id;
      if (!seriesId) return null;
      const server = stream.server || XTREAM_SERVERS.find((s) => s.name === stream.source);
      if (!server) return null;
      try {
        const seriesInfo = yield makeXtreamRequest(server, "get_series_info", { "series_id": seriesId });
        if (!seriesInfo || !seriesInfo.episodes) return null;
        const episodeFound = findEpisode(seriesInfo, seasonNum, episodeNum);
        if (!episodeFound) return null;
        let epQuality = "SD";
        if (episodeFound.info) {
          epQuality = getVideoQualityFromInfo(episodeFound.info);
        }
        const streamCopy = __spreadValues({}, stream);
        streamCopy.url = `${server.url}/series/${server.username}/${server.password}/${episodeFound.id}.mp4`;
        streamCopy.episode_name = episodeFound.title || "";
        streamCopy.episode_info = episodeFound;
        if (epQuality !== "SD") {
          streamCopy.quality = epQuality;
        }
        streamCopy.quality_detailed = true;
        return streamCopy;
      } catch (error) {
        console.error("[MeuVOD] Erro buscar epis\xF3dio:", error.message);
        return null;
      }
    }));
    const results = yield Promise.all(promises);
    return results.filter((result) => result !== null);
  });
}
function formatResults(streams, title, isSeries, seasonNum, episodeNum) {
  const formattedResults = [];
  const processedUrls = /* @__PURE__ */ new Set();
  for (const stream of streams) {
    if (!stream.url) continue;
    if (processedUrls.has(stream.url)) continue;
    processedUrls.add(stream.url);
    const displayTitle = isSeries ? `${title} S${String(seasonNum).padStart(2, "0")}E${String(episodeNum).padStart(2, "0")}` : title;
    formattedResults.push({
      "name": PROVIDER_NAME,
      "title": displayTitle,
      "url": stream.url,
      "quality": mapQuality(stream.quality || "SD")
    });
    if (formattedResults.length >= MAX_RESULTS) break;
  }
  return formattedResults;
}
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    console.log(`[MeuVOD] Buscando TMDB ID: ${tmdbId} - Tipo: ${mediaType}`);
    console.log(`[MeuVOD] Proxy CORS: ${PROXY_CORS ? "ATIVADO" : "DESATIVADO"}`);
    if (MOD_TEST) {
      console.log(`[MeuVOD] MODO TESTE ATIVADO!`);
      const demoStreams = getDemoStreams(tmdbId, mediaType, season, episode);
      console.log(`[MeuVOD] Streams demonstrativos: ${demoStreams.length}`);
      return demoStreams;
    }
    try {
      const isSeries = mediaType === "tv" || mediaType === "series";
      const seasonNum = season || 1;
      const episodeNum = episode || 1;
      const loadType = isSeries ? "series" : "movies";
      const cacheKey = `${tmdbId}_${mediaType}_${seasonNum}_${episodeNum}`;
      const cached = getCache(cache, cacheKey, CACHE_TIMEOUT);
      if (cached) {
        console.log(`[MeuVOD] Cache hit: ${cached.length} streams`);
        return cached.slice(0, MAX_RESULTS);
      }
      const tmdbInfo = yield getTMDBInfo(tmdbId, mediaType);
      if (!tmdbInfo) {
        console.log(`[MeuVOD] TMDB info not found para ID: ${tmdbId}`);
        return [];
      }
      const title = tmdbInfo.title || "";
      const year = tmdbInfo.year || "";
      const originalTitle = tmdbInfo.original_title || "";
      console.log(`[MeuVOD] T\xEDtulo: ${title} (${year})`);
      const serverDataList = yield loadAllServers(loadType);
      if (!serverDataList || serverDataList.length === 0) {
        console.log("[MeuVOD] Nenhum servidor carregado");
        return [];
      }
      console.log(`[MeuVOD] Servidores carregados: ${serverDataList.length}`);
      const candidates = findCandidates(serverDataList, title, originalTitle, year, isSeries);
      console.log(`[MeuVOD] Candidatos encontrados: ${candidates.length}`);
      if (candidates.length === 0) {
        return [];
      }
      candidates.sort((a, b) => b.score - a.score);
      const topCandidates = candidates.slice(0, MAX_CANDIDATES);
      let streams;
      if (isSeries) {
        streams = yield processSeriesCandidates(topCandidates, seasonNum, episodeNum);
      } else {
        streams = yield processMovieCandidates(topCandidates);
      }
      const formattedResults = formatResults(streams, title, isSeries, seasonNum, episodeNum);
      if (formattedResults.length > 0) {
        setCache(cache, cacheKey, formattedResults);
      }
      console.log(`[MeuVOD] Streams finais: ${formattedResults.length}`);
      return formattedResults;
    } catch (error) {
      console.error("[MeuVOD] Erro getStreams:", error.message);
      return [];
    }
  });
}
module.exports = { getStreams };
