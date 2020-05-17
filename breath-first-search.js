// https://github.com/williamfiset/Algorithms/blob/f674f5f8b25f2d186ad2e38caded5feaebbfc055/com/williamfiset/algorithms/graphtheory/BreadthFirstSearchRecursive.java

console.clear();
class PriorityQueue {
  constructor(on) {
    this.array = [];
    this.on = on;
  }
  offer(element) {
    this.array.push(element);
  }
  poll() {
    if (!this.array.length) return;
    let smallest = this.array.reduce(
      (r, c) => c[this.on] < r[this.on] ? c: r,
      this.array[0]
    );
    this.array.splice(this.array.indexOf(smallest), 1);
    return smallest;
  }
}

const DEPTH_LAYER = -1;
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
  }

  get nodeCount() {
    return this.set.size;
  }

  addNode(node) {
    if (node != null) this.set.add(node);
  }

  addUndirectedEdge(from, to, cost) {
    this.addDirectedEdge(from, to, cost);
    this.addDirectedEdge(to, from, cost);
  }

  addDirectedEdge(from, to, cost) {
    let list = this.graph.get(from);
    this.addNode(from);
    this.addNode(to);

    if (!list) {
      list = [];
      this.graph.set(from, list);
    }

    list.push(new Edge(from, to, cost));
  }

  bfsIterative(start) {
    let prev = [];
    let visited = [];
    let queue = [start];

    while (queue.length) {
      let node = queue.shift();
      if (!visited[node]) {
        visited[node] = true;
        let edges = this.graph.get(node);
        if (edges != null)
          for (let edge of edges)
            if (!visited[edge.to]) {
              prev[edge.to] = node;
              queue.push(edge.to);
            }
      }
    }

    return prev;
  }

  reconstructPath(start, end) {
    let prev = this.bfsIterative(start);
    let path = [];
    for (let at = end; at != undefined; at = prev[at]) path.push(at);
    path.reverse();
    if (path[0] === start) return path;
    path = [];
    return path;
  }

  bfsRecursive(start, n) {
    function bfs(queue, visited) {
      let at = queue.shift();
      if (at == DEPTH_LAYER) {
        queue.push(DEPTH_LAYER);
        return 1;
      }

      if (visited[at]) return 0;
      
      visited[at] = true;
      
      let neighbours = this.graph.get(at);
      if (neighbours != null)
        for (let next of neighbours)
          if (!visited[next.to]) queue.push(next.to);

      let depth = 0;
      
      while (true) {
        if (queue.length == 1 && queue[0] == DEPTH_LAYER) break;
        depth += this.bfs(queue, visited);
      }
      
      return depth;
    }

    let queue = [start, DEPTH_LAYER],
        visited = new Array(n).fill(false);
    
    return this.bfs(queue, visited);
  }

  shortestPathBtw(start, end) {
    let { prev, distance } = this.dijkstra(start, end);
    let path = [];
    for (let at = end; at != null; at = prev[at]) path.push(at);
    path.reverse();
    if (path[0] === start) return { arr: path, distance: distance };
    return { arr: [], distance: distance };
  }

  dijkstra(start, end) {
    let dist = new Array(this.nodeCount).fill(Infinity); // store distance
    let pq = new PriorityQueue(this.nodeCount, "value"); // pq for fetching the least distance
    let visited = new Array(this.nodeCount).fill(false); // visited tracking
    let prev = new Array(this.nodeCount).fill(null); // to regenrate path

    dist[start] = 0;
    pq.offer(new Node(start, 0));

    while (pq.array.length) {
      let node = pq.poll();
      visited[node.id] = true;
      if (dist[node.id] < node.value) continue;
      let edges = this.graph.get(node.id) || [];
      for (let edge of edges) {
        if (visited[edge.to]) continue;
        let newDist = dist[edge.from] + edge.cost;
        if (newDist < dist[edge.to]) {
          prev[edge.to] = edge.from;
          dist[edge.to] = newDist;
          pq.offer(new Node(edge.to, dist[edge.to]));
        }
      }
      if (node.id == end) return { distance: dist[end], prev: prev };
    }
    return { distance: Infinity, prev: prev };
  }
  // end of class
}

let graph = new Graph();

graph.addUndirectedEdge(3, 4, 2);
graph.addUndirectedEdge(2, 4, 5);
graph.addUndirectedEdge(12, 8, 3);
graph.addUndirectedEdge(1, 10, 3);
graph.addUndirectedEdge(10, 9, 6);
graph.addUndirectedEdge(9, 8, 7);
graph.addUndirectedEdge(8, 2, 7);

// console.log(graph.reconstructPath(3, 2));
// console.log(graph.bfsIterative(2));
// console.log(graph.bfsRecursive(2, graph.nodeCount));
// console.log(graph.dijkstra(3, 2));
let path = graph.shortestPathBtw(3, 2);
console.log(path.arr.join(" -> ") + " with the total cost of " + path.distance);
