// Audio Context for Sound Effects
let audioContext;
let soundEnabled = true;

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    // Audio not supported
  }
}

function playSound(frequency = 440, duration = 0.1) {
  if (!soundEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Sound Toggle functionality
function initSoundToggle() {
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

// Đảm bảo AudioContext được resume khi người dùng tương tác lần đầu trên mobile
if (typeof window !== 'undefined') {
  const resumeAudioContext = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };
  window.addEventListener('touchstart', resumeAudioContext, { once: true });
  window.addEventListener('click', resumeAudioContext, { once: true });
}

export { initAudio, playSound, initSoundToggle, soundEnabled };
