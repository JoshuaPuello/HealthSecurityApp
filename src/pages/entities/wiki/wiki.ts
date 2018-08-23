import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Wiki } from './wiki.model';
import { WikiService } from './wiki.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-wiki',
    templateUrl: 'wiki.html'
})
export class WikiPage {
    wikis: Wiki[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private wikiService: WikiService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.wikis = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.wikiService.query().subscribe(
            (response) => {
                this.wikis = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Wiki) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Wiki) {
        let modal = this.modalCtrl.create('WikiDialogPage', {item: item});
        modal.onDidDismiss(wiki => {
            if (wiki) {
                if (wiki.id) {
                    this.wikiService.update(wiki).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Wiki updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.wikiService.create(wiki).subscribe(data => {
                        this.wikis.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Wiki added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(wiki) {
        this.wikiService.delete(wiki.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Wiki deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(wiki: Wiki) {
        this.navCtrl.push('WikiDetailPage', {id: wiki.id});
    }
}
