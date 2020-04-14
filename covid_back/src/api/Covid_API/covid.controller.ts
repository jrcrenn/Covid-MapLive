import { CovidService } from "./covid.service";
import {Controller, Get, HttpException, HttpStatus, Param, UseGuards} from "@nestjs/common";

@Controller('covid')
export class CovidController {
    constructor(private readonly Covidservice: CovidService ) {}
    @Get('/worldwide')
    @UseGuards()
    async Get_worldwide_stat() {
        try {
            const value = await this.Covidservice.GetDataForWorldWide();
            return value;
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/:country/select')
    @UseGuards()
    async Get_stat_for_country(@Param('country') country: string) {
        try {
            const value = await this.Covidservice.GetDataForSpecificCountry(country);
            return value;
        } catch (e) {
            throw new HttpException('Bad country name', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/getdataforallcountry')
    @UseGuards()
    async Get_data_for_all_country() {
        try {
            const value = await this.Covidservice.GetDataForAllCountry();
            return value;
        } catch (e) {
            throw new HttpException('api down', HttpStatus.BAD_REQUEST);
        }
    }
}
