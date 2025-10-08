'use strict';
console.log('Mapty OOP Foundation');
 
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
 
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
 
  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
 
  click() {
    this.clicks++;
  }
}
 
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
 
    // Debug info
    console.log('=== RUNNING WORKOUT ===');
    console.log(`Distance: ${distance} km`);
    console.log(`Duration: ${duration} min`);
    console.log(`Cadence: ${cadence} spm`);
    console.log(`Pace: ${this.pace.toFixed(1)} min/km`);
    console.log(`Description: ${this.description}`);
    console.log(`ID: ${this.id}`);
  }
 
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
 
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
 
    // Debug info
    console.log('=== CYCLING WORKOUT ===');
    console.log(`Distance: ${distance} km`);
    console.log(`Duration: ${duration} min`);
    console.log(`Elevation Gain: ${elevationGain} m`);
    console.log(`Speed: ${this.speed.toFixed(1)} km/h`);
    console.log(`Description: ${this.description}`);
    console.log(`ID: ${this.id}`);
  }
 
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
 
// DOM
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
 
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
 
  constructor() {
    console.log('=== INHERITANCE TESTING ===');
    console.log(
      'Both inherit from Workout:',
      Running.prototype instanceof Workout,
      Cycling.prototype instanceof Workout
    );
 
    console.log('=== TESTING GEOLOCATION API ===');
    console.log('App is starting');
 
    // Get user's position
    this._getPosition();
 
    // Get data from local storage
    this._getLocalStorage();
 
    // Event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
 
    // Hide Form
    document.addEventListener('keydown', this._handleEscape.bind(this));
  }
 
  _handleEscape(e) {
    if (e.key === 'Escape' && !form.classList.contains('hidden')) {
      this._hideForm();
      console.log('Form hidden via Escape key');
    }
  }
 
  _getPosition() {
    if (navigator.geolocation) {
      console.log('Requesting user location...');
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }
 
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
 
    console.log(`Loading map at coordinates: ${latitude}, ${longitude}`);
 
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
 
    console.log('Map loaded successfully at user location.');
 
    // Handle map clicks
    this.#map.on('click', this._showForm.bind(this));
 
    // Load Workouts
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }
 
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
 
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
 
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
 
  _newWorkout(e) {
    e.preventDefault();
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
 
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
 
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers!');
      workout = new Running([lat, lng], distance, duration, cadence);
    }
 
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
 
    this.#workouts.push(workout);
 
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
 
    this._hideForm();
    this._setLocalStorage();
  }
 
  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
 
    marker.on('click', () => {
      console.log(`Navigated to ${workout.type} workout at`, workout.coords);
    });
  }
 
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;
 
    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
 
    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
 
    form.insertAdjacentHTML('afterend', html);
  }
 
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
 
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
 
    console.log(`Navigating to ${workout.type} workout at`, workout.coords);
 
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }
 
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
 
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
 
    this.#workouts = data.map(work => {
      if (work.type === 'running') {
        const workout = new Running(
          work.coords,
          work.distance,
          work.duration,
          work.cadence
        );
        workout.id = work.id;
        workout.date = new Date(work.date);
        return workout;
      }
      if (work.type === 'cycling') {
        const workout = new Cycling(
          work.coords,
          work.distance,
          work.duration,
          work.elevationGain
        );
        workout.id = work.id;
        workout.date = new Date(work.date);
        return workout;
      }
    });
 
    this.#workouts.forEach(work => this._renderWorkout(work));
  }
 
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}
 
const app = new App();
 