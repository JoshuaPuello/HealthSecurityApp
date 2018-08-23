import { Component } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.provider';

@IonicPage()
@Component({
    selector: 'page-categoria-dialog',
    templateUrl: 'categoria-dialog.html'
})
export class CategoriaDialogPage {

    categoria: Categoria;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils,                 private categoriaService: CategoriaService) {
        this.categoria = params.get('item');
        if (this.categoria && this.categoria.id) {
            this.categoriaService.find(this.categoria.id).subscribe(data => {
                this.categoria = data;
            });
        } else {
            this.categoria = new Categoria();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.categoria.id : null],
            nombre: [params.get('item') ? this.categoria.nombre : '',  Validators.required],
            descripcion: [params.get('item') ? this.categoria.descripcion : '', ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the categoria, so return it
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

}
