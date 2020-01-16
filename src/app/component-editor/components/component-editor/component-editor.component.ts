import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ComponentEditorScene } from '../../component-editor-scene.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import { MatDialog } from '@angular/material/dialog';
import { SceneSizeModalComponent } from '../scene-size-modal/scene-size-modal/scene-size-modal.component';
import { SceneSize } from '../scene-size-modal/scene-size.interface';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  editorScene: ComponentEditorScene;
  editorGame: Phaser.Game;
  viewport: FlexibleRectangle;

  constructor(
    private editorService: ComponentEditorService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {  
    
    this.viewport = new FlexibleRectangle({
      x: 0,
      y: 0,
      width: 400,
      height: 200
    });

    this.editorScene = new ComponentEditorScene(this.editorService, this.viewport);
    this.editorService.editorComponent = this;

    let config: any = {
      type: Phaser.WEBGL,
      width: this.viewport.width,
      height: this.viewport.height,
      pixelArt: true,
      resolution: window.devicePixelRatio,
      //zoom: 0.5,
      scale: {
        //mode: Phaser.Scale.NONE
      },
      scene: this.editorScene,
      backgroundColor: '#ff0000',
      parent: this.canvasContainer.nativeElement,
      plugins: {
        global: [ NineSlicePlugin.DefaultCfg ],
      }
    };
    
    this.editorGame = new Phaser.Game(config);
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

  resize(width: number, height: number) {
    this.viewport.width = width;
    this.viewport.height = height;
    this.editorGame.scale.resize(width, height);
  }

  update() {    
    this.cdRef.detectChanges();
  }
}
