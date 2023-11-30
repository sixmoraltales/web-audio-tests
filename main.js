// Create an audio context
const audioContext = new AudioContext();

// Create an oscillator node
const oscillator = audioContext.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = 440;

// Create a gain node
const gain = audioContext.createGain();
gain.gain.value = 0;

// Connect the nodes
oscillator.connect(gain);
gain.connect(audioContext.destination);

// Define a function that takes a trigger input and schedules the envelope
function triggerEnvelope(trigger) {
  // Get the current time from the audio context
  const now = audioContext.currentTime;

  // Set the attack and release values in seconds
  const attack = 0.1;
  const release = 0.5;

  // Set the peak and sustain values in linear gain
  const peak = 1;
  const sustain = 0.8;

  // Schedule the envelope using the trigger input and the gain parameter
  gain.gain.setValueAtTime(0, trigger); // Set the initial value to zero
  gain.gain.linearRampToValueAtTime(peak, trigger + attack); // Ramp up to the peak value during the attack time
  gain.gain.linearRampToValueAtTime(sustain, trigger + attack + release); // Ramp down to the sustain value during the release time
  gain.gain.linearRampToValueAtTime(0, trigger + attack + release * 2); // Ramp down to zero after the release time

  // Start and stop the oscillator
  oscillator.start(trigger);
  oscillator.stop(trigger + attack + release * 2);
}

// Get the button element from the document
const button = document.getElementById("button");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Trigger the envelope when the button is clicked
  triggerEnvelope(audioContext.currentTime);
});
