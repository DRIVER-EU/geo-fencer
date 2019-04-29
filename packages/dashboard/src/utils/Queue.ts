export class Queue<T>{
    _queue: T[];
 
    constructor(queue?: T[]) {
      this._queue = queue || [];
   }
 
   enqueue(item: T) {
     this._queue.push(item);
   }
 
   dequeue(): T {
     return <T>this._queue.shift();
   }
 
   clear() {
     this._queue = [];
   }
 
   get count(): number {
     return this._queue.length;
   }
}