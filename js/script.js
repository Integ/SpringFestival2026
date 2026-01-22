document.addEventListener('DOMContentLoaded', () => {
    // 晚会目标时间: 2026年2月15日 晚上7:00 温哥华时间 (PST)
    // 温哥华在2月使用太平洋标准时间 (PST)，UTC-8
    // 使用ISO格式明确指定时区，确保倒计时基于温哥华时间
    const targetDate = new Date('2026-02-15T19:00:00-08:00');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Event has started
            clearInterval(timerInterval);
            document.querySelector('.countdown-container').innerHTML = '<div class="number" style="font-size: 5rem; color: var(--festive-red); text-shadow: 0 0 20px rgba(201, 47, 47, 0.5);">🎊 晚会即将开始 🎊</div>';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const newDays = String(days).padStart(2, '0');
        const newHours = String(hours).padStart(2, '0');
        const newMinutes = String(minutes).padStart(2, '0');
        const newSeconds = String(seconds).padStart(2, '0');

        // Update with animation
        updateNumberWithAnimation(daysEl, newDays);
        updateNumberWithAnimation(hoursEl, newHours);
        updateNumberWithAnimation(minutesEl, newMinutes);
        updateNumberWithAnimation(secondsEl, newSeconds);
    }

    function updateNumberWithAnimation(element, newValue) {
        const currentValue = element.textContent;
        
        if (currentValue !== newValue) {
            // Remove the class first to ensure we can re-trigger it
            element.classList.remove('flip');
            
            // Force a reflow to restart the animation if it was just removed (though unlikely with 1s interval)
            void element.offsetWidth; 
            
            // Add the animation class
            element.classList.add('flip');
            
            // Update text halfway through the animation (0.6s total duration, so at 0.3s)
            setTimeout(() => {
                element.textContent = newValue;
            }, 300);
            
            // Clean up class after animation
            setTimeout(() => {
                element.classList.remove('flip');
            }, 600);
        }
    }

    // Initial call to avoid delay
    updateCountdown();

    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);
});
