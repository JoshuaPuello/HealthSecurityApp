import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Tema } from './tema.model';
import { TemaService } from './tema.provider';

@IonicPage({
    segment: 'tema-detail/:id',
    defaultHistory: ['EntityPage', 'temaPage']
})
@Component({
    selector: 'page-tema-detail',
    templateUrl: 'tema-detail.html'
})
export class TemaDetailPage {
    tema: Tema;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private temaService: TemaService, private toastCtrl: ToastController) {
        this.tema = new Tema();
        this.tema.id = params.get('id');
    }

    ionViewDidLoad() {
        this.temaService.find(this.tema.id).subscribe(data => this.tema = data);
    }

    open(item: Tema) {
        let modal = this.modalCtrl.create('TemaDialogPage', {item: item});
        modal.onDidDismiss(tema => {
            if (tema) {
                this.temaService.update(tema).subscribe(data => {
                    this.tema = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Tema actualizado correctamente.', duration: 3000, position: 'middle'});
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
