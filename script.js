const DateTime = luxon.DateTime
let now = DateTime.local()
const currentYear = now.years

const holidays = {
  newYears: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 1,
      day: 1
    }),
    name: 'New Year\'s Day',
    Image: './images/newyears.png'
  },
  valentines: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 2,
      day: 14
    }),
    name: 'Valentines',
    Image: './images/valentines day.png'
  },
  stPatricks: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 3,
      day: 15
    }),
    name: 'St.Patrick\'s Day',
    Image: './images/st.patrick.png'
  },

  easter: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 4,
      day: 5
    }),
    name: 'Easter',
    Image: './images/easter.png'
  },

  mothersDay: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 5,
      day: 9
    }),
    name: 'Mother\'s Day',
    Image: './images/mothersday.png'
  },

  fathersDay: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 6,
      day: 20
    }),
    name: 'Father\'s Day',
    Image: './images/fathers day.png'
  },

  canadaDay: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 7,
      day: 1
    }),
    name: 'Canada Day',
    Image: './images/canada day.png'
  },

  terryFox: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 8,
      day: 2
    }),
    name: 'Terry Fox',
    Image: './images/terryfox.png'
  },

  septemberEquinox: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 9,
      day: 22
    }),
    name: 'September Equinox',
    Image: './images/equinox.png'
  },

  halloween: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 10,
      day: 31
    }),
    name: 'Halloween',
    Image: './images/halloween.png'
  },

  diwali: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 11,
      day: 4
    }),
    name: 'Diwali',
    Image: './images/diwali.png'
  },

  christmas: {
    date: DateTime.fromObject({
      year: currentYear,
      month: 12,
      day: 25
    }),
    name: 'Christmas',
    Image: './images/christmas.png'
  }
}
const $form = document.getElementById('holiday-form')
const select = document.getElementById('holiday-select')
const inputs = []
for (const holiday in holidays) {
  const holidayRadio = `<option value= '${holiday}'> ${holidays[holiday].name}</option>`
  inputs.push(holidayRadio)
}

select.innerHTML = inputs.join('')

// Time counter

$form.addEventListener('submit', function (event) {
  event.preventDefault()
  const chosenHoliday = document.getElementById('holiday-select').value
  calculate(chosenHoliday)

  localStorage.setItem('targetDate', JSON.stringify(chosenHoliday))
})
let interval
function calculate (chosenHoliday) {
  let holidayDate = holidays[chosenHoliday].date
  const holidayImage = holidays[chosenHoliday].Image
  if (holidayDate < now) {
    holidayDate = DateTime.fromObject({
      year: now.year + 1,
      month: holidayDate.month,
      day: holidayDate.days
    })
  }

  if (interval != undefined) {
    clearInterval(interval)
  }

  interval = setInterval(function () {
    now = DateTime.local()
    const diff = holidayDate.diff(now, ['days', 'hours', 'minutes', 'seconds'])
    const $result = document.getElementById('result')
    $result.innerText = `${diff.days} days ${diff.hours} hours ${diff.minutes} minutes ${Math.floor(diff.seconds)}`
    const $img = document.getElementById('holiday-img')
    $img.innerHTML = `<img src='${holidayImage}'/>`
  }, 1000)
}

const dateFromLocalStorage = localStorage.getItem('targetDate')
if (dateFromLocalStorage) {
  const chosenHoliday = JSON.parse(dateFromLocalStorage)
  calculate(chosenHoliday)
}
