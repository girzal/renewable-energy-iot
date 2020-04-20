import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef, ViewContainerRef, DoCheck, Renderer2 } from '@angular/core';
import { ProgressSpinnerMode, ThemePalette } from '@angular/material';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy, OverlayContainer, OriginConnectionPosition, OverlayConnectionPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { OverlayService } from '../_services/overlay.service';


@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette;
  @Input() diameter?: number = 100;
  @Input() mode?: ProgressSpinnerMode;
  @Input() strokeWidth?: number;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean;
  @Input() elementRef?: ElementRef;
  @Input() templateRef?: TemplateRef<any>;
  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(private vcRef: ViewContainerRef, private overlay: Overlay) {
  }
  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled,
      // hasBackdrop: false,
      // hasBackdrop: true,
      // backdropClass: 'custom-backdrop-class',
      // panelClass: 'custom-panel-class',
    };
    // this.positionGloballyCenter = true;
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig['positionStrategy'] = this.overlay.position()
        .global()
        .centerHorizontally().centerVertically()
    }
    else {
      // this.progressSpinnerOverlayConfig['positionStrategy'] = this.overlay.position()
      //   .connectedTo(this.vcRef.element,
      //   { originX: 'start', originY: 'top' },
      //   { overlayX: 'start', overlayY: 'top' })
      //   .withOffsetX(200)
      //   .withOffsetY(450);
      this.progressSpinnerOverlayConfig['positionStrategy'] = this._getPosition(this.elementRef)
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlay.create(this.progressSpinnerOverlayConfig);
  }
  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      let templatePortal = new TemplatePortal(this.progressSpinnerRef, this.vcRef);
      this.overlayRef.attach(templatePortal);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
  _getPosition(elementToConnectTo: ElementRef) {
    let origin = {
      topLeft: { originX: 'start', originY: 'top' } as OriginConnectionPosition,
      topRight: { originX: 'end', originY: 'top' } as OriginConnectionPosition,
      bottomLeft: { originX: 'start', originY: 'bottom' } as OriginConnectionPosition,
      bottomRight: { originX: 'end', originY: 'bottom' } as OriginConnectionPosition,
      topCenter: { originX: 'center', originY: 'top' } as OriginConnectionPosition,
      bottomCenter: { originX: 'center', originY: 'bottom' } as OriginConnectionPosition
    }
    let overlay = {
      topLeft: { overlayX: 'start', overlayY: 'top' } as OverlayConnectionPosition,
      topRight: { overlayX: 'end', overlayY: 'top' } as OverlayConnectionPosition,
      bottomLeft: { overlayX: 'start', overlayY: 'bottom' } as OverlayConnectionPosition,
      bottomRight: { overlayX: 'end', overlayY: 'bottom' } as OverlayConnectionPosition,
      topCenter: { overlayX: 'center', overlayY: 'top' } as OverlayConnectionPosition,
      bottomCenter: { overlayX: 'center', overlayY: 'bottom' } as OverlayConnectionPosition
    }

    return this.overlay.position()
      .connectedTo(elementToConnectTo, origin.bottomLeft, overlay.topLeft)
      .withOffsetY(10)
      .withDirection('ltr')
      .withFallbackPosition(origin.bottomRight, overlay.topRight)
      .withFallbackPosition(origin.topLeft, overlay.bottomLeft)
      .withFallbackPosition(origin.topRight, overlay.bottomRight)
      .withFallbackPosition(origin.topCenter, overlay.bottomCenter)
      .withFallbackPosition(origin.bottomCenter, overlay.topCenter)
  }

}
