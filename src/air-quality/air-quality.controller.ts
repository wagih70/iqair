import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';

@Controller('air-quality')
export class AirQualityController {
  constructor(private service: AirQualityService) {}

  @Get('nearest-city')
  async getNearestCityPollution(@Res() response, @Query('latitude') latitude: number, @Query('longitude') longitude: number ) {
    const result = await this.service.getNearestCityPollution(latitude, longitude);
    return response.status(HttpStatus.OK).json({result});
  }

  @Get('most-polluted')
  async getDateAndTimeMostPolluted(@Res() response) {
    const date = await this.service.getDateAndTimeMostPolluted();
    return response.status(HttpStatus.OK).json({date});
  }
}

