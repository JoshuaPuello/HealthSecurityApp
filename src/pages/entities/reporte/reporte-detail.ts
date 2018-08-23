import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Reporte } from './reporte.model';
import { ReporteService } from './reporte.provider';

@IonicPage({
    segment: 'reporte-detail/:id',
    defaultHistory: ['EntityPage', 'reportePage']
})
@Component({
    selector: 'page-reporte-detail',
    templateUrl: 'reporte-detail.html'
})
export class ReporteDetailPage {
    reporte: Reporte;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private reporteService: ReporteService, private toastCtrl: ToastController) {
        this.reporte = new Reporte();
        this.reporte.id = params.get('id');
    }

    ionViewDidLoad() {
        this.reporteService.find(this.reporte.id).subscribe(data => this.reporte = data);
    }

    open(item: Reporte) {
        let modal = this.modalCtrl.create('ReporteDialogPage', {item: item});
        modal.onDidDismiss(reporte => {
            if (reporte) {
                this.reporteService.update(reporte).subscribe(data => {
                    this.reporte = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Reporte updated successfully.', duration: 3000, position: 'middle'});
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
