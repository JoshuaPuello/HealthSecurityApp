import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ReporteDetailPage } from './reporte-detail';
import { ReporteService } from './reporte.provider';

@NgModule({
    declarations: [
        ReporteDetailPage
    ],
    imports: [
        IonicPageModule.forChild(ReporteDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        ReporteDetailPage
    ],
    providers: [ReporteService]
})
export class ReporteDetailPageModule {
}
