import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { AreaRiesgo } from './area-riesgo.model';
import { AreaRiesgoService } from './area-riesgo.provider';

@IonicPage({
    segment: 'area-riesgo-detail/:id',
    defaultHistory: ['EntityPage', 'area-riesgoPage']
})
@Component({
    selector: 'page-area-riesgo-detail',
    templateUrl: 'area-riesgo-detail.html'
})
export class AreaRiesgoDetailPage {
    areaRiesgo: AreaRiesgo;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private areaRiesgoService: AreaRiesgoService, private toastCtrl: ToastController) {
        this.areaRiesgo = new AreaRiesgo();
        this.areaRiesgo.id = params.get('id');
    }

    ionViewDidLoad() {
        this.areaRiesgoService.find(this.areaRiesgo.id).subscribe(data => this.areaRiesgo = data);
    }

    open(item: AreaRiesgo) {
        let modal = this.modalCtrl.create('AreaRiesgoDialogPage', {item: item});
        modal.onDidDismiss(areaRiesgo => {
            if (areaRiesgo) {
                this.areaRiesgoService.update(areaRiesgo).subscribe(data => {
                    this.areaRiesgo = data;
                    let toast = this.toastCtrl.create(
                        {message: 'AreaRiesgo updated successfully.', duration: 3000, position: 'middle'});
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
