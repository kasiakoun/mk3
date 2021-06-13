import Employee from "./test_export/employee";

var employee = new Employee("nikita", "kasiakou");
document.body.innerHTML = `My full name: ${employee.name} ${employee.lastName}`;
console.log("test test");
