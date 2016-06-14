import {Type} from '@angular/core/src/facade/lang';
import {provide, Injectable} from '@angular/core';
import {LocationStrategy, PlatformLocation, UrlChangeListener} from '@angular/common';
import { RouterConfig } from '@angular/router';
import { provideRouter } from '@angular/router/common_router_providers';

import {NSRouterLink} from './ns-router-link';
import {PageRouterOutlet} from './page-router-outlet';
import {NSLocationStrategy} from './ns-location-strategy';
import {NativescriptPlatformLocation} from './ns-platform-location';
import {routerLog} from "../trace";

export {routerTraceCategory} from "../trace";

export const NS_ROUTER_PROVIDERS: any[] = [
    NSLocationStrategy,
    provide(LocationStrategy, { useExisting: NSLocationStrategy }),

    NativescriptPlatformLocation,
    provide(PlatformLocation, { useClass: NativescriptPlatformLocation }),
];

export const NS_ROUTER_DIRECTIVES: Type[] = [
    NSRouterLink,
    PageRouterOutlet
];

export function nsProvideRouter(config: RouterConfig): any[] {
    return [
        ...NS_ROUTER_PROVIDERS,
        ...provideRouter(config)
    ]
};