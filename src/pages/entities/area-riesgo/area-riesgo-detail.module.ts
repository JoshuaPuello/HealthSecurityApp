import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaRiesgoDetailPage } from './area-riesgo-detail';
import { AreaRiesgoService } from './area-riesgo.provider';

@NgModule({
    declarations: [
        AreaRiesgoDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AreaRiesgoDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AreaRiesgoDetailPage
    ],
    providers: [AreaRiesgoService]
})
export class AreaRiesgoDetailPageModule {
}
