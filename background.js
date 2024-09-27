function alarmCheck() {
    // Retrieve eventsArr from chrome.storage.local
    chrome.storage.local.get(['eventsArr'], function (result){
      const eventsArr = result.eventsArr || [];
      const current = new Date();
      
      for (let index = 0; index < eventsArr.length; index++) {
        if (eventsArr[index].setReminder && eventsArr[index].date && eventsArr[index].time) {
          const target = new Date(`${eventsArr[index].date}T${eventsArr[index].time}`);
          if (
            current.getFullYear() == target.getFullYear() &&
            current.getMonth() == target.getMonth() &&
            current.getDate() == target.getDate() &&
            current.getHours() == target.getHours() &&
            current.getMinutes() == target.getMinutes()
          ) {
            chrome.notifications.create({
              type: "basic",
              iconUrl: "todo.png",
              title: "Event Reminder",
              message: `Task Alert Reminder: you set an alarm for "${eventsArr[index].name}"`
            });
          }
        }
      }
    });
  }
  
  chrome.alarms.create("checkEvents", { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(function (alarm){
    if (alarm.name === "checkEvents") {
      alarmCheck();
    }
  });
  