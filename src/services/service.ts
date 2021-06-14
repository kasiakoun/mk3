import { IService } from "./i_service";
import { injectable } from "inversify";

@injectable()
class Service implements IService {
  getData(): string {
    return "This is fake data";
  }
}

export { Service }
