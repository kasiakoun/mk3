import { Container } from "inversify";
// this import reflect-metadata row has to be after inversify and before other memebers
import "reflect-metadata";
import { IService } from "./services/i_service";
import { Service } from "./services/service";
import { } from "ts-nameof";

export const myContainer = new Container();
myContainer.bind<IService>(nameof<IService>()).to(Service);
