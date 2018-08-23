import { Component, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Wiki } from './wiki.model';
import { WikiService } from './wiki.provider';
import { Tema, TemaService } from '../tema';
import { Categoria, CategoriaService } from '../categoria';

@IonicPage()
@Component({
    selector: 'page-wiki-dialog',
    templateUrl: 'wiki-dialog.html'
})
export class WikiDialogPage {

    wiki: Wiki;
    temas: Tema[];
    categorias: Categoria[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private temaService: TemaService,
                private categoriaService: CategoriaService,
                private wikiService: WikiService) {
        this.wiki = params.get('item');
        if (this.wiki && this.wiki.id) {
            this.wikiService.find(this.wiki.id).subscribe(data => {
                this.wiki = data;
            });
        } else {
            this.wiki = new Wiki();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.wiki.id : null],
            titulo: [params.get('item') ? this.wiki.titulo : '',  Validators.required],
            imagen: [params.get('item') ? this.wiki.imagen : '', ],
            imagenContentType: [params.get('item') ? this.wiki.imagenContentType : ''],
            descripcion: [params.get('item') ? this.wiki.descripcion : '', ],
            tema: [params.get('item') ? this.wiki.tema : '',Validators.required],
            categoria: [params.get('item') ? this.wiki.categoria : '',Validators.required],
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
        this.temaService.query()
            .subscribe(data => { this.temas = data; }, (error) => this.onError(error));
        this.categoriaService.query()
            .subscribe(data => { this.categorias = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the wiki, so return it
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
                this.wiki[fieldName] = data;
                this.wiki[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.wiki, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareTema(first: Tema, second: Tema): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTemaById(index: number, item: Tema) {
        return item.id;
    }
    compareCategoria(first: Categoria, second: Categoria): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCategoriaById(index: number, item: Categoria) {
        return item.id;
    }
}
