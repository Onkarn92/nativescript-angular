import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterConfig, ActivatedRoute, Router, ROUTER_DIRECTIVES, Event } from '@angular/router';
import { Observable } from "rxjs";
import { NS_ROUTER_DIRECTIVES, nsProvideRouter} from "nativescript-angular/router"
import { Location, LocationStrategy} from '@angular/common';
import { Page } from "ui/page";


@Component({
    selector: "first",
    styleUrls: ["examples/router/styles.css"],
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    template: `
    <StackLayout>
        <Label text="First component" class="title"></Label>
        <Button text="Start" [nsRouterLink]="['/second', '1' ]"></Button>
        <Button text="Detail" [nsRouterLink]="['/second', '1', 'detail',  '3' ]"></Button>
    </StackLayout>`
})
class FirstComponent implements OnInit, OnDestroy {
    constructor(page: Page) {
        console.log("FirstComponent.constructor() page: " + page);
    }

    ngOnInit() {
        console.log("FirstComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("FirstComponent - ngOnDestroy()");
    }
}



@Component({
    selector: 'master',
    template: `
    <StackLayout>
        <Label text="Master View" style="font-size: 20; horizontal-align: center; margin: 10"></Label>
            
        <Button *ngFor="#detail of details" [text]="'Detail ' + detail" (tap)="onSelect(detail)"></Button>
    </StackLayout>
    `
})
class MasterComponent {
    public details: Array<number> = [1, 2, 3];

    constructor(private router: Router) {
        console.log("MasterComponent.constructor()");
    }

    onSelect(val: number) {
        this.router.navigate(['../detail', val ]);
    }
}

@Component({
    selector: 'detail',
    template: `
    <StackLayout margin="10">
        <Button text="BACK TO MASTER" (tap)="onUnselect()"></Button>
            
        <Label [text]="'Detail: ' + (id | async)"
            style="font-size: 20; horizontal-align: center; margin: 10"></Label>
    </StackLayout>
    `
})
class DetailComponent {
    public id: Observable<string>;
    constructor(route: ActivatedRoute, private router: Router) {
        console.log("DetailComponent.constructor()");
        this.id = route.params.map(r => r["id"]);
    }

    onUnselect() {
        this.router.navigate(['./', 'main']);
    }
}



@Component({
    selector: "second",
    styleUrls: ["examples/router/styles.css"],
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    template: `
    <StackLayout>
        <Label [text]="'Second component: ' + (depth | async)" class="title"></Label>

        <Button text="BACK" (tap)="goBack()"></Button>
        <Button text="First" [nsRouterLink]="['/first']"></Button>

        <router-outlet></router-outlet>

    </StackLayout>`
})
class SecondComponent implements OnInit, OnDestroy {
    public depth: Observable<string>;
    constructor(private location: Location, route: ActivatedRoute, page: Page) {
        console.log("SecondComponent.constructor() page: " + page);
        this.depth = route.params.map(r => r["depth"]);
    }

    ngOnInit() {
        console.log("SecondComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("SecondComponent - ngOnDestroy()");
    }

    goBack() {
        this.location.back();
    }
}


@Component({
    selector: 'navigation-test',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    template: `<page-router-outlet></page-router-outlet>`
})
export class PageRouterOutletNestedAppComponent {
    constructor(router: Router, private location: Location) {
        router.events.subscribe((e) => {
            console.log("--EVENT-->: " + e.toString());
        })
    }
}


const routes: RouterConfig = [
    { path: "/first", component: FirstComponent, index: true },
    {
        path: "/second/:depth", component: SecondComponent,
        children: [
            { path: "master", component: MasterComponent, index: true },
            { path: "detail/:id", component: DetailComponent }
        ]
    },
];

export const PageRouterOutletNestedRouterProviders = [
    nsProvideRouter(routes)
];