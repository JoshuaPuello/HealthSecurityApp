import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiDetailPage } from './wiki-detail';
import { WikiService } from './wiki.provider';

@NgModule({
    declarations: [
        WikiDetailPage
    ],
    imports: [
        IonicPageModule.forChild(WikiDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        WikiDetailPage
    ],
    providers: [WikiService]
})
export class WikiDetailPageModule {
}
