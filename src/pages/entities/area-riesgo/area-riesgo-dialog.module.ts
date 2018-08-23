import { RespuestaService } from '../respuesta';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaRiesgoDialogPage } from './area-riesgo-dialog';
import { AreaRiesgoService } from './area-riesgo.provider';

@NgModule({
    declarations: [
        AreaRiesgoDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AreaRiesgoDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AreaRiesgoDialogPage
    ],
    providers: [
        AreaRiesgoService,
        RespuestaService,
    ]
})
export class AreaRiesgoDialogPageModule {
}
