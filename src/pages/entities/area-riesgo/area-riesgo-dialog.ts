import { Component } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AreaRiesgo } from './area-riesgo.model';
import { AreaRiesgoService } from './area-riesgo.provider';
import { Respuesta, RespuestaService } from '../respuesta';

@IonicPage()
@Component({
    selector: 'page-area-riesgo-dialog',
    templateUrl: 'area-riesgo-dialog.html'
})
export class AreaRiesgoDialogPage {

    areaRiesgo: AreaRiesgo;
    respuestas: Respuesta[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils,                 private respuestaService: RespuestaService,
                private areaRiesgoService: AreaRiesgoService) {
        this.areaRiesgo = params.get('item');
        if (this.areaRiesgo && this.areaRiesgo.id) {
            this.areaRiesgoService.find(this.areaRiesgo.id).subscribe(data => {
                this.areaRiesgo = data;
            });
        } else {
            this.areaRiesgo = new AreaRiesgo();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.areaRiesgo.id : null],
            nombre: [params.get('item') ? this.areaRiesgo.nombre : '',  Validators.required],
            descripcion: [params.get('item') ? this.areaRiesgo.descripcion : '', ],
            respuestas: [params.get('item') ? this.areaRiesgo.respuestas : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.respuestaService.query()
            .subscribe(data => { this.respuestas = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the area-riesgo, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        
    }

    compareRespuesta(first: Respuesta, second: Respuesta): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRespuestaById(index: number, item: Respuesta) {
        return item.id;
    }
}
