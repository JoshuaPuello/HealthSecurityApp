import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RespuestaDetailPage } from './respuesta-detail';
import { RespuestaService } from './respuesta.provider';

@NgModule({
    declarations: [
        RespuestaDetailPage
    ],
    imports: [
        IonicPageModule.forChild(RespuestaDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        RespuestaDetailPage
    ],
    providers: [RespuestaService]
})
export class RespuestaDetailPageModule {
}
