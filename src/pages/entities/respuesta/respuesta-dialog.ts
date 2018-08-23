import { Component } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Respuesta } from './respuesta.model';
import { RespuestaService } from './respuesta.provider';
import { Reporte, ReporteService } from '../reporte';
import { AreaRiesgo, AreaRiesgoService } from '../area-riesgo';
import { TipoRiesgo, TipoRiesgoService } from '../tipo-riesgo';

@IonicPage()
@Component({
    selector: 'page-respuesta-dialog',
    templateUrl: 'respuesta-dialog.html'
})
export class RespuestaDialogPage {

    respuesta: Respuesta;
    reportes: Reporte[];
    areariesgos: AreaRiesgo[];
    tiporiesgos: TipoRiesgo[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils,                 private reporteService: ReporteService,
                private areaRiesgoService: AreaRiesgoService,
                private tipoRiesgoService: TipoRiesgoService,
                private respuestaService: RespuestaService) {
        this.respuesta = params.get('item');
        if (this.respuesta && this.respuesta.id) {
            this.respuestaService.find(this.respuesta.id).subscribe(data => {
                this.respuesta = data;
            });
        } else {
            this.respuesta = new Respuesta();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.respuesta.id : null],
            valoracion: [params.get('item') ? this.respuesta.valoracion : '',  Validators.required],
            descripcion: [params.get('item') ? this.respuesta.descripcion : '', ],
            estado: [params.get('item') ? this.respuesta.estado : '',  Validators.required],
            reporte: [params.get('item') ? this.respuesta.reporte : '',Validators.required],
            areaRiesgos: [params.get('item') ? this.respuesta.areaRiesgos : '',Validators.required],
            tipoRiesgos: [params.get('item') ? this.respuesta.tipoRiesgos : '',Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.reporteService
            .query({filter: 'respuesta-is-null'})
            .subscribe(data => {
                if (!this.respuesta.reporte || !this.respuesta.reporte.id) {
                    this.reportes = data;
                } else {
                    this.reporteService
                        .find(this.respuesta.reporte.id)
                        .subscribe((subData: Reporte) => {
                            this.reportes = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.areaRiesgoService.query()
            .subscribe(data => { this.areariesgos = data; }, (error) => this.onError(error));
        this.tipoRiesgoService.query()
            .subscribe(data => { this.tiporiesgos = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the respuesta, so return it
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

    compareReporte(first: Reporte, second: Reporte): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackReporteById(index: number, item: Reporte) {
        return item.id;
    }
    compareAreaRiesgo(first: AreaRiesgo, second: AreaRiesgo): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAreaRiesgoById(index: number, item: AreaRiesgo) {
        return item.id;
    }
    compareTipoRiesgo(first: TipoRiesgo, second: TipoRiesgo): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoRiesgoById(index: number, item: TipoRiesgo) {
        return item.id;
    }
}
