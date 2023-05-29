document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  let apiUrl = 'https://script.google.com/macros/s/AKfycbyuLBu5ixHjny2orJtxZKWPIJE5-zILqwFdIJc4HHAbDqsjsFa2zxlql5DMkKhsNDX6/exec?filter=EPC/Carpentry';
  let calendar;

  function initializeCalendar() {
    const calendarConfig = {
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

    calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
    calendar.render();
  }

  function fetchAndPopulateTable() {
    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        const currentDate = new Date();
        const filteredData = data.filter(event => new Date(event.end) >= currentDate);
        populateDataTable(filteredData);
      })
      .catch(error => {
        console.error('Something went wrong.', error);
      });
  }

  function populateDataTable(data) {
    const dataTableConfig = {
      dom: 'Bflrtip',
      "bDestroy": true,
      columnDefs: [
        {
          target: [2, 3],
          render: DataTable.render.date(),
        },
      ],
      data: data,
      columns: [
        { "data": "Payroll Number" },
        { "data": "title" },
        { "data": "start" },
        { "data": "end" }
      ],
    };

    $('#leave-table').DataTable(dataTableConfig);
  }

  initializeCalendar();
  fetchAndPopulateTable();

  document.getElementById('name').addEventListener('change', function() {
    apiUrl = 'https://script.google.com/macros/s/AKfycbyuLBu5ixHjny2orJtxZKWPIJE5-zILqwFdIJc4HHAbDqsjsFa2zxlql5DMkKhsNDX6/exec?filter=' + this.value;
    initializeCalendar();
    fetchAndPopulateTable();
  });
});
