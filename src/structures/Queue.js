class Queue {
  constructor() {
    this.data = []
  }

  enqueue = (item) => {
    this.data.push(item)
  }

  dequeue = () => this.data.shift()

  length = () => this.data.length
}

export default Queue
