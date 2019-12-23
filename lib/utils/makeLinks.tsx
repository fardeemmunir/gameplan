interface Node {
  node: string;
  pointsTo: string[];
}

function makeLinks(nodeList: Node[]) {
  let links = [];

  nodeList.forEach(({ node, pointsTo }) => {
    links = links.concat(pointsTo.map(target => ({ source: node, target })));
  });

  return links;
}

export default makeLinks;
