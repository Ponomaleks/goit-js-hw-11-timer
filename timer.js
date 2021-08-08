class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  getRefs() {
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minsRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');
    return { daysRef, hoursRef, minsRef, secsRef };
  }

  updateTimer({ daysRef, hoursRef, minsRef, secsRef }) {
    const time = this.targetDate - Date.now();

    if (time > 0) {
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((time % (1000 * 60)) / 1000);

      daysRef.textContent = days < 10 ? `0${days}` : days;
      hoursRef.textContent = hours.toString().padStart(2, "0");
      minsRef.textContent = mins.toString().padStart(2, "0");
      secsRef.textContent = secs.toString().padStart(2, "0");
      return;
    }
    this.stop();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Nov 08, 2021, 16:02"),
});

timer.startTimer();
