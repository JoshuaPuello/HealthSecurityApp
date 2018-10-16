import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Principal } from '../../../providers/auth/principal.service';
import { JhiDataUtils } from 'ng-jhipster';
import { Respuesta } from './respuesta.model';
import { RespuestaService } from './respuesta.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-respuesta',
    templateUrl: 'respuesta.html'
})
export class RespuestaPage implements OnInit {
    account: Account;
    respuestas: Respuesta[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private respuestaService: RespuestaService,
                private modalCtrl: ModalController, private toastCtrl: ToastController, private principal: Principal) {
        this.respuestas = [];
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
        this.respuestaService.query().subscribe(
            (response) => {
                this.respuestas = response.filter(rep => rep.reporte.user.id === this.account.id);
                console.log("Id en sesion: " + this.account.id);
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

    trackId(index: number, item: Respuesta) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Respuesta) {
        let modal = this.modalCtrl.create('RespuestaDialogPage', {item: item});
        modal.onDidDismiss(respuesta => {
            if (respuesta) {
                if (respuesta.id) {
                    this.respuestaService.update(respuesta).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Respuesta actualizado correctamente.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.respuestaService.create(respuesta).subscribe(data => {
                        this.respuestas.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Respuesta agregado correctamente.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(respuesta) {
        this.respuestaService.delete(respuesta.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Respuesta eliminado correctamente.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(respuesta: Respuesta) {
        this.navCtrl.push('RespuestaDetailPage', {id: respuesta.id});
    }
}
