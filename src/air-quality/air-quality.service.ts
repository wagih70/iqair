import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirQuality } from './model/AirQuality';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AirQualityService {
  constructor(
    private axios: HttpService,
    @InjectModel('AirQuality') private airQualityModel: Model<AirQuality>) {}

  private readonly baseUrl = process.env.AIR_QUALITY_BASE_URL;
  private readonly apiKey = process.env.AIR_QUALITY_API_KEY;

  async getNearestCityPollution(lat: number, long: number) {
    if(lat && long) {
      const url = `${this.baseUrl}?lat=${lat}&lon=${long}&key=${this.apiKey}`;
      const response = await this.axios.axiosRef
      .get(url, {
        timeout: 10000,
      })
      .catch((err) => {
        console.log(`Request failed with `, err?.response?.data?.data?.message);
        throw new BadRequestException(`Request failed with ${err?.response?.data?.data?.message}`);
      });
    if (response.status === 200) return { pollution: response?.data?.data?.current?.pollution };
    } else {
      throw new BadRequestException(`Please provide latitude and longitude`);
    }
  }

  async savePollutionData(data: AirQuality) {
    await this.airQualityModel.create(data);
  }

  async getDateAndTimeMostPolluted() {
    const data = await this.airQualityModel.findOne().sort({ aqius: -1 });
    return data.ts;
  }
}
