/** @todo implement Shift and other additional keys handling. */
export class KeyControls<T extends string> {
  /** An object holding boolean per each key passed, indicating whether it is currently held down. */
  public keys: Record<T, boolean>;
  public callbacks: Partial<Record<T, VoidFunction | undefined>> = {};

  private static keyRepeatInterval = 60;
  private static keyRepeatDelay = KeyControls.keyRepeatInterval;

  constructor(public keysList: T[]) {
    this.keys = Object.fromEntries(this.keysList.map((key) => [key, false])) as typeof this.keys;

    window.addEventListener('keydown', this.changeState.bind(this));
    window.addEventListener('keyup', this.changeState.bind(this));
  }

  private changeState(event: KeyboardEvent) {
    if (!this.isKeyCodeInKeysList(event.code)) return;

    this.keys[event.code] = event.type === 'keydown';

    if (!event.repeat && this.keys[event.code]) {
      // Checking that the event is not a repeat: we have our own logic of Key Repeat, since the default one cannot be fully trusted.
      // console.log(`Pressed ${event.code}`);
      this.callbacks[event.code]?.();

      // Start our logic of Key Repeat after delay.
      setTimeout(() => {
        this.repeat(event);
      }, KeyControls.keyRepeatDelay);
    }
  }

  private isKeyCodeInKeysList(code: KeyboardEvent['code']): code is T {
    return this.keysList.includes(
      code as T,
    );
  }

  private repeat(event: KeyboardEvent) {
    if (!this.keys[event.code as T]) return; // TODO clear the timeout on keyup instead.

    const repeatInterval = setInterval(() => {
      if (!this.keys[event.code as T]) {
        clearInterval(repeatInterval);
        return;
      }

      this.callbacks[event.code as T]?.();
      // console.log(`Repeated ${event.code}`);
    }, KeyControls.keyRepeatInterval);
  }
}
