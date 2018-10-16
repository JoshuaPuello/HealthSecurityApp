import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.provider';

@IonicPage({
    segment: 'categoria-detail/:id',
    defaultHistory: ['EntityPage', 'categoriaPage']
})
@Component({
    selector: 'page-categoria-detail',
    templateUrl: 'categoria-detail.html'
})
export class CategoriaDetailPage {
    categoria: Categoria;

    constructor(private dataUtils: JhiDataUtils, private modalCtrl: ModalController, params: NavParams,
                private categoriaService: CategoriaService, private toastCtrl: ToastController) {
        this.categoria = new Categoria();
        this.categoria.id = params.get('id');
    }

    ionViewDidLoad() {
        this.categoriaService.find(this.categoria.id).subscribe(data => this.categoria = data);
    }

    open(item: Categoria) {
        let modal = this.modalCtrl.create('CategoriaDialogPage', {item: item});
        modal.onDidDismiss(categoria => {
            if (categoria) {
                this.categoriaService.update(categoria).subscribe(data => {
                    this.categoria = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Categoria actualizado correctamente.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
