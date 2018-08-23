import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RespuestaPage } from './respuesta';
import { RespuestaService } from './respuesta.provider';

@NgModule({
    declarations: [
        RespuestaPage
    ],
    imports: [
        IonicPageModule.forChild(RespuestaPage),
        TranslateModule.forChild()
    ],
    exports: [
        RespuestaPage
    ],
    providers: [RespuestaService]
})
export class RespuestaPageModule {
}
