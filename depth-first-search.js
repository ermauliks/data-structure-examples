// Inspiration
// https://github.com/williamfiset/Algorithms/blob/master/com/williamfiset/algorithms/graphtheory/TopologicalSortAdjacencyList.java
// https://github.com/williamfiset/Algorithms/blob/master/com/williamfiset/algorithms/graphtheory/DepthFirstSearchAdjacencyListIterativeFastStack.java
console.clear();
class Node {
  constructor(id, value) {
    this.id = id;
    this.value = value;  
  }
}

class Edge {
  constructor(from, to, cost) {
    this.from = from;
    this.to = to;
    this.cost = cost;
  }
}

class Graph {
  constructor() {
    this.graph = new Map();
    this.set = new Set();
    this.prev = new Array();
  }
  
  get nodeCount() {
    return this.set.size;
  }
  
  addElement(element) {
    if (element != null)
      this.set.add(element);
  }
  
  addDirectedEdge(from, to, cost) {
    let list = this.graph.get(from);
    this.addElement(from);
    this.addElement(to);
    if (!list) {
      list = [];
      this.graph.set(from, list);
    }
    list.push(new Edge(from, to, cost));
  }
  
  dfsRecursive(at, visited) {
    if (visited[at]) return 0;
    visited[at] = true;
    let count = 1,
        edges = this.graph.get(at);
    if (edges != null) {
      for (let edge of edges) {
        count += this.dfsRecursive(edge.to, visited);
      }
    }
    return count;
  }
  
  dfsIterative(start, n) {
    let visited = new Array(n).fill(false),
        count = 0,
        stack = [start];

    while(stack.length) {
      let node = stack.pop();
      if (!visited[node]) {
        count++;
        visited[node] = true;
        let edges = this.graph.get(node);
        if (edges != null)
          for (let edge of edges)
            if (!visited[edge.to]) stack.push(edge.to);
      }
    }
    return count;
  }
  
  dfsTop(pos, at, visited, ordering) {
    visited[at] = true;
    let edges = this.graph.get(at);
    if (edges != null) {
      for (let edge of edges) {
        if (!visited[edge.to]) {
          pos = this.dfsTop(pos, edge.to, visited, ordering)
        }
      }
    }
    ordering[pos] = at;
    return pos - 1;
  }
  
  topologicalSort() {
    let ordering = new Array(this.nodeCount).fill(null);
    let visited = new Array(this.nodeCount).fill(false);
    let pos = this.nodeCount - 1;
    for (let at = 0; at < this.nodeCount; at++) {
      if (!visited[at]) {
        pos = this.dfsTop(pos, at, visited, ordering);
      }
    }
    return ordering;
  }
  
  dagShortestPath(start, end) {
    let topSort = this.topologicalSort();
    let dist = new Array(this.nodeCount).fill(null);
    let prev = new Array(this.nodeCount).fill(null);
    dist[start] = 0;
    for (let i = 0; i < this.nodeCount; i++) {
      let nodeIndex = topSort[i];
      console.log(nodeIndex, dist);
      if (dist[nodeIndex] != null) {
        let edges = this.graph.get(nodeIndex) || [];
        for (let edge of edges) {
          let newDist = dist[nodeIndex] + edge.cost;
          if (dist[edge.to] == null || newDist < dist[edge.to]) {
            dist[edge.to] = newDist;
            prev[edge.to] = edge.from;
          }
        }
      }
    }
    let path = [];
    console.log(prev)
    for (let at = end; at != null; at = prev[at])
      path.push(at);
    path.reverse();
    console.log(path);
    return dist[end];
  }

  // dagShortestPath(start) {
  //   let topSort = this.topologicalSort();
  //   let dist = new Array(this.nodeCount).fill(null);
  //   dist[start] = 0;
  //   console.log(topSort);
  //   for (let i = 0; i < this.nodeCount; i++) {
  //     let nodeIndex = topSort[i];
  //     if (dist[nodeIndex] != null) {
  //       let adjacentEdges = this.graph.get(nodeIndex);
  //       if (adjacentEdges != null) {
  //         for (let edge of adjacentEdges) {
  //           let newDist = dist[nodeIndex] + edge.cost;
  //           if (dist[edge.to] == null) {
  //             dist[edge.to] = newDist;
  //           } else {
  //             dist[edge.to] = Math.min(dist[edge.to], newDist);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return dist;
  // }
}

// DFS
// let graph = new Graph();
// graph.addDirectedEdge(0, 1, 4);
// graph.addDirectedEdge(0, 2, 5);
// graph.addDirectedEdge(1, 2, -2);
// graph.addDirectedEdge(1, 3, 6);
// graph.addDirectedEdge(2, 3, 1);
// graph.addDirectedEdge(2, 2, 10);
// graph.addDirectedEdge(4, null, 0);
// console.clear();
// let count = graph.dfsRecursive(0, new Array(graph.nodeCount).fill(false));
// if (count != 4) console.log('Problem with DFS'); else console.log('Total elements visited are recursively ' + count + ' from node ' + 0);
// count = graph.dfsIterative(0, graph.nodeCount);
// if (count != 4) console.log('Problem with DFS'); else console.log('Total elements visited are iteratively ' + count + ' from node ' + 0);
// console.log(graph.nodeCount);

// TOPOLOGICAL SORT ORDERING AND DISTANCE
let graph = new Graph();
// graph.graph.set(6, []);
graph.addDirectedEdge(0, 1, 3);
graph.addDirectedEdge(0, 2, 2);
graph.addDirectedEdge(0, 5, 3);
graph.addDirectedEdge(1, 3, 1);
graph.addDirectedEdge(1, 2, 6);
graph.addDirectedEdge(2, 3, 1);
graph.addDirectedEdge(2, 4, 10);
graph.addDirectedEdge(3, 4, 5);
graph.addDirectedEdge(5, 4, 7);
graph.addDirectedEdge(6, 0, 7);
// let ordering = graph.topologicalSort();
// console.log(ordering); // Prints: [6, 0, 5, 1, 2, 3, 4]
let dist = graph.dagShortestPath(6, 4);
console.log(dist); // Prints: 8
