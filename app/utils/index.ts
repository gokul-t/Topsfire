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

export function titleCase(string = "") {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}