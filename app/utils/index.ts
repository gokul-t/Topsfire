import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
import config from "../config";

// import _ from "lodash";

// export function getAll(request) {
//   return request.then(function (response) {
//     if (!response._paging || !response._paging.next) {
//       return response;
//     }
//     // Request the next page and return both responses as one collection
//     return Promise.all([
//       response,
//       getAll(response._paging.next)
//     ]).then(function (responses) {
//       return _.flatten(responses);
//     });
//   });
// }
export function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Display an interstitial
export function adMobInterstitial() {
  if (!config.ads)
    return;
  AdMobInterstitial.setAdUnitID(config.adUnitID.interstitial);
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  return AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
}

// Display a rewarded ad
export function adMobRewarded() {
  if (!config.ads)
    return;
  AdMobRewarded.setAdUnitID(config.adUnitID.rewardedVideo);
  return AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
}

export function titleCase(string = "") {
  try {
    let sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  } catch (e) {
    return string
  }
}