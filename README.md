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
5. Service Creation 
    ng g service /core/data
 6. Firestore Setup
    npm install firebase angularfire2 --save

    i. ngModel imports- 
        import { AngularFirestore } from 'angularfire2/firestore';
        import { AngularFirestoreModule } from 'angularfire2/firestore';
        import { AngularFireStorageModule } from 'angularfire2/storage';

    ii. Add to imports 
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireStorageModule

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
    Fix: (click)="sidenav.close() 

Routes and links: 
1. List -> Detail | Search 




Github issues: 
error: You have not concluded your merge (MERGE_HEAD exists).
hint: Please, commit your changes before merging.
fatal: Exiting because of unfinished merge.

To undo a merge:

git merge --abort [Since git version 1.7.4]

git reset --merge [prior git versions]

Resolve the conflict.

Don't forget to add and commit the merge.

git pull now should work fine.


Application-chats:

Collection | Document | Collection | Document
AllChats -> FoodID -> BuyerId/SellerID -> uniqueID -> {authot: buyerID, Hi, 8AM}

chat {
    sender: string,
    message: string,
    createdAt: new Date()
}

ChatRoomsTest { // collection
    docID { // document
        buyer: string;
        seller: string;
        messages {
            docID { // document
                sender: buyerName,
                message: hi,
                createdAt: 8PM
            }
            docID { // document
                sender: buyerName,
                message: Hello,
                createdAt: 8:05 PM
            }
            docID { // document
                sender: sellerName,
                message: Hello,
                createdAt: 8:10 PM
            }    
        }
    }
    
}
