
    let currentYear, currentMonth;

    // Function to create the calendar
    function createCalendar(year, month) {
    currentYear = year;
    currentMonth = month;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;

    const tbody = document.getElementById('calendar-body');
    tbody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
    if (i === 0 && j < firstDayOfMonth) {
    const cell = document.createElement('td');
    row.appendChild(cell);
} else if (date > daysInMonth) {
    break;
} else {
    const cell = document.createElement('td');
    cell.textContent = date;
    cell.addEventListener('click', (function(date) {
    return function() {
    displayEvent(date, currentMonth, currentYear);
};
})(date));
    row.appendChild(cell);
    date++;
}
}
    tbody.appendChild(row);
}
}

    // Function to display the event
    function displayEvent(date, month, year) {
    const eventList = document.getElementById('event-list');
    const dayOfWeek = new Date(year, month, date).toLocaleString('en-us', { weekday: 'long' });
    const dateString = `${dayOfWeek} (${date})`;
    const fullDate = `${date}/${month + 1}/${year}`;
    const classes = ['English', 'Math', 'Science'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const time = generateRandomTime();
    const listItem = document.createElement('li');
    listItem.textContent = `${dateString}\nDate: ${fullDate}\nClass: ${randomClass} - ${time}`;
    // Clear the event list before adding a new event
    eventList.innerHTML = '';
    eventList.appendChild(listItem);
}

    // Function to generate a random time
    function generateRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
    const minutes = Math.floor(Math.random() * 60); // Random minute between 0 and 59
    const ampm = Math.random() < 0.5 ? 'AM' : 'PM'; // Randomly select AM or PM
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}

    // Function to navigate to the previous month
    function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
}
    createCalendar(currentYear, currentMonth);
}

    // Function to navigate to the next month
    function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
}
    createCalendar(currentYear, currentMonth);
}

    // Display current month's calendar
    const currentDate = new Date();
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
