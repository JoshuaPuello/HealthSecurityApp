import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { JhiDataUtils } from 'ng-jhipster';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-categoria',
    templateUrl: 'categoria.html'
})
export class CategoriaPage {
    categorias: Categoria[];

    // todo: add pagination

    constructor(private dataUtils: JhiDataUtils,private navCtrl: NavController, private categoriaService: CategoriaService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.categorias = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.categoriaService.query().subscribe(
            (response) => {
                this.categorias = response;
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

    trackId(index: number, item: Categoria) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    open(slidingItem: any, item: Categoria) {
        let modal = this.modalCtrl.create('CategoriaDialogPage', {item: item});
        modal.onDidDismiss(categoria => {
            if (categoria) {
                if (categoria.id) {
                    this.categoriaService.update(categoria).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Categoria updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.categoriaService.create(categoria).subscribe(data => {
                        this.categorias.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Categoria added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(categoria) {
        this.categoriaService.delete(categoria.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Categoria deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(categoria: Categoria) {
        this.navCtrl.push('CategoriaDetailPage', {id: categoria.id});
    }
}
