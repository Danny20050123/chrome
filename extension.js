/*color selection*/
const bgColor = document.getElementById('color1');
const textColor = document.getElementById('color2');

function applySavedColors() {
  chrome.storage.local.get(['backgroundColor', 'textColor'], function(result) {
    const savedBg = result.backgroundColor;
    const savedText = result.textColor;
    
    if (savedBg) {
      document.body.style.backgroundColor = savedBg;
      bgColor.value = savedBg;
      document.getElementById('eventInput').style.color = savedBg;
    }

    if (savedText) {
      document.body.style.color = savedText;
      document.getElementById('eventInput').style.backgroundColor = savedText;
      textColor.value = savedText;
    }
  });
}

bgColor.addEventListener('input', function(){
  const selectedColor =bgColor.value;
  document.body.style.backgroundColor = selectedColor;
  document.getElementById('eventInput').style.color = selectedColor;
  chrome.storage.local.set({ backgroundColor: selectedColor });
});

textColor.addEventListener('input', function(){
  const selectedColor =textColor.value;
  document.body.style.color = selectedColor;
  document.getElementById('eventInput').style.backgroundColor = selectedColor;
  chrome.storage.local.set({ textColor: selectedColor });
});

applySavedColors();


class Event {
  constructor(name, setReminder, date, time){
    this.name = name;
    this.setReminder = setReminder;
    this.date = date;
    this.time = time;
  }
}

/*code for adding and deleting events*/
const addBtn = document.getElementById("add event");
const dateIn = document.getElementById("date");
const timeIn = document.getElementById("time");
const nameIn = document.getElementById("event");
const setReminderIn = document.getElementById("setReminder");
const eventList = document.getElementById("eventList");

let eventsArr = [];

function loadEvents() {
  chrome.storage.local.get('eventsArr', function(result) {
    eventsArr = result.eventsArr || [];
    eventList.innerHTML = '';
    for (let index = 0; index < eventsArr.length; index++) {
      const li = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function() {
        deleteEvent(index);
      });

      li.innerHTML = `<strong>${eventsArr[index].name}</strong> ${eventsArr[index].date} ${eventsArr[index].time} `;
      li.appendChild(deleteBtn);
      eventList.appendChild(li);
    }
  });
}

function deleteEvent(index){
  eventsArr.splice(index, 1);
  chrome.storage.local.set({ eventsArr: eventsArr });
  loadEvents();
}

addBtn.addEventListener('click', function(){
  eventsArr.push(new Event(nameIn.value, setReminderIn.checked, dateIn.value, timeIn.value));
  chrome.storage.local.set({ eventsArr: eventsArr });
  loadEvents();
});

loadEvents();
