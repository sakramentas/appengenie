export function flatten(arr) {
  return [].concat(...arr);
}

export function deepFlatten(arr) {
  return flatten(           // return shalowly flattened array
    arr.map(x =>             // with each x in array
      Array.isArray(x.title)      // is x an array?
        ? deepFlatten(x)    // if yes, return deeply flattened x
        : x.title.split(' ')                 // if no, return just x
    )
  );
}

export const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


// return deepFlatten(issues)
// function flatten(arr) {
//   let itemsKey = [];
//   arr.map(item => itemsKey.push(item.title))
//   return itemsKey.reduce(function (flat, toFlatten) {
//     return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
//   }, []);
// }
//
// console.log(flatten(issues))
// return flatten(issues)
//
// let issuesKey2 = [];
// issues.map(issue => issuesKey.push(issue.title))
// let result = [].concat.apply(issuesKey)
// result.forEach(j => {
//   let splitted = j;
//   issuesKey2.push(splitted);
// })
// console.log(issuesKey2)
// return issues.filter(issue => !issue.title.indexOf(filter))
// let filteredIssues = issues.filter(issue => {
//   let splittedTerms = issue.title.split(' ');
//   console.log('splitted', splittedTerms);
// }).map(e => !e.indexOf(filter))
// return filteredIssues
// return issues.filter(issue => {
//   for (let j in issue) {
//     return !issue.title.indexOf(filterTerm[j]) || ''
//   }
// });

// return _.filter(issues, item => {
//   return _.every(filterTerm, key => item[key] === filterTerm[key])
// })
// return _.filter(issues, function (issue) {
//   return _.some(issue.title, function (tag) {
//     return _.startsWith(tag, filter);
//   });
// });
// var test = _.filter(issues, issue => {
//   // return _.chain(issue.title)
//   //   .map(_.partial(_.startsWith, _, filter))
//   //   .any()
//   //   .value();
//   return !issue.title.indexOf(filter) || ''
// });
