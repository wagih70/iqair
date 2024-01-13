import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirQualityService } from '../air-quality.service';

@Injectable()
export class AirQualitySpecificZoneJob {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const data = await this.airQualityService.getNearestCityPollution(48.856613, 2.352222);
    await this.airQualityService.savePollutionData(data.pollution);
  }
}
