import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Wiki } from './wiki.model';
import { WikiService } from './wiki.provider';

@IonicPage({
    segment: 'wiki-detail/:id',
    defaultHistory: ['EntityPage', 'wikiPage']
})
@Component({
    selector: 'page-wiki-detail',
    templateUrl: 'wiki-detail.html'
})
export class WikiDetailPage {
    wiki: Wiki;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private wikiService: WikiService, private toastCtrl: ToastController) {
        this.wiki = new Wiki();
        this.wiki.id = params.get('id');
    }

    ionViewDidLoad() {
        this.wikiService.find(this.wiki.id).subscribe(data => this.wiki = data);
    }

    open(item: Wiki) {
        let modal = this.modalCtrl.create('WikiDialogPage', {item: item});
        modal.onDidDismiss(wiki => {
            if (wiki) {
                this.wikiService.update(wiki).subscribe(data => {
                    this.wiki = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Wiki actualizado correctamente.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
