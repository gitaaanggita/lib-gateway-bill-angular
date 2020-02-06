import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from "src/environments/environment";
import { BillModule } from "@uiigateway/bill";

@NgModule({
    imports: [
        CommonModule,
        BillModule.forChild(environment)
    ]
})

export class BillLazyloadModule { }