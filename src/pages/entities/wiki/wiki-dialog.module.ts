import { TemaService } from '../tema';
import { CategoriaService } from '../categoria';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiDialogPage } from './wiki-dialog';
import { WikiService } from './wiki.provider';

@NgModule({
    declarations: [
        WikiDialogPage
    ],
    imports: [
        IonicPageModule.forChild(WikiDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        WikiDialogPage
    ],
    providers: [
        WikiService,
        TemaService,
        CategoriaService,
    ]
})
export class WikiDialogPageModule {
}
