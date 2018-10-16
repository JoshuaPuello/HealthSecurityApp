import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { TipoRiesgo } from './tipo-riesgo.model';
import { TipoRiesgoService } from './tipo-riesgo.provider';

@IonicPage({
    segment: 'tipo-riesgo-detail/:id',
    defaultHistory: ['EntityPage', 'tipo-riesgoPage']
})
@Component({
    selector: 'page-tipo-riesgo-detail',
    templateUrl: 'tipo-riesgo-detail.html'
})
export class TipoRiesgoDetailPage {
    tipoRiesgo: TipoRiesgo;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private tipoRiesgoService: TipoRiesgoService, private toastCtrl: ToastController) {
        this.tipoRiesgo = new TipoRiesgo();
        this.tipoRiesgo.id = params.get('id');
    }

    ionViewDidLoad() {
        this.tipoRiesgoService.find(this.tipoRiesgo.id).subscribe(data => this.tipoRiesgo = data);
    }

    open(item: TipoRiesgo) {
        let modal = this.modalCtrl.create('TipoRiesgoDialogPage', {item: item});
        modal.onDidDismiss(tipoRiesgo => {
            if (tipoRiesgo) {
                this.tipoRiesgoService.update(tipoRiesgo).subscribe(data => {
                    this.tipoRiesgo = data;
                    let toast = this.toastCtrl.create(
                        {message: 'TipoRiesgo actualizado correctamente.', duration: 3000, position: 'middle'});
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
