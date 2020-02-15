import Clock, { ITick } from "./Clock";


export class Game {

    private clock: Clock;

    constructor() {
        this.clock = new Clock()
        this.clock.addListener('time', this.onTick.bind(this));

    }

    public onTick(tick: ITick) {
      
    }

    
}