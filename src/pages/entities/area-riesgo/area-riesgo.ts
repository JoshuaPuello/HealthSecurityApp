import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { AreaRiesgo } from './area-riesgo.model';
import { AreaRiesgoService } from './area-riesgo.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-area-riesgo',
    templateUrl: 'area-riesgo.html'
})
export class AreaRiesgoPage {
    areaRiesgos: AreaRiesgo[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private areaRiesgoService: AreaRiesgoService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.areaRiesgos = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.areaRiesgoService.query().subscribe(
            (response) => {
                this.areaRiesgos = response;
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

    trackId(index: number, item: AreaRiesgo) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: AreaRiesgo) {
        let modal = this.modalCtrl.create('AreaRiesgoDialogPage', {item: item});
        modal.onDidDismiss(areaRiesgo => {
            if (areaRiesgo) {
                if (areaRiesgo.id) {
                    this.areaRiesgoService.update(areaRiesgo).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'AreaRiesgo updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.areaRiesgoService.create(areaRiesgo).subscribe(data => {
                        this.areaRiesgos.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'AreaRiesgo added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(areaRiesgo) {
        this.areaRiesgoService.delete(areaRiesgo.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'AreaRiesgo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(areaRiesgo: AreaRiesgo) {
        this.navCtrl.push('AreaRiesgoDetailPage', {id: areaRiesgo.id});
    }
}
