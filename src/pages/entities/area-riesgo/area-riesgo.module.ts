import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaRiesgoPage } from './area-riesgo';
import { AreaRiesgoService } from './area-riesgo.provider';

@NgModule({
    declarations: [
        AreaRiesgoPage
    ],
    imports: [
        IonicPageModule.forChild(AreaRiesgoPage),
        TranslateModule.forChild()
    ],
    exports: [
        AreaRiesgoPage
    ],
    providers: [AreaRiesgoService]
})
export class AreaRiesgoPageModule {
}
