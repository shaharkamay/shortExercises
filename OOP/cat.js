class Cat {
    constructor(name, tiredness, hunger, lonliness, happiness) {
        this.name = name;
        this.tiredness = tiredness;
        this.hunger = hunger;
        this.lonliness = lonliness;
        this.happiness = happiness;
    }
    feed(foodAmount) {
        this.hunger += foodAmount;
    }
    sleep(time) {
        this.hunger -= time;
        this.happiness += Math.floor(time / 3);
        this.tiredness -= time;
    }
    pet(time) {
        this.happiness += time;
        this.lonliness = 0;
    }

    status() {
        const happyStatus = 0;
        if (this.happiness > 5) {
            happyStatus = "very happy";
        } else {
            happyStatus = "very sad";
        }
        console.log(`${this.name} is ${happyStatus}`);
    }
}