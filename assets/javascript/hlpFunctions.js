function getCurYear() {
  return new Date().getFullYear();
}

function getCurMonth() {
  return new Date().getMonth() + 1;
}

function getCurDay() {
  return new Date().getDate();
}

async function getCalenderByCity(city = "hannover", country = "germany") {

  const curYear = getCurYear();
  const curMonth = getCurMonth();
  const url = `https://api.aladhan.com/v1/calendarByCity/${curYear}/${curMonth}?city=${city}&country=${country}&method=2`;
  const response = await fetch(url);
  if (response.status >= 200 && response.status < 300) {
    let data = await response.json();
    return data;
  }
  else
    throw Error("keine Verbindung möglich");
}

async function getTodayPrayerTimes(city = "hannover", country = "germany") {
  try {
    const data = await getCalenderByCity(city, country);
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const today = new Date().getDate();

      if (today <= data.data.length) {
        const todayData = data.data[today - 1];
        return todayData;
      } else {
        throw ("Error: Daten für den aktuellen Tag nicht verfügbar.");
      }
    } else {
      throw ("Error: Unerwartetes Format der API-Antwort.");
    }
  }
  catch (error) {
    console.error(error);
  }

}

function updateTime(timings) {
  let alfager_cont = document.querySelector(".alfager_uhrzeit");
  let sonnen_aufgang_cont = document.querySelector(".sonnen_aufgang_uhrzeit");
  let dhuhur_cont = document.querySelector(".dhuhur_uhrzeit");
  let assr_cont = document.querySelector(".assr_uhrzeit");
  let maghrib_cont = document.querySelector(".maghrib_uhrzeit");
  let ischaa_cont = document.querySelector(".ischaa_uhrzeit");

  alfager_cont.textContent = GetFormattedTime(timings.Fajr);
  sonnen_aufgang_cont.textContent = GetFormattedTime(timings.Sunrise);
  dhuhur_cont.textContent = GetFormattedTime(timings.Dhuhr);
  assr_cont.textContent = GetFormattedTime(timings.Asr);
  maghrib_cont.textContent = GetFormattedTime(timings.Maghrib);
  ischaa_cont.textContent = GetFormattedTime(timings.Isha);
}

function GetFormattedTime(time) {
  const regex = /([0-9]|:)/ig
  return time.match(regex).join("")
}


function updateCity(city) {
  const cityname = document.querySelector(".stadt_name");
  const cityDate = document.querySelector(".aktulle_datum");
  cityname.textContent = city;
  cityDate.textContent = `${getCurDay()}.${getCurMonth()}.${getCurYear()}`;
}
export { getTodayPrayerTimes, updateTime, updateCity };