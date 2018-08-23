import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportePage } from './reporte';
import { ReporteService } from './reporte.provider';

@NgModule({
    declarations: [
        ReportePage
    ],
    imports: [
        IonicPageModule.forChild(ReportePage),
        TranslateModule.forChild()
    ],
    exports: [
        ReportePage
    ],
    providers: [ReporteService]
})
export class ReportePageModule {
}
