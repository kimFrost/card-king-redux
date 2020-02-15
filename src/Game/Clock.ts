import { EventEmitter } from "events";

export interface ITick {
    deltaTime: number;
    currentTime: number;
}

class Clock extends EventEmitter {
    public currentTime: number;
    private playRate: number;

    //private timeListeners: Array<Function> = [];

    constructor() {
        super();
        this.currentTime = 0;
        this.playRate = 1;
    }

    public tick(deltaTime: number): void {
        this.currentTime += deltaTime * this.playRate;
        this.emit('time', {
            deltaTime: deltaTime,
            currentTime: this.currentTime
        } as ITick);
    }

    start() {
        this.playRate = 1;
        let ticksPerSecond =  60;
        setInterval(() => {
            this.tick(1000 / ticksPerSecond);
        }, 1000 / ticksPerSecond);
    }

    pause() { 
        this.playRate = 0;
    }

    reset() {
        this.currentTime = 0;
    }
}
export default Clock;