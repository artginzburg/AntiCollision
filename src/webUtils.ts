export function addKeyListener(key: string, callback: () => void) {
  window.addEventListener('keyup', (event) => {
    if (event.code === key || event.key === key) callback();
  });
}
