import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentEditorScene } from '../../component-editor-scene.class';
import { Game } from 'phaser';

@Component({
  selector: 'app-component-editor',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {

  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  editorScene: ComponentEditorScene;
  editorGame: Game;

  constructor() { }

  ngOnInit() {
    this.editorScene = new ComponentEditorScene();

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 400,
      height: 200,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.editorScene,
      backgroundColor: '#ff0000',
      parent: this.canvasContainer.nativeElement
    };

    this.editorGame = new Phaser.Game(config);
  }

}
