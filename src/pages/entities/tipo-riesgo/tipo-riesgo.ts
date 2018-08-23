import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { TipoRiesgo } from './tipo-riesgo.model';
import { TipoRiesgoService } from './tipo-riesgo.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-tipo-riesgo',
    templateUrl: 'tipo-riesgo.html'
})
export class TipoRiesgoPage {
    tipoRiesgos: TipoRiesgo[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private tipoRiesgoService: TipoRiesgoService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.tipoRiesgos = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.tipoRiesgoService.query().subscribe(
            (response) => {
                this.tipoRiesgos = response;
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

    trackId(index: number, item: TipoRiesgo) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: TipoRiesgo) {
        let modal = this.modalCtrl.create('TipoRiesgoDialogPage', {item: item});
        modal.onDidDismiss(tipoRiesgo => {
            if (tipoRiesgo) {
                if (tipoRiesgo.id) {
                    this.tipoRiesgoService.update(tipoRiesgo).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'TipoRiesgo updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.tipoRiesgoService.create(tipoRiesgo).subscribe(data => {
                        this.tipoRiesgos.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'TipoRiesgo added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(tipoRiesgo) {
        this.tipoRiesgoService.delete(tipoRiesgo.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'TipoRiesgo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(tipoRiesgo: TipoRiesgo) {
        this.navCtrl.push('TipoRiesgoDetailPage', {id: tipoRiesgo.id});
    }
}
