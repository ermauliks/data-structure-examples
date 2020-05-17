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
