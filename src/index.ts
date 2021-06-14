import Employee from "./test_export/employee";

var className = nameof<Employee>();
var employee = new Employee("nikita", "kasiakou");
document.body.innerHTML = `My full name: ${employee.name} ${employee.lastName} class name: ${className}`;
console.log("test test");
