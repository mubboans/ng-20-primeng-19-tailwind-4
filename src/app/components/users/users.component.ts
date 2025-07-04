import { ChangeDetectionStrategy, Component, signal, inject, resource, effect, ResourceStatus } from '@angular/core';
import { IUser } from '../../interface/user.interface';
import { ResourceService } from '../../services/resource.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { FormElementComponent } from "../form-element/form-element.component";
import { IFormControl } from '../../interface/form.interface';
@Component({
  selector: 'app-users',
  imports: [CommonModule, ButtonModule, DataViewModule, Tag, InputTextModule, IconFieldModule, InputIconModule, SelectButton, FormsModule, FormElementComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  public query = signal<string>('');
  public resourceService = inject(ResourceService);
  protected userData = resource({
    request: ()=>  this.query(),
    loader:async ({request}) => {
      const response = await this.resourceService.getUsers(request?.toString() || '').toPromise();
      return response.users as IUser[];
    },
  });
  public getSeverity(status: string): 'success' | 'danger' | 'warning' | 'info' {
    switch (status) {
      case 'admin':
        return 'success';
      case 'user':
        return 'info';
      case 'moderator':
        return 'success';
      case 'admin-moderator':
        return 'warning';
      default:
        return 'info';
    }
  }
  public formControlArray = signal<IFormControl[]>([]);
  public options: string[] = ['list', 'grid'];
  public layout: 'grid' | 'list' = 'grid';
  constructor(){
    effect(()=>{
      this.resourceService.fnGetFormControlArray().subscribe((res)=>{
        const resFormControls = res?.control?.filter((x: IFormControl)=> !x.addDynamically);
        this.formControlArray.set(resFormControls as IFormControl[]);
      })
    })
  }
}
