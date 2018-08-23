import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoRiesgoPage } from './tipo-riesgo';
import { TipoRiesgoService } from './tipo-riesgo.provider';

@NgModule({
    declarations: [
        TipoRiesgoPage
    ],
    imports: [
        IonicPageModule.forChild(TipoRiesgoPage),
        TranslateModule.forChild()
    ],
    exports: [
        TipoRiesgoPage
    ],
    providers: [TipoRiesgoService]
})
export class TipoRiesgoPageModule {
}
