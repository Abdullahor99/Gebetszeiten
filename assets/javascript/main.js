import { getTodayPrayerTimes, updateTime, updateCity } from "./hlpFunctions.js";

window.addEventListener("DOMContentLoaded", function () {
  // chose Default and update for default.


  const select = this.document.getElementById("citys");
  select.addEventListener("click", function () {
    const city = this.value;
    let data = getTodayPrayerTimes(city);
    data.then(data => {
      let timings = data.timings;
      updateCity(this.value);
      updateTime(timings);

    })
  })
});