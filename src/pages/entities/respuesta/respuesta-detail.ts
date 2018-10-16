import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Respuesta } from './respuesta.model';
import { RespuestaService } from './respuesta.provider';

@IonicPage({
    segment: 'respuesta-detail/:id',
    defaultHistory: ['EntityPage', 'respuestaPage']
})
@Component({
    selector: 'page-respuesta-detail',
    templateUrl: 'respuesta-detail.html'
})
export class RespuestaDetailPage {
    respuesta: Respuesta;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private respuestaService: RespuestaService, private toastCtrl: ToastController) {
        this.respuesta = new Respuesta();
        this.respuesta.id = params.get('id');
    }

    ionViewDidLoad() {
        this.respuestaService.find(this.respuesta.id).subscribe(data => this.respuesta = data);
    }

    open(item: Respuesta) {
        let modal = this.modalCtrl.create('RespuestaDialogPage', {item: item});
        modal.onDidDismiss(respuesta => {
            if (respuesta) {
                this.respuestaService.update(respuesta).subscribe(data => {
                    this.respuesta = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Respuesta actualizado correctamente.', duration: 3000, position: 'middle'});
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
