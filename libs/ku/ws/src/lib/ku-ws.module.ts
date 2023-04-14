import { Module } from '@nestjs/common';
import {ConnectionManager} from "./connection-manager";
import {KuHttpModule} from "@hft/ku/http";

@Module({
  imports: [KuHttpModule],
	providers: [ConnectionManager],
	exports: [ConnectionManager],
})
export class KuWsModule {}
