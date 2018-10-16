import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Tema } from './tema.model';
import { TemaService } from './tema.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-tema',
    templateUrl: 'tema.html'
})
export class TemaPage {
    temas: Tema[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private temaService: TemaService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.temas = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.temaService.query().subscribe(
            (response) => {
                this.temas = response;
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

    trackId(index: number, item: Tema) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Tema) {
        let modal = this.modalCtrl.create('TemaDialogPage', {item: item});
        modal.onDidDismiss(tema => {
            if (tema) {
                if (tema.id) {
                    this.temaService.update(tema).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Tema actualizado correctamente.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.temaService.create(tema).subscribe(data => {
                        this.temas.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Tema agregado correctamente.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(tema) {
        this.temaService.delete(tema.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Tema eliminado correctamente.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(tema: Tema) {
        this.navCtrl.push('TemaDetailPage', {id: tema.id});
    }
}
