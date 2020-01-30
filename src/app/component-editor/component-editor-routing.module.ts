import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { ComponentsIndexComponent } from './components/components-index/components-index.component';

const routes: Routes = [
  {
    path: "index",
    component: ComponentsIndexComponent
  },
  {
    path: "component-editor",
    component: ComponentEditorComponent
  },
  {
    path: "component-editor/:id",
    component: ComponentEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentEditorRoutingModule { }
