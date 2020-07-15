import AppJson from "../../app"
const env = require("./env")

export default {
  ...AppJson,
  titleCase: true,
  ads: true,
  followUs: [
    {
      name: "Facebook",
      icon: "facebook",
      url: "https://www.facebook.com/topmostcraftidea",
    },
    {
      name: "Youtube",
      icon: "youtube",
      url: null,
    },
    {
      name: "Twitter",
      icon: "twitter",
      url: null,
    },
    {
      name: "Website",
      icon: "search-web",
      url: env.API_URL,
    },
  ],
  adUnitID: env.adUnitID || {
    banner: "ca-app-pub-3940256099942544/6300978111",
    interstitial: "ca-app-pub-3940256099942544/1033173712",
    interstitialVideo: "ca-app-pub-3940256099942544/8691691433",
    rewardedVideo: "ca-app-pub-3940256099942544/5224354917",
    nativeAdvanced: "ca-app-pub-3940256099942544/2247696110",
    nativeAdvancedVideo: "ca-app-pub-3940256099942544/1044960115",
  },
  dateFormat: "MMM d, Y",
  iconUri: env.ICON_URI || "https://via.placeholder.com/100",
}
