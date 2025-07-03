import { Routes } from "@angular/router";

import { NotificationStatusComponent } from "./components/notification-status-component/notification-status-component";

export const routes: Routes = [
  { path: "status", component: NotificationStatusComponent },
  { path: "", redirectTo: "status", pathMatch: "full" },
  { path: "**", redirectTo: "status" },
];
