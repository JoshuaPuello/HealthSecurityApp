import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Reporte } from './reporte.model';
import { ReporteService } from './reporte.provider';
import { Respuesta, RespuestaService } from '../respuesta';

@IonicPage()
@Component({
    selector: 'page-reporte-dialog',
    templateUrl: 'reporte-dialog.html'
})
export class ReporteDialogPage {

    reporte: Reporte;
    respuestas: Respuesta[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private respuestaService: RespuestaService,
                private reporteService: ReporteService) {
        this.reporte = params.get('item');
        if (this.reporte && this.reporte.id) {
            this.reporteService.find(this.reporte.id).subscribe(data => {
                this.reporte = data;
            });
        } else {
            this.reporte = new Reporte();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.reporte.id : null],
            valoracion: [params.get('item') ? this.reporte.valoracion : '',  Validators.required],
            nombre: [params.get('item') ? this.reporte.nombre : '',  Validators.required],
            descripcion: [params.get('item') ? this.reporte.descripcion : '', ],
            accinones_realizadas: [params.get('item') ? this.reporte.accinones_realizadas : '', ],
            evidencia: [params.get('item') ? this.reporte.evidencia : '', ],
            evidenciaContentType: [params.get('item') ? this.reporte.evidenciaContentType : ''],
            lugar_evento: [params.get('item') ? this.reporte.lugar_evento : '',  Validators.required],
            tipo_evento: [params.get('item') ? this.reporte.tipo_evento : '',  Validators.required],
            bLabores: [params.get('item') ? this.reporte.bLabores : 'false',  Validators.required],
            bReportado: [params.get('item') ? this.reporte.bReportado : 'false',  Validators.required],
            respuesta: [params.get('item') ? this.reporte.respuesta : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
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
     * The user is done and wants to create the reporte, so return it
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
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera['installed']()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.reporte[fieldName] = data;
                this.reporte[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: 'data:image/jpg;base64,' + data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            })
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.reporte, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareRespuesta(first: Respuesta, second: Respuesta): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRespuestaById(index: number, item: Respuesta) {
        return item.id;
    }
}
