import { CovidService } from "./covid.service";
import {Controller, Get, HttpException, HttpStatus, Param, UseGuards} from "@nestjs/common";

@Controller('covid')
export class CovidController {
    constructor(private readonly Covidservice: CovidService ) {}
    @Get('/worldwide')
    async Get_worldwide_stat() {
        try {
            const value = await this.Covidservice.GetDataForWorldWide();
            return value;
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/:country/select')
    async Get_stat_for_country(@Param('country') country: string) {
        try {
            const value = await this.Covidservice.GetDataForSpecificCountry(country);
            return value;
        } catch (e) {
            throw new HttpException('Bad country name', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/getdataforallcountry')
    async Get_data_for_all_country() {
        try {
            const value = await this.Covidservice.GetDataForAllCountry();
            return value;
        } catch (e) {
            throw new HttpException('api down', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getFatalityRateByAge')
    async getFatalityRateByAge() {
        try {
            const ret = await this.Covidservice.FatalityRateByAge();
            return ret;
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getFatalityRateBySex')
    async getFatalityRateBySex() {
        try {
            const ret = await this.Covidservice.FatalityRateBySex();
            return ret;
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('getFatalityRateByComorbidities')
    async getFatalityRateByComorbidities() {
        try {
            const ret = await this.Covidservice.FatalityRateByComorbidities();
            return ret;
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
