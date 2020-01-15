import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentEditorScene } from '../../component-editor-scene.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import { MatDialog } from '@angular/material/dialog';
import { SceneSizeModalComponent } from '../scene-size-modal/scene-size-modal/scene-size-modal.component';
import { SceneSize } from '../scene-size-modal/scene-size.interface';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  editorScene: ComponentEditorScene;
  editorGame: Phaser.Game;

  constructor(
    private editorService: ComponentEditorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {    

    this.editorScene = new ComponentEditorScene(this.editorService);  

    let config: any = {
      type: Phaser.WEBGL,
      width: 400,
      height: 200,
      pixelArt: true,
      resolution: window.devicePixelRatio,
      //zoom: 0.5,
      scale: {
        mode: Phaser.Scale.NONE
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
        this.editorGame.scale.resize(size.width, size.height);
      }      
    });
  }

}
