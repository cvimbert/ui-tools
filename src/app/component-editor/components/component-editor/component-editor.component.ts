import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentEditorScene } from '../../component-editor-scene.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

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
    private editorService: ComponentEditorService
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
        //mode: Phaser.Scale.NO_ZOOM
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

}
