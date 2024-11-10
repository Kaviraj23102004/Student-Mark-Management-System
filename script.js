document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const exportButton = document.getElementById('exportButton');
    const message = document.getElementById('message');

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const studentCgpa = document.getElementById('studentCgpa').value;

        addStudentToTable(studentName, studentCgpa);

        studentForm.reset();
        displayMessage();
    });

    exportButton.addEventListener('click', function() {
        exportToExcel();
    });

    function addStudentToTable(name, cgpa) {
        const newRow = studentTable.insertRow();

        const nameCell = newRow.insertCell(0);
        const cgpaCell = newRow.insertCell(1);

        nameCell.textContent = name;
        cgpaCell.textContent = cgpa;
    }

    function exportToExcel() {
        const tableData = [];
        for (let i = 0; i < studentTable.rows.length; i++) {
            const row = studentTable.rows[i];
            const name = row.cells[0].textContent;
            const cgpa = row.cells[1].textContent;
            tableData.push({ Name: name, CGPA: cgpa });
        }

        const worksheet = XLSX.utils.json_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Student CGPA");

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), 'student_cgpa.xlsx');
    }

    function displayMessage() {
        message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('hidden');
        }, 3000);
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Kaviraj' && password === '1234') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
    } else {
        alert('Incorrect username or password!');
    }
}
