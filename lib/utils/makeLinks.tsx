import { Class } from "../reducer";

function makeLinksFromClassList(classList: Class[]) {
  let links = [];

  classList
    .map(({ id, prereqs }) => ({ node: id, pointsTo: prereqs }))
    .forEach(({ node, pointsTo }) => {
      links = links.concat(pointsTo.map(target => ({ source: node, target })));
    });

  return links;
}

export default makeLinksFromClassList;
