class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

// Criando uma fila de números
const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
numberQueue.enqueue(2);
numberQueue.enqueue(3);
console.log(numberQueue.dequeue()); // 1

// Criando uma fila de strings
const stringQueue = new Queue<string>();
stringQueue.enqueue('Hello');
stringQueue.enqueue('World');
console.log(stringQueue.dequeue()); // 'Hello'