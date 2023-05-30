document.addEventListener('DOMContentLoaded', async function() {
  const calendarEl = document.getElementById('calendar');
  let apiUrl = 'https://script.google.com/macros/s/AKfycbyZNJ9mAKddDnBGhf9tEbJOssMbjI7-jK-oRc06UuRywdvBRVrwedtkY0JYd44nJCX3/exec?division=EPC/Carpentry&jobTitle=Carpenter-G4';
  let calendar;

  function initializeCalendar() {
    const calendarConfig = {
      timeZone: 'UTC',
      displayEventTime: false,
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      editable: true,
      eventBackgroundColor: 'red',
      eventColor: 'red',
      nextDayThreshold: '23:00:01',
      events: apiUrl
    };

    calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
    calendar.render();
  }

  async function fetchAndPopulateTable() {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const currentDate = new Date();
        const filteredData = data.filter(data => new Date(data.end) >= currentDate);
        populateDataTable(filteredData);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Something went wrong.', error);
    }
  }

  function populateDataTable(data) {
    const dataTableConfig = {
      dom: 'Bflrtip',
      "bDestroy": true,
      columnDefs: [
        {
          target: [4, 5],
          render: DataTable.render.date(),
        },
      ],
      data: data,
      columns: [
        { "data": "payroll_number" },
        { "data": "title" },
        { "data": "division" },
        { "data": "job_title" },
        { "data": "start" },
        { "data": "end" }
      ],
    };

    $('#leave-table').DataTable(dataTableConfig);
  }

  initializeCalendar();
  await fetchAndPopulateTable();

  document.getElementById('name').addEventListener('change', async function() {
    const division = this.value;
    const url = new URL(apiUrl);
    url.searchParams.set('division', division);
    apiUrl = url.toString();
    initializeCalendar();
    await fetchAndPopulateTable();
  });

  document.getElementById('job-title').addEventListener('change', async function() {
    const jobTitle = this.value;
    const url = new URL(apiUrl);
    url.searchParams.set('jobTitle', jobTitle);
    apiUrl = url.toString();
    initializeCalendar();
    await fetchAndPopulateTable();
  });
});