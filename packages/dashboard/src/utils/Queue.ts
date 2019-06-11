export class Queue<T> {
    public queue: T[];

    constructor(queue?: T[]) {
      this.queue = queue || [];
   }

    public enqueue(item: T) {
     this.queue.push(item);
   }

    public dequeue(): T {
     return  this.queue.shift() as T;
   }

    public clear() {
     this.queue = [];
   }

    get count(): number {
     return this.queue.length;
   }
}
