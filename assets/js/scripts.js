document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    function startCountdown(endDate) {
        const countdownContainer = document.getElementById('countdown');
        countdownContainer.innerHTML = `
            <div class="digit-container">
                <div class="digit" id="days">00</div>
                <div class="label">Days</div>
            </div>
            <div class="digit-container">
                <div class="digit" id="hours">00</div>
                <div class="label">Hours</div>
            </div>
            <div class="digit-container">
                <div class="digit" id="minutes">00</div>
                <div class="label">Minutes</div>
            </div>
            <div class="digit-container">
                <div class="digit" id="seconds">00</div>
                <div class="label">Seconds</div>
            </div>
        `;

        const countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endDate - now;

            if (timeLeft < 0) {
                clearInterval(interval);
                // Trigger confetti burst or any end action
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElements.days.textContent = String(days).padStart(2, '0');
            countdownElements.hours.textContent = String(hours).padStart(2, '0');
            countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
            countdownElements.seconds.textContent = String(seconds).padStart(2, '0');

            // Add flip animation class
            countdownElements.seconds.classList.add('flip');
            if (seconds === 59) {
                countdownElements.minutes.classList.add('flip');
                if (minutes === 59) {
                    countdownElements.hours.classList.add('flip');
                    if (hours === 23) {
                        countdownElements.days.classList.add('flip');
                    }
                }
            }

            setTimeout(() => {
                countdownElements.seconds.classList.remove('flip');
                countdownElements.minutes.classList.remove('flip');
                countdownElements.hours.classList.remove('flip');
                countdownElements.days.classList.remove('flip');
            }, 500);
        }

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // initial call to display immediately
    }

    const endDate = new Date('2024-10-15T09:00:00').getTime(); // Set your countdown end date
    startCountdown(endDate);
});
