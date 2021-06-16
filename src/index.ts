import { Employee } from './test_export/employee';
import { myContainer } from './inversify.config';
import { IService } from './services/i_service';

const service = myContainer.get<IService>(nameof<IService>());
const className = nameof<Employee>();
const employee = new Employee('nikita', 'kasiakou');
document.body.innerHTML = `service.getData: ${service.getData()}`;
console.log('test test');
