import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPage } from './categoria';
import { CategoriaService } from './categoria.provider';

@NgModule({
    declarations: [
        CategoriaPage
    ],
    imports: [
        IonicPageModule.forChild(CategoriaPage),
        TranslateModule.forChild()
    ],
    exports: [
        CategoriaPage
    ],
    providers: [CategoriaService]
})
export class CategoriaPageModule {
}
