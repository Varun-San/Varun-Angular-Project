import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-weatherapp',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weatherapp.component.html',
  styleUrl: './weatherapp.component.css',
})
export class WeatherappComponent implements OnInit {
  weatherReport: any = {};
  cityName: string = '';
  api: string = '2b6c4af07f57c2ccf98db18010b30054';
  temp: number = 0;
  feels_like: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  pressure: number = 0;
  message: string = '';
  sunrise: string = '';
  sunset: string = '';
  weatherIcon: string = '';
  loading: boolean = false;
  currentTime: string = '';
  isDaytime: boolean = true;
  greetingMessage: string = '';

  http = inject(HttpClient);

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update clock every second
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: true });

    const hours = now.getHours();
    if (hours >= 6 && hours < 18) {
      this.isDaytime = true;
      this.greetingMessage = 'Good Day! ☀️';
    } else {
      this.isDaytime = false;
      this.greetingMessage = 'Good Evening! 🌙';
    }
  }

  onGetWeather() {
    if (!this.cityName.trim()) {
      this.message = 'Please enter a city name.';
      return;
    }

    this.cityName = this.capitalizeCityName(this.cityName);
    this.loading = true;
    this.message = '';

    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.api}&units=metric`
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unexpected error occurred.';
          if (error.status === 404) errorMessage = 'City not found.';
          else if (error.status === 401) errorMessage = 'Invalid API key.';
          else if (error.status === 0) errorMessage = 'Check your network.';
          this.message = errorMessage;
          this.loading = false;
          return throwError(() => new Error(errorMessage));
        })
      )
      .subscribe((result: any) => {
        this.weatherReport = result;
        this.temp = Number(result.main?.temp);
        this.feels_like = Number(result?.main?.feels_like);
        this.humidity = result.main?.humidity;
        this.pressure = result.main?.pressure;
        this.windSpeed = result.wind?.speed;
        this.sunrise = new Date(
          result.sys?.sunrise * 1000
        ).toLocaleTimeString();
        this.sunset = new Date(result.sys?.sunset * 1000).toLocaleTimeString();
        this.weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
        this.isDaytime = this.checkDaytime(
          result.sys?.sunrise,
          result.sys?.sunset
        );
        this.loading = false;
        this.message = '';
      });
  }

  getTemperatureColor(temp: number): string {
    if (temp < 10) return '#00aaff'; // Cold - Blue
    else if (temp >= 10 && temp < 25) return '#ffaa00'; // Mild - Orange
    else return '#ff5733'; // Hot - Red
  }

  checkDaytime(sunrise: number, sunset: number): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= sunrise && currentTime < sunset;
  }

  getBackground(): string {
    return this.isDaytime
      ? 'linear-gradient(45deg, #007bff, #00c6ff)'
      : 'linear-gradient(45deg, #1a1a2e, #16213e)';
  }

  capitalizeCityName(city: string): string {
    return city
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
