import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Reporte } from './reporte.model';
import { ReporteService } from './reporte.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-reporte',
    templateUrl: 'reporte.html'
})
export class ReportePage {
    reportes: Reporte[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private reporteService: ReporteService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.reportes = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.reporteService.query().subscribe(
            (response) => {
                this.reportes = response;
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

    trackId(index: number, item: Reporte) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Reporte) {
        let modal = this.modalCtrl.create('ReporteDialogPage', {item: item});
        modal.onDidDismiss(reporte => {
            if (reporte) {
                if (reporte.id) {
                    this.reporteService.update(reporte).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Reporte updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.reporteService.create(reporte).subscribe(data => {
                        this.reportes.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Reporte added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(reporte) {
        this.reporteService.delete(reporte.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Reporte deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(reporte: Reporte) {
        this.navCtrl.push('ReporteDetailPage', {id: reporte.id});
    }
}
