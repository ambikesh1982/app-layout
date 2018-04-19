1. Create new project with default routing and no spec files.
    ng new app-layout --routing --skip-tests  --style scss -spec false
2. cd app-layout/

3. Install packages 
    npm install --save @angular/material @angular/cdk
    npm install --save @angular/animations
    npm install --save hammerjs
    npm install @angular/flex-layout --save

4. app.module changes
    import {FlexLayoutModule} from '@angular/flex-layout';

Module and Components:
    ng g module product
    ng g component product/product-list
    ng g component product/product-detail
    ng g component product/product-new
    ng g component product/product-modify
    ng g module shared
    ng g c shared/app-toolbar -m shared

#Issues:
1. Sidenav not closing automatically, after clicking on sidenav list items.