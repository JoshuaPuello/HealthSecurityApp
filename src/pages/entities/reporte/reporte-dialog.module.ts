import { RespuestaService } from '../respuesta';
import { User as UserService } from '../../../providers/user/user';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ReporteDialogPage } from './reporte-dialog';
import { ReporteService } from './reporte.provider';

@NgModule({
    declarations: [
        ReporteDialogPage
    ],
    imports: [
        IonicPageModule.forChild(ReporteDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        ReporteDialogPage
    ],
    providers: [
        ReporteService,
        RespuestaService,
        UserService,
    ]
})
export class ReporteDialogPageModule {
}
