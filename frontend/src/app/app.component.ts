import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

interface ClockValue {
  date: string;
  time: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  india: ClockValue = { date: "", time: "" };
  usa: ClockValue = { date: "", time: "" };
  uk: ClockValue = { date: "", time: "" };
  australia: ClockValue = { date: "", time: "" };
  ksa: ClockValue = { date: "", time: "" };

  private clockTimer: any;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.updateClocks();
    this.clockTimer = setInterval(() => this.updateClocks(), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
    }
  }

  private updateClocks(): void {
    const now = new Date();
    this.india = this.toClock(now, "Asia/Kolkata");
    this.usa = this.toClock(now, "America/New_York");
    this.uk = this.toClock(now, "Europe/London");
    this.australia = this.toClock(now, "Australia/Sydney");
    this.ksa = this.toClock(now, "Asia/Riyadh");
  }

  private toClock(now: Date, timeZone: string): ClockValue {
    return {
      date: now.toLocaleDateString("en-GB", {
        timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }),
      time: now.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })
    };
  }
}
