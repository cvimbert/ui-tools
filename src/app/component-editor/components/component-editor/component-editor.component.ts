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
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';
import { Image } from 'src/app/common/graphic/image.class';
import { NineSliceImage } from 'src/app/common/graphic/nine-slice-image.class';
import { OperationMode, ValueCheckingMode, JsonConvert } from 'json2typescript';
import { ComponentSettings } from '../../component-settings.class';

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


  settings: ComponentSettings;

  private mainSerializer = new JsonConvert(OperationMode.ENABLE,
    ValueCheckingMode.ALLOW_NULL,
    true);

  constructor(
    public editorService: ComponentEditorService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private dataProvider: DataProviderService
  ) { }

  ngOnInit() {

    this.loadComponentSettings();
    
    this.viewport = new FlexibleRectangle();

    this.viewport.init({
      x: 0,
      y: 0,
      width: this.settings.sceneWidth,
      height: this.settings.sceneHeight,
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

  loadComponentSettings() {
    let settingsStr = localStorage["settings"];

    if (settingsStr) {
      let obj = JSON.parse(settingsStr);
      this.settings = this.mainSerializer.deserializeObject(obj, ComponentSettings);
    } else {
      this.settings = new ComponentSettings();
    }
  }

  saveComponentSettings() {
    let obj = this.mainSerializer.serializeObject(this.settings);
    localStorage["settings"] = JSON.stringify(obj);
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

  get selectedObjectId(): string {
    if (this.editorService.selectedObject) {
      return this.editorService.selectedObject.id;
    }
  }

  set selectedObjectId(value: string) {
    this.editorService.selectObject(this.editorService.graphicObjects.find(object => object.id === value));
  }

  saveAll() {
    this.dataProvider.saveAll();
    this.saveComponentSettings();
  }

  createBaseRect() {
    this.createSceneObject("baseRect");
  }

  createImage() {
    this.createSceneObject("image");
  }

  createNineSliceImage() {
    this.createSceneObject("nineSliceImage");
  }

  createSceneObject(type: string) {
    let constructors: { [key: string] : { new (): GraphicObjectContainer } } = {
      baseRect: BasicRectSprite,
      image: Image,
      nineSliceImage: NineSliceImage
    };

    let item = new constructors[type]();
    
    this.dataProvider.getBank("scene-objects").pushAfterCreation(item, {
      name: "TMP name",
      description: "TMP description",
      type: type
    });


    switch (type) {
      case "baseRect":
        item.initWithScene(this.editorScene, {
          x: 40,
          y: 40,
          width: 100,
          height: 80
        }, this.viewport);

        break;

      case "image":
        (<Image>item).initObject("arrow", this.editorScene, null, this.viewport);
        break;

      case "nineSliceImage":        
        (<NineSliceImage>item).initObject(this.editorScene, "t1", 10, {
          x: 100,
          y: 100,
          width: 150,
          height: 80
        }, this.viewport);

        break;
    }

    this.editorService.selectObject(item);
  }

  resize(width: number, height: number) {
    this.viewport.width.value = width;
    this.viewport.height.value = height;
    this.settings.sceneWidth = width;
    this.settings.sceneHeight = height;
    this.editorGame.scale.resize(width, height);
    this.editorScene.render();
  }

  update() {    
    this.cdRef.detectChanges();
  }
}
