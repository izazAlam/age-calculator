document.addEventListener("DOMContentLoaded", function () {
  const dobMonth = document.getElementById("dobMonth");
  const dobDay = document.getElementById("dobDay");
  const dobYear = document.getElementById("dobYear");

  const targetMonth = document.getElementById("targetMonth");
  const targetDay = document.getElementById("targetDay");
  const targetYear = document.getElementById("targetYear");

  const recentCheckbox = document.querySelector(".checkbox");
  const calculateBtn = document.querySelector(".calculate-button button");
  const resultContainer = document.querySelector(".age-container");

  const openCalendarDob = document.getElementById("openCalendarDob");
  const calendarDob = document.getElementById("targetDateDob");

  const openCalendarTarget = document.getElementById("openCalendarTarget");
  const calendarTarget = document.getElementById("targetDateTarget");

  function openCalendar(input) {
    if (input.showPicker) {
      input.showPicker(); // Chrome, Edge
    } else {
      input.click();
    }
  }

  // =========================
  // LIMIT MAX DATE TO TODAY
  // =========================

  const todayString = new Date().toISOString().split("T")[0];
  calendarDob.max = todayString;
  calendarTarget.max = todayString;

  // =========================
  // DOB CALENDAR FUNCTIONALITY
  // =========================

  openCalendarDob.addEventListener("click", () => {
    calendarDob.click();
  });

  calendarDob.addEventListener("change", () => {
    const date = new Date(calendarDob.value);

    dobMonth.value = date.getMonth() + 1;
    dobDay.value = date.getDate();
    dobYear.value = date.getFullYear();
  });
  // =========================
  // TARGET CALENDAR FUNCTIONALITY
  // =========================

  openCalendarTarget.addEventListener("click", () => {
    if (!targetMonth.disabled) {
      calendarTarget.click();
    }
  });

  calendarTarget.addEventListener("change", () => {
    const date = new Date(calendarTarget.value);

    targetMonth.value = date.getMonth() + 1;
    targetDay.value = date.getDate();
    targetYear.value = date.getFullYear();
  });
  // =========================
  // RECENT DATE CHECKBOX
  // =========================

  recentCheckbox.addEventListener("change", function () {
    if (this.checked) {
      const today = new Date();

      targetMonth.value = today.getMonth() + 1;
      targetDay.value = today.getDate();
      targetYear.value = today.getFullYear();

      targetMonth.disabled = true;
      targetDay.disabled = true;
      targetYear.disabled = true;
    } else {
      targetMonth.disabled = false;
      targetDay.disabled = false;
      targetYear.disabled = false;
    }
  });

  // =========================
  // AGE CALCULATION
  // =========================

  calculateBtn.addEventListener("click", function () {
    const birthDate = new Date(
      parseInt(dobYear.value),
      parseInt(dobMonth.value) - 1,
      parseInt(dobDay.value),
    );

    const targetDate = new Date(
      parseInt(targetYear.value),
      parseInt(targetMonth.value) - 1,
      parseInt(targetDay.value),
    );

    // Validation
    if (birthDate > targetDate) {
      resultContainer.innerHTML = `
        <h4>Age:</h4>
        <p>Invalid Date (Birth date is after target date)</p>
      `;

      return;
    }

    // Time differences
    const diffMs = targetDate - birthDate;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Year month day calculation
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let day = targetDate.getDate() - birthDate.getDate();

    if (day < 0) {
      months--;

      const lastMonthDays = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        0,
      ).getDate();

      day += lastMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMonths = years * 12 + months;

    function format(num) {
      return num.toLocaleString();
    }

    // Display result
    resultContainer.innerHTML = `
      <h4>Age:</h4>
      <p>
        ${years} years ${months} months ${day} days<br><br>
        or ${totalMonths} months ${day} days<br><br>
        or ${weeks} weeks ${day} days<br><br>
        or ${format(days)} days<br><br>
        or ${format(hours)} hours<br><br>
        or ${format(minutes)} minutes<br><br>
        or ${format(seconds)} seconds
      </p>
    `;
  });
});
