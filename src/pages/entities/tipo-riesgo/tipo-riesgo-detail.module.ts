import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoRiesgoDetailPage } from './tipo-riesgo-detail';
import { TipoRiesgoService } from './tipo-riesgo.provider';

@NgModule({
    declarations: [
        TipoRiesgoDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TipoRiesgoDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TipoRiesgoDetailPage
    ],
    providers: [TipoRiesgoService]
})
export class TipoRiesgoDetailPageModule {
}
