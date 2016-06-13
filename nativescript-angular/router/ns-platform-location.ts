import {NSLocationStrategy} from './ns-location-strategy';
import {PlatformLocation, UrlChangeListener} from '@angular/common';
import {Injectable} from '@angular/core';
import {routerLog} from "../trace";


@Injectable()
export class NativescriptPlatformLocation extends PlatformLocation {
    // private _location: Location;
    // private _history: History;

    constructor(private locationStartegy: NSLocationStrategy) {
        super();
        routerLog("NativescriptPlatformLocation.constructor()");
    }

    getBaseHrefFromDOM(): string {
        return "/";
    }

    onPopState(fn: UrlChangeListener): void {
        routerLog("NativescriptPlatformLocation.onPopState()");

        // getDOM().getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    }

    onHashChange(fn: UrlChangeListener): void {
        routerLog("NativescriptPlatformLocation.onHashChange()");

        // getDOM().getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
    }

    get search(): string {
        routerLog("NativescriptPlatformLocation.get search()");
        
        return "";
    }
    get hash(): string {
        routerLog("NativescriptPlatformLocation.get hash()");
        
        return "";
    }
    get pathname(): string {
        routerLog("NativescriptPlatformLocation.get pathname()");
        
        return this.locationStartegy.path();
    }
    set pathname(newPath: string) {
        routerLog("NativescriptPlatformLocation.set pathname(): " + newPath);

    }

    pushState(state: any, title: string, url: string): void {
        routerLog("NativescriptPlatformLocation.pushState()");

        this.locationStartegy.pushState(state, title, url, null);
        // if (supportsState()) {
        //   this._history.pushState(state, title, url);
        // } else {
        //   this._location.hash = url;
        // }
    }

    replaceState(state: any, title: string, url: string): void {
        routerLog("NativescriptPlatformLocation.replaceState()");

        this.locationStartegy.replaceState(state, title, url, null);
        // if (supportsState()) {
        //   this._history.replaceState(state, title, url);
        // } else {
        //   this._location.hash = url;
        // }
    }

    forward(): void {
        routerLog("NativescriptPlatformLocation.forward()");

        // this._history.forward();
    }

    back(): void {
        routerLog("NativescriptPlatformLocation.back()");

        // this._history.back();
    }
}
