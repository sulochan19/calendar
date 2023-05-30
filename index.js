document.addEventListener('DOMContentLoaded', async function() {
  const calendarEl = document.getElementById('calendar');
  let apiUrl = 'https://script.google.com/macros/s/AKfycbwGWkH5b4PlLIBsqwSwRI3nN87xw0sEpUyxRP1Tl7COeseNAq63wpN-LXatxopRKM9a/exec?filter=EPC/Carpentry&filter2=Carpenter-G4';
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
      eventTitle: 'Name',
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
        const filteredData = data.filter(event => new Date(event.end) >= currentDate);
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
  await fetchAndPopulateTable();

  document.getElementById('name').addEventListener('change', async function() {
    const division = this.value;
    const url = new URL(apiUrl);
    url.searchParams.set('filter', division);
    apiUrl = url.toString();
    console.log("apiurl for change in division is ", apiUrl);
    initializeCalendar();
    await fetchAndPopulateTable();
  });

  document.getElementById('job-title').addEventListener('change', async function() {
    const jobTitle = this.value;
    const url = new URL(apiUrl);
    url.searchParams.set('filter2', jobTitle);
    apiUrl = url.toString();
    console.log("apiurl for change in job title is ", apiUrl);
    initializeCalendar();
    await fetchAndPopulateTable();
  });
});

