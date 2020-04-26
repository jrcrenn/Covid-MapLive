import {HttpService, Injectable} from "@nestjs/common";
import {map} from 'rxjs/operators';
import { response } from "express";

@Injectable()
export class CovidService {
    constructor(private readonly httpService: HttpService) {}

    async GetDataForWorldWide(): Promise<any> {
        const urlApi: string = 'https://covid19-server.chrismichael.now.sh/api/v1/AllReports';
        return this.httpService.get(urlApi).pipe(map(response => response.data.reports[0].table[0][0]));
    }

    async GetDataForSpecificCountry(country: string): Promise<any> {
        const urlApi: string = 'https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/' + country;
        return this.httpService.get(urlApi).pipe(map(response => response.data));
    }
    async GetDataForAllCountry(): Promise<any> {
        const urlApi: string = 'https://covid19-server.chrismichael.now.sh/api/v1/AllReports';
        return this.httpService.get(urlApi).pipe(map(response => response.data.reports[0].table[0]));
    }

    async FatalityRateByAge(): Promise<any> {
        const api: string = 'https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByAge';
        return this.httpService.get(api).pipe(map(response => response.data));
    }

    async FatalityRateBySex(): Promise<any> {
        const api: string = 'https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateBySex';
        return this.httpService.get(api).pipe(map(response => response.data));
    }

    async FatalityRateByComorbidities(): Promise<any> {
        const api: string = 'https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByComorbidities';
        return this.httpService.get(api).pipe(map(response => response.data));
    }
}