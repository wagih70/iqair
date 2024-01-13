import mongoose from "mongoose";

export const AirQualitySchema = new mongoose.Schema({
  ts: Date,
  aqius: Number,
  mainus: String,
  aqicn: Number,
  maincn: String,
});


export interface AirQuality extends Document {
  ts: Date,
  aqius: number,
  mainus: string,
  aqicn: number,
  maincn: string,
}