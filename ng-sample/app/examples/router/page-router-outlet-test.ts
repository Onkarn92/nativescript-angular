import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterConfig, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from "rxjs";
import { NS_ROUTER_DIRECTIVES, nsProvideRouter} from "nativescript-angular/router"

@Component({
    selector: "first",
    styleUrls: ["examples/router/styles.css"],
    template: `
    <StackLayout>
        <Label text="First component" class="title"></Label>
    </StackLayout>`
})
class FirstComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log("FirstComponent - ngOnInit()");
    }
    
    ngOnDestroy() {
        console.log("FirstComponent - ngOnDestroy()");
    }
}

@Component({
    selector: "second",
    styleUrls: ["examples/router/styles.css"],
    template: `
    <StackLayout>
        <Label [text]="'Second component: ' + (id | async)" class="title"></Label>
    </StackLayout>`
})
class SecondComponent implements OnInit, OnDestroy {
    id: Observable<string>;
    constructor(route: ActivatedRoute) {
        this.id = route.params.map(r => r["id"]);
    }

    ngOnInit() {
        console.log("SecondComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("SecondComponent - ngOnDestroy()");
    }
}

@Component({
    selector: 'navigation-test',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    styleUrls: ["examples/router/styles.css"],
    template: `
        <StackLayout>
            <StackLayout class="nav">
                <Button text="First" [nsRouterLink]="['/first']"></Button>
                <Button text="Second(1)" [nsRouterLink]="['/second', '1' ]"></Button>
                <Button text="Second(2)" [nsRouterLink]="['/second', '2' ]"></Button>
            </StackLayout>
            
            <page-router-outlet></page-router-outlet>
        </StackLayout>
    `
})
export class PageRouterOutletAppComponent {
}


const routes: RouterConfig = [
    { path: "/first", component: FirstComponent, index: true },
    { path: "/second/:id", component: SecondComponent },
];

export const PageRouterOutletRouterProviders = [
    nsProvideRouter(routes)
];