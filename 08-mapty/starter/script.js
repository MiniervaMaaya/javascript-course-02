'use strict';

console.log('Mapty OOP Fuondation');

class Workout {
    date = new Date();
    id = (Date.now() + ' ').slice(-10);
    clicks =0;

    constructor(coords, distance, durant){
     this.coords = coords;
     this.distance = distance;
     this.duration = duration;
    }

    setDescription() {
        const months = ['January', 'February','March', 'April', 'May', 'june', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)}
        on ${
            months[this.date.getMonth()]
        } $(this.date.getDate()}`;
    }
    click() {
        this.clicks++;
    }
}

const testWorkout = new Workout([40.7128, -74.006], 5.2, 24);
console.log('Test workout:', testWorkout);

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration, cadence);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distansce, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();

    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const run1 = new Running([39.7392, -104.9903], 5.2, 24, 178);
console.log('=== RUNNING WORKOUT ===');
console.log('Distance:', run1.distance, 'km');
console.log('Duration:', run1.duration, 'min');
console.log('Cadence:', run1.cadence, 'spm');
console.log('Pace:', run1.pace.toFixed(1), 'min/km');
console.log('Description:', run1.description);
console.log('ID:', run1.id);

const cycling1 = new Cycling([39.7392, -104.9903], 27, 95, 523);
console.log('=== CYCLING WORKOUT ===');
console.log('Distance:', cycling1.distance, 'km');
console.log('Duration:', cycling1.duration, 'min');
console.log('Elevation Gain:', cycling1.elevationGain, 'm');
console.log('Speed:', cycling1.speed.toFixed(1), 'km/h');
console.log('Description:', cycling1.description);
console.log('ID:', cycling1.id);

console.log('=== INHERITANCE TESTING ===');
console.log(
  'Both inherit from Workout:',
  run1 instanceof Workout,
  cycling1 instanceof Workout
);
 