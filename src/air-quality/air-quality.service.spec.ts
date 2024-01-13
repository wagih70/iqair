import { Test } from '@nestjs/testing';
import axios from 'axios';
import { getModelToken } from '@nestjs/mongoose';
import { AirQualityService } from './air-quality.service';
import { HttpModule } from '@nestjs/axios';

describe('AirQualityService', () => {
  let service: AirQualityService;
  let airQualityModel;

  beforeEach(async () => {
    airQualityModel = {
      create: jest.fn(),
      findOne: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AirQualityService,
        {
          provide: getModelToken('AirQuality'),
          useValue: airQualityModel,
        },
      ],
    }).compile();

    service = moduleRef.get<AirQualityService>(AirQualityService);
  });
  

  describe('getNearestCityPollution', () => {
    it('should return pollution data', async () => {
      const lat = 135.5;
      const long = 144;
      const pollutionData = {
        pollution: {
            ts: "2024-01-13T12:00:00.000Z",
            aqius: 54,
            mainus: "p2",
            aqicn: 19,
            maincn: "p2"
        }
      };
      const response = { status: 200, data: { data: { current: pollutionData } } };
      jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve(response as any));
      expect(await service.getNearestCityPollution(lat, long)).toEqual(pollutionData);
    });

    it('should throw BadRequestException when latitude and longitude are not provided', async () => {
      await expect(service.getNearestCityPollution(null, null)).rejects.toThrowError('Please provide latitude and longitude');
    });
  });

  describe('savePollutionData', () => {
    it('should save pollution data', async () => {
      const mockData: any = {
        ts: new Date(),
        aqius: 50,
        mainus: 'p2',
        aqicn: 20,
        maincn: 'p2',
      };
      
      airQualityModel.create.mockReturnValueOnce(Promise.resolve(mockData));
      await service.savePollutionData(mockData);
      expect(airQualityModel.create).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getDateAndTimeMostPolluted', () => {
    it('should return date and time of most polluted air quality', async () => {
      const mockData: any = {
        ts: new Date(),
        aqius: 50,
        mainus: 'p2',
        aqicn: 20,
        maincn: 'p2',
      };
      airQualityModel.findOne.mockReturnValue({ sort: () => mockData });

      const result = await service.getDateAndTimeMostPolluted();
    
      expect(result).toEqual(mockData.ts);
    });
  });
});
