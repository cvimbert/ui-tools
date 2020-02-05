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
import { Textfield } from 'src/app/common/graphic/textfield.class';
import { MetadataEditionModalComponent } from '../metadata-edition-modal/metadata-edition-modal.component';
import { BaseDataItem } from 'src/app/common/data/base-data-item.class';
import { AssetBasedObjectEditModalComponent } from '../asset-based-object-edit-modal/asset-based-object-edit-modal.component';
import { AssetBasedData } from '../../interfaces/assets-based-data.interface';
import { ElectronService } from 'ngx-electron';
import { DataConfiguration } from 'src/app/common/data/data-configuration.class';
import { ActivatedRoute } from '@angular/router';
import { GraphService } from 'src/app/logical-graph/graph.service';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChild("mainContainer") mainContainer: ElementRef;
  @ViewChild("bottomPanel") bottomPanel: ElementRef;

  editorScene: ComponentEditorScene;
  editorGame: Phaser.Game;
  viewport: FlexibleRectangle;
  containerHeight: number;

  bottomPanelBounds: DOMRect;

  settings: ComponentSettings;

  private mainSerializer = new JsonConvert(OperationMode.ENABLE,
    ValueCheckingMode.ALLOW_NULL,
    true);

  constructor(
    public editorService: ComponentEditorService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private dataProvider: DataProviderService,
    private electronService: ElectronService,
    private route: ActivatedRoute,
    private graphService: GraphService
  ) { }

  ngOnInit() {

    // id de composant à passer ici

    this.route.params.subscribe(params => {
      this.editorService.componentId = params["id"];
      this.graphService.componentId = params["id"];

      this.dataProvider.loadAll(this.editorService.componentId);

      // Temporaire
      this.editorService.sceneObjectsBank.items.forEach((item: GraphicObjectContainer, index) => {
        item.depth = index + 1;
      });

      this.loadComponentSettings();
      
      this.viewport = new FlexibleRectangle();

      this.viewport.initRect({
        x: 0,
        y: 0,
        width: this.settings.sceneWidth,
        height: this.settings.sceneHeight,
        xOrigin: 0.5
      });

      this.editorScene = new ComponentEditorScene(this.editorService, this.dataProvider, this.viewport);
      this.editorService.mainScene = this.editorScene;
      this.editorService.editorComponent = this;

      let config: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        width: this.viewport.width.value,
        height: this.viewport.height.value,

        // Problem with shaders
        // resolution: window.devicePixelRatio,
        
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
    });

    
  }

  loadComponentSettings() {
    let obj: Object;

    if (!this.electronService.isElectronApp) {
      let settingsStr = localStorage["settings"];

      if (settingsStr) {
        obj = JSON.parse(settingsStr);
      }
    } else {
      let fs = this.electronService.remote.require("fs");
      let dir = this.editorService.componentId ? this.editorService.componentId + "/" : "";

      let path = DataConfiguration.savePath + dir + "settings.json";

      if (fs.existsSync(path)) {
        obj = JSON.parse(fs.readFileSync(path, 'utf8'));
      }
    }

    if (obj) {
      this.settings = this.mainSerializer.deserializeObject(obj, ComponentSettings);
    } else {
      this.settings = new ComponentSettings();
    }
  }

  saveComponentSettings() {
    let obj = this.mainSerializer.serializeObject(this.settings);
    let str = JSON.stringify(obj);

    if (!this.electronService.isElectronApp) {
      localStorage["settings"] = str;
    } else {
      let fs = this.electronService.remote.require("fs");
      let dir = this.editorService.componentId ? this.editorService.componentId + "/" : "";

      let path = DataConfiguration.savePath + dir + "settings.json";


      if (!fs.existsSync(DataConfiguration.savePath + dir)) {
        fs.mkdirSync(DataConfiguration.savePath + dir, { recursive: true });
      }

      fs.writeFileSync(path, str);
    }
  }

  @HostListener('window:resize')
  onResize() {    
    this.bottomPanelBounds = this.bottomPanel.nativeElement.getBoundingClientRect();
    this.containerHeight = this.mainContainer.nativeElement.getBoundingClientRect().height;
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
    this.dataProvider.saveAll(this.editorService.componentId);
    this.graphService.saveGraphItems();
    this.saveComponentSettings();
  }

  createBaseRect() {
    this.createSceneObject("baseRect");
  }

  createImage() {
    this.createAssetBasedObject("image");
  }

  createNineSliceImage() {
    this.createAssetBasedObject("nineSliceImage");
  }

  createText() {
    this.createSceneObject("textfield")
  }

  createState() {
    this.editorService.createState();
  }

  createTransition() {
    this.editorService.createSceneTransition();
  }

  createAssetBasedObject(type: string) {
    this.dialog.open(AssetBasedObjectEditModalComponent).afterClosed().subscribe((data: AssetBasedData) => {
      if (data) {
        let constructors: { [key: string] : { new (): GraphicObjectContainer } } = {
          image: Image,
          nineSliceImage: NineSliceImage
        };

        let item = new constructors[type]();
        
        this.dataProvider.getBank("scene-objects").pushAfterCreation(item, {
          name: data.name,
          description: data.description,
          type: type
        });

        switch (type) {
          case "image":
            (<Image>item).initObject(data.asset, this.editorScene, null, this.viewport);
            break;
    
          case "nineSliceImage":        
            (<NineSliceImage>item).initObject(this.editorScene, data.asset, 10, {
              x: 100,
              y: 100,
              width: 150,
              height: 80
            }, this.viewport);
    
            break;
        }

        this.editorService.selectObject(item);
      }
    });
  }

  createSceneObject(type: string) {

    this.dialog.open(MetadataEditionModalComponent).afterClosed().subscribe((data: BaseDataItem) => {

      if (data) {
        let constructors: { [key: string] : { new (): GraphicObjectContainer } } = {
          baseRect: BasicRectSprite,
          textfield: Textfield
        };
    
        let item = new constructors[type]();
        
        this.dataProvider.getBank("scene-objects").pushAfterCreation(item, {
          name: data.name,
          description: data.description,
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
    
          case "textfield":
            (<Textfield>item).initObject(this.editorScene, "Placeholder\nsdsqdsq", {
              x: 50,
              y: 50
            }, this.viewport);

            break;
        }
    
        this.editorService.selectObject(item);
      }

    });
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
