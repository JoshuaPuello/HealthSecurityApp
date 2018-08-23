import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaDialogPage } from './categoria-dialog';
import { CategoriaService } from './categoria.provider';

@NgModule({
    declarations: [
        CategoriaDialogPage
    ],
    imports: [
        IonicPageModule.forChild(CategoriaDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        CategoriaDialogPage
    ],
    providers: [
        CategoriaService
    ]
})
export class CategoriaDialogPageModule {
}
