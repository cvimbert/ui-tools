import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';

const routes: Routes = [{
  path: "component-editor",
  component: ComponentEditorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentEditorRoutingModule { }
