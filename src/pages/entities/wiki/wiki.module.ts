import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { WikiPage } from './wiki';
import { WikiService } from './wiki.provider';

@NgModule({
    declarations: [
        WikiPage
    ],
    imports: [
        IonicPageModule.forChild(WikiPage),
        TranslateModule.forChild()
    ],
    exports: [
        WikiPage
    ],
    providers: [WikiService]
})
export class WikiPageModule {
}
