import { ReporteService } from '../reporte';
import { AreaRiesgoService } from '../area-riesgo';
import { TipoRiesgoService } from '../tipo-riesgo';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RespuestaDialogPage } from './respuesta-dialog';
import { RespuestaService } from './respuesta.provider';

@NgModule({
    declarations: [
        RespuestaDialogPage
    ],
    imports: [
        IonicPageModule.forChild(RespuestaDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        RespuestaDialogPage
    ],
    providers: [
        RespuestaService,
        ReporteService,
        AreaRiesgoService,
        TipoRiesgoService,
    ]
})
export class RespuestaDialogPageModule {
}
