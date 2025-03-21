import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // 1. Importa el proveedor

// 2. Modifica la configuración para incluir HttpClient
const modifiedConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient() // 3. Agrega el proveedor aquí
  ]
};

bootstrapApplication(AppComponent, modifiedConfig);
