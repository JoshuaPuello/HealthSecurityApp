import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TemaDialogPage } from './tema-dialog';
import { TemaService } from './tema.provider';

@NgModule({
    declarations: [
        TemaDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TemaDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TemaDialogPage
    ],
    providers: [
        TemaService
    ]
})
export class TemaDialogPageModule {
}
