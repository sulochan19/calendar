document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var apiUrl = 'https://script.google.com/macros/s/AKfycbyuLBu5ixHjny2orJtxZKWPIJE5-zILqwFdIJc4HHAbDqsjsFa2zxlql5DMkKhsNDX6/exec?filter=EPC/Carpentry';
    var calendarConfig = {
      timeZone: 'UTC',
      displayEventTime: false,
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      eventBackgroundColor: 'red',
      eventColor: 'red',
      eventTitle: 'Name',
      nextDayThreshold: '23:00:01',
      events: apiUrl
    };
  
    var calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
    calendar.render();
  
    document.getElementById('name').addEventListener('change', function() {
      apiUrl = 'https://script.google.com/macros/s/AKfycbyuLBu5ixHjny2orJtxZKWPIJE5-zILqwFdIJc4HHAbDqsjsFa2zxlql5DMkKhsNDX6/exec?filter='+this.value+''; 
      calendarConfig.events = apiUrl;
      calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
      calendar.render();
    });
  });
  