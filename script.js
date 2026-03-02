const recentCheckBox = document.querySelector('input[name="recentDate"]');

const targetMonth = document.querySelector("#targetMonth");
const targetDay = document.querySelector("#targetDay");
const targetYear = document.querySelector("#targetYear");
const targetDateInput = document.querySelector("#datePickerTarget");

const dobMonth = document.querySelector("#dobMonth");
const dobDay = document.querySelector("#dobDay");
const dobYear = document.querySelector("#dobYear");
const dobDateInput = document.querySelector("#datePickerDob");

const calculateButton = document.querySelector("#calculateButton");

function setTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  targetYear.value = year;
  targetMonth.value = month;
  targetDay.value = String(day).padStart(2, "0");

  const formatted =
    year +
    "-" +
    String(month).padStart(2, "0") +
    "-" +
    String(day).padStart(2, "0");

  targetDateInput.value = formatted;
}

recentCheckBox.addEventListener("change", function () {
  if (this.checked) {
    setTodayDate();
  }
});

targetDateInput.addEventListener("change", function () {
  if (!this.value) return;

  const date = new Date(this.value);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  targetYear.value = year;
  targetMonth.value = month;

  targetDay.value = String(day).padStart(2, "0");
});

function updateTargetPickerFromDropdowns() {
  const year = targetYear.value;
  const month = String(targetMonth.value).padStart(2, "0");
  const day = String(targetDay.value).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;
  targetDateInput.value = formatted;
}

targetYear.addEventListener("change", updateTargetPickerFromDropdowns);
targetMonth.addEventListener("change", updateTargetPickerFromDropdowns);
targetDay.addEventListener("change", updateTargetPickerFromDropdowns);

dobDateInput.addEventListener("change", function () {
  if (!this.value) return;

  const date = new Date(this.value);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  dobYear.value = year;
  dobMonth.value = month;

  dobDay.value = String(day).padStart(2, "0");
});

function updateDOBPickerFromDropdowns() {
  const year = dobYear.value;
  const month = String(dobMonth.value).padStart(2, "0");
  const day = String(dobDay.value).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;
  dobDateInput.value = formatted;
}

dobYear.addEventListener("change", updateDOBPickerFromDropdowns);
dobMonth.addEventListener("change", updateDOBPickerFromDropdowns);
dobDay.addEventListener("change", updateDOBPickerFromDropdowns);

function calculateAge() {
  if (!dobDay.value || !targetDay.value) return;

  // Parse DOB
  const bYear = parseInt(dobYear.value);
  const bMonth = parseInt(dobMonth.value);
  const bDay = parseInt(dobDay.value);

  // Parse Target Date
  const tYear = parseInt(targetYear.value);
  const tMonth = parseInt(targetMonth.value);
  const tDay = parseInt(targetDay.value);

  // --- Calculate years, months, days ---
  let years = tYear - bYear;
  let months = tMonth - bMonth;
  let days = tDay - bDay;

  if (days < 0) {
    months--;
    const prevMonth = new Date(tYear, tMonth - 1, 0); // last day of previous month
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // --- Calculate total days difference ---
  const dobDate = new Date(bYear, bMonth - 1, bDay);
  const targetDate = new Date(tYear, tMonth - 1, tDay);
  const diffMs = targetDate - dobDate; // milliseconds
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = years * 12 + months; // approximate months
  const diffHours = diffDays * 24;
  const diffMinutes = diffHours * 60;
  const diffSeconds = diffMinutes * 60;

  // --- Output ---
  document.querySelector(".age-container").innerHTML = `
    <h4>Age:</h4>
    <p>${years} years ${months} months ${days} days</p>
    <p>${diffMonths} months ${days} days</p>
    <p>${diffWeeks} weeks ${days} days</p>
    <p>${diffDays.toLocaleString()} days</p>
    <p>${diffHours.toLocaleString()} hours</p>
    <p>${diffMinutes.toLocaleString()} minutes</p>
    <p>${diffSeconds.toLocaleString()} seconds</p>
  `;
}
calculateButton.addEventListener("click", function () {
  calculateAge();
});
