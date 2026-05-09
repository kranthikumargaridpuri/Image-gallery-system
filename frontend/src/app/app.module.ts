import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login.component";
import { RegisterComponent } from "./pages/register.component";
import { GalleryComponent } from "./pages/gallery.component";
import { CartComponent } from "./pages/cart.component";
import { AdminComponent } from "./pages/admin.component";
import { ImagePreviewComponent } from "./image-preview/image-preview.component";

import { AuthInterceptor } from "./services/auth.interceptor";
import { AuthGuard } from "./services/auth.guard";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: "", component: GalleryComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },

  { path: "image-preview/:id", component: ImagePreviewComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GalleryComponent,
    CartComponent,
    AdminComponent,
    ImagePreviewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}