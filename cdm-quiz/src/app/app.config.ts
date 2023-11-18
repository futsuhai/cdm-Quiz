import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    private baseUrl = 'http://localhost:5035';

    public get questionsApi(): string {
        return `${this.baseUrl}/api/questions`;
    }

}