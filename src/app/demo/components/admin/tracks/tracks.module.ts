import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksComponent } from './tracks.component';
import { TracksRoutingModule } from './tracks-routing.module';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ChipModule } from "primeng/chip";
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { PasswordModule } from "primeng/password";
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';

import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule  } from '@angular/google-maps';



@NgModule({
  imports: [
    CommonModule,
    TracksRoutingModule,

    SharedModule,
    GoogleMapsModule,


    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    RippleModule,
    SplitButtonModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipModule,
    KnobModule,
    ListboxModule,
    SelectButtonModule,
    CheckboxModule,
    InputSwitchModule,
    RadioButtonModule,
    ColorPickerModule,
    PasswordModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    MessagesModule,
    MessageModule,
    BadgeModule,
    AvatarModule,
    ScrollPanelModule,
    TagModule,
    SkeletonModule,
    AvatarGroupModule,
    ScrollTopModule,
    DialogModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    SidebarModule,
    ConfirmPopupModule,
    TooltipModule,
    ToolbarModule,
    AccordionModule,
    TabViewModule,
    FieldsetModule,
    MenuModule,
    DividerModule,
    SplitterModule,
    PanelModule
  ],
  declarations: [TracksComponent],
})
export class TracksModule { }
