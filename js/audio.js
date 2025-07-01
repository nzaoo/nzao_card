// Audio Context for Sound Effects
let audioContext;
let soundEnabled = true;

export function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    // Audio not supported
  }
}

export function playSound(frequency = 440, duration = 0.1) {
  try {
    const ctx =
      window.audioCtx ||
      (window.audioCtx = new (window.AudioContext ||
        window.webkitAudioContext)());
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch (e) {
    // ignore
  }
}

// Sound Toggle functionality
export function initSoundToggle() {
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundEnabled = localStorage.getItem('sound') !== 'disabled';
    soundToggle.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';

    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.querySelector('.icon').textContent = soundEnabled
        ? '🔊'
        : '🔇';
      localStorage.setItem('sound', soundEnabled ? 'enabled' : 'disabled');
      playSound(659, 0.1);
    });

    // Keyboard navigation
    soundToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundToggle.click();
      }
    });
  }
}

export { soundEnabled };
