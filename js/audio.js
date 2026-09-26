/* exported initAudio, initSoundToggle */
let soundEnabled = true;

function initAudio() {
  soundEnabled = localStorage.getItem('sound') !== 'disabled';
}

function playSound(frequency = 440, duration = 0.1) {
  if (!soundEnabled) {
    return;
  }

  try {
    const ctx =
      window.audioCtx ||
      (window.audioCtx = new (window.AudioContext ||
        window.webkitAudioContext)());

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

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
  } catch {
    // Web Audio API not supported or blocked
  }
}

function initSoundToggle() {
  const soundToggle = document.getElementById('sound-toggle');

  if (!soundToggle) {
    return;
  }

  const icon = soundToggle.querySelector('.icon');
  icon.textContent = soundEnabled ? '🔊' : '🔇';

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    icon.textContent = soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('sound', soundEnabled ? 'enabled' : 'disabled');
    playSound(659, 0.1);
  });
}
