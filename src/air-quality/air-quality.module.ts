import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { AirQualitySchema } from './model/AirQuality';
import { HttpModule } from '@nestjs/axios';
import { AirQualitySpecificZoneJob } from './cron-job/air-quality-specific-zone';

@Module({
  controllers: [AirQualityController],
  providers: [AirQualityService, AirQualitySpecificZoneJob],
  imports: [
    MongooseModule.forFeature([{ name: 'AirQuality', schema: AirQualitySchema }]),
    HttpModule,
  ],
})
export class AirQualityModule {}
