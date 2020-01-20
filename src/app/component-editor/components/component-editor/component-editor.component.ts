import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { ComponentEditorScene } from '../../component-editor-scene.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import { MatDialog } from '@angular/material/dialog';
import { SceneSizeModalComponent } from '../scene-size-modal/scene-size-modal/scene-size-modal.component';
import { SceneSize } from '../scene-size-modal/scene-size.interface';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { DataProviderService } from '../../services/data-provider.service';
import { BasicRectSprite } from 'src/app/common/graphic/basic-rect-sprite.class';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChild("mainContainer") mainContainer: ElementRef;
  editorScene: ComponentEditorScene;
  editorGame: Phaser.Game;
  viewport: FlexibleRectangle;
  containerHeight: number;

  constructor(
    private editorService: ComponentEditorService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private dataProvider: DataProviderService
  ) { }

  ngOnInit() {
    
    this.viewport = new FlexibleRectangle();

    this.viewport.init({
      x: 0,
      y: 0,
      width: 400,
      height: 200,
      xOrigin: 0.5
    });

    this.editorScene = new ComponentEditorScene(this.editorService, this.dataProvider, this.viewport);
    this.editorService.editorComponent = this;

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: this.viewport.width.value,
      height: this.viewport.height.value,
      resolution: window.devicePixelRatio,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.editorScene,
      backgroundColor: '#ffffff',
      parent: this.canvasContainer.nativeElement,
      plugins: {
        global: [
          NineSlicePlugin.DefaultCfg
        ],
      }
    };
    
    this.editorGame = new Phaser.Game(config);

    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {    
    this.containerHeight = (<HTMLElement>this.mainContainer.nativeElement).getBoundingClientRect().height;
  }

  editSceneSize() {    
    this.dialog.open(SceneSizeModalComponent, {
      data: <SceneSize> {
        width: this.editorGame.scale.width,
        height: this.editorGame.scale.height
      }
    }).afterClosed().subscribe((size: SceneSize) => {
      if (size) {
        this.resize(size.width, size.height);
      }      
    });
  }

  saveAll() {
    this.dataProvider.saveAll();
  }

  createBaseRect() {
    let item: BasicRectSprite = this.dataProvider.getBank("base").createItem({
      name: "rect 1",
      description: "desc rect 1"
    });

    item.initWithScene(this.editorScene, {
      x: 40,
      y: 40,
      width: 100,
      height: 80
    }, this.viewport);
  }

  resize(width: number, height: number) {
    this.viewport.width.value = width;
    this.viewport.height.value = height;
    this.editorGame.scale.resize(width, height);
    this.editorScene.render();
  }

  update() {    
    this.cdRef.detectChanges();
  }
}
