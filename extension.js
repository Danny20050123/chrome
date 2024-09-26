/*color selection*/
const bgColor = document.getElementById('color1');
const textColor = document.getElementById('color2');

function applySavedColors() {
  const savedBg = localStorage.getItem('backgroundColor');
  const savedText = localStorage.getItem('textColor');
  if (savedBg) {
    document.body.style.backgroundColor = savedBg;
    bgColor.value = savedBg;
    document.getElementById('eventInput').style.color=savedBg;
  }

  if (savedText) {
    document.body.style.color = savedText;
    document.getElementById('eventInput').style.backgroundColor = savedText;
    textColor.value = savedText;
  }
}

bgColor.addEventListener('input', function() {
  const selectedColor = bgColor.value;
  
  document.body.style.backgroundColor = selectedColor;
  document.getElementById('eventInput').style.color=selectedColor;
  localStorage.setItem('backgroundColor', selectedColor);
});

textColor.addEventListener('input', function() {
  const selectedColor = textColor.value;
  
  document.body.style.color = selectedColor;
  document.getElementById('eventInput').style.backgroundColor =selectedColor;
  localStorage.setItem('textColor', selectedColor);
});

applySavedColors();

/*event class declaration*/ 
class Event{
  constructor(name, setReminder, date, time){
    this.name=name;
    this.setReminder=setReminder;
    this.date=date;
    this.time=time;
  }
}
/*code for adding and deleting events*/
const addBtn=document.getElementById("add event");
const dateIn=document.getElementById("date");
const timeIn=document.getElementById("time");
const nameIn=document.getElementById("event");
const setReminderIn=document.getElementById("setReminder");
const eventList = document.getElementById("eventList");
let eventsArr = JSON.parse(localStorage.getItem('eventsArr')) || [];
function deleteEvent(index){
  eventsArr.splice(index, 1);
  localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
  loadEvents();
}
function loadEvents(){
  eventList.innerHTML = '';
  for(let index=0; index<eventsArr.length; index++){
    
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

}
addBtn.addEventListener('click', function(){
  eventsArr.push(new Event(nameIn.value, setReminderIn.checked, dateIn.value, timeIn.value));
  localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
  loadEvents();
})
loadEvents();
function alarm(){
  const current = new Date();
  for(let index=0; index<eventsArr.length; index++){
    if(eventsArr[index].setReminder&&eventsArr[index].date&&eventsArr[index].time){
      const target = new Date(`${eventsArr[index].date}T${eventsArr[index].time}`);
      if (
        current.getFullYear() == target.getFullYear() &&
        current.getMonth() == target.getMonth() &&
        current.getDate() == target.getDate() &&
        current.getHours() == target.getHours() &&
        current.getMinutes() == target.getMinutes()
      )
      alert(`Task Alert Reminder: you set an alarm for "${eventsArr[index].name}"`);
    }

  }

}
setInterval(alarm, 60000);