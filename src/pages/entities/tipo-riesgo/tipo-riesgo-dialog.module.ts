import { RespuestaService } from '../respuesta';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoRiesgoDialogPage } from './tipo-riesgo-dialog';
import { TipoRiesgoService } from './tipo-riesgo.provider';

@NgModule({
    declarations: [
        TipoRiesgoDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TipoRiesgoDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TipoRiesgoDialogPage
    ],
    providers: [
        TipoRiesgoService,
        RespuestaService,
    ]
})
export class TipoRiesgoDialogPageModule {
}
