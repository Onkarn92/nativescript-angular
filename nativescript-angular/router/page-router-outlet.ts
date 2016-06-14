import {Attribute, ComponentFactory, ComponentRef, Directive, ReflectiveInjector, ResolvedReflectiveProvider, ViewContainerRef} from '@angular/core';
import {RouterOutletMap, ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';
import {RouterOutlet} from '@angular/router/directives/router_outlet';

@Directive({ selector: 'page-router-outlet' })
export class PageRouterOutlet extends RouterOutlet {
    // private activated: ComponentRef<any> |null;
    // private _activatedRoute: ActivatedRoute |null;
    // public outletMap: RouterOutletMap;

    /**
     * @internal
     */
    constructor(
        parentOutletMap: RouterOutletMap, location: ViewContainerRef,
        @Attribute('name') name: string) {
        super(parentOutletMap, location, name)
        console.log("----->>>> PageRouterOutlet.constructor")
        // parentOutletMap.registerOutlet(name ? name : PRIMARY_OUTLET, this);
    }

    deactivate(): void {
        console.log("----->>>> PageRouterOutlet.deactivate")
        super.deactivate();
        
        // if (this.activated) {
        //     this.activated.destroy();
        //     this.activated = null;
        // }
    }

    activate(
        factory: ComponentFactory<any>, activatedRoute: ActivatedRoute,
        providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
        
        console.log("----->>>> PageRouterOutlet.activate")
        super.activate(factory, activatedRoute, providers, outletMap);
            
        // this.outletMap = outletMap;
        // this._activatedRoute = activatedRoute;
        // const inj = ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
        // this.activated = this.location.createComponent(factory, this.location.length, inj, []);
    }
}
