import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TemaDetailPage } from './tema-detail';
import { TemaService } from './tema.provider';

@NgModule({
    declarations: [
        TemaDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TemaDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TemaDetailPage
    ],
    providers: [TemaService]
})
export class TemaDetailPageModule {
}
