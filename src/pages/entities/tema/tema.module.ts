import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TemaPage } from './tema';
import { TemaService } from './tema.provider';

@NgModule({
    declarations: [
        TemaPage
    ],
    imports: [
        IonicPageModule.forChild(TemaPage),
        TranslateModule.forChild()
    ],
    exports: [
        TemaPage
    ],
    providers: [TemaService]
})
export class TemaPageModule {
}
