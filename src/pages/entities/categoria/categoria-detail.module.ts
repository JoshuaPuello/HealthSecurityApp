import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaDetailPage } from './categoria-detail';
import { CategoriaService } from './categoria.provider';

@NgModule({
    declarations: [
        CategoriaDetailPage
    ],
    imports: [
        IonicPageModule.forChild(CategoriaDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CategoriaDetailPage
    ],
    providers: [CategoriaService]
})
export class CategoriaDetailPageModule {
}
