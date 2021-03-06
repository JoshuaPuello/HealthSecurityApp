import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Principal } from '../../../providers/auth/principal.service';
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
export class ReportePage implements OnInit {
    account: Account;
    reportes: Reporte[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private reporteService: ReporteService,
                private modalCtrl: ModalController, private toastCtrl: ToastController, private principal: Principal) {
        this.reportes = [];
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            if (account === null) {
            } else {
            this.account = account;
            }
        });
    }
        
    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.reporteService.query().subscribe(
            (response) => {
                this.reportes = response.filter(report => report.user.id === this.account.id);
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
                            {message: 'Reporte actualizado correctamente.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.reporteService.create(reporte).subscribe(data => {
                        this.reportes.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Reporte agregado correctamente.', duration: 3000, position: 'middle'});
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
                {message: 'Reporte eliminado correctamente.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(reporte: Reporte) {
        this.navCtrl.push('ReporteDetailPage', {id: reporte.id});
    }
}
