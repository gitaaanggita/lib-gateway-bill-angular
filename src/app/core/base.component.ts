import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, NavigationError, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginDialogComponent, AuthenticationService, CoreService, NotificationService, StatusService, StorageService, STORAGE_KEY } from '@uiigateway/core';
import { TranslateService, ErrorService, ErrorEvent, LoadingBarService, ConfirmdialogComponent, getValueOfIndexArrayString, MODAL, NOTIFICATION_TYPE } from 'pilar';

@Component({
  selector: 'ugw-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements OnInit, OnDestroy {
  @HostBinding('class.base') baseClass = true;
  @HostBinding('class.has-sidebar') public hasSidebar: boolean;
  @HostBinding('class.has-breadcrumb') public hasBreadcrumb: boolean;
  @HostBinding('class.is-home') public isHome: boolean;
  @HostBinding('class.sidebar-open') public sidebarOpen: boolean;
  @HostBinding('class.has-shortcut-menu') public hasShortcutMenu: boolean;

  modalRef: BsModalRef;
  public menus: Array<any> = [];
  public applications: Array<any>;
  public dataNotifications: Array<any>;
  public dataShortcutApps: Array<any>;
  public dataAccount: any;
  public selectedApplication: any;

  public userLogin;
  public userGroupPrimary: any;
  public userGroups: Array<any> = [];
  public intervalPullNotification: any;
  public subsNotifications: any;
  public subsMenu: any;

  public homeLayoutUrl: Array<any> = ['/'];
  public profileLayoutUrl: Array<any> = ['/account/profile'];
  public fullLayoutUrl: Array<any> = ['/404NotFound', '/underconstruction'];
  public fullWidthUrl: Array<any> = ['/account/log', '/account/notification'];
  public notAppUrl: Array<any> = ['/account/profile', '/account/log', '/account/notification'];

  public isFullWidthLayout = false;
  public isDefaultLayout = false;
  public isHomeLayout = false;
  public isProfileLayout = false;
  public isFullLayout = false;
  public showBreadcrumb = false;
  public showNotification = false;
  public showShortcutMenu = false;

  growlSubcriber: Subscription;
  errorSubcriber: Subscription;
  isAppsLoaded = false;

  constructor(
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private authenticationSvc: AuthenticationService,
    private coreSvc: CoreService,
    private errorSvc: ErrorService,
    private modalSvc: BsModalService,
    private notificationSvc: NotificationService,
    private slimLoadingBarSvc: LoadingBarService,
    private statusSvc: StatusService,
    private storageSvc: StorageService,
    private translateSvc: TranslateService,
    private toastr: ToastrService
  ) {
    try {
      this.menus = this.storageSvc.getLocalStorage(STORAGE_KEY.CURRENT_MENU + getValueOfIndexArrayString(this.router.url, '/', 1));
    } catch (error) {
      console.log(error);
    }
  }

  private doChangeApplication(application) {
    const params: any = {
      'url': application.url,
      'uuid_aplikasi': application.uuid_aplikasi,
      'target': application.target
    };
    this.doRequestMenu(params);
    this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_MENU);
    this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP + application.url);
    this.storageSvc.setLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP + application.url, application);
  }

  private getDataAccount(): any {
    try {
      return {
        user_info: this.authenticationSvc.userInfo,
        group_default: this.authenticationSvc.userGroups.filter(value => value.current === true),
        groups: this.authenticationSvc.userGroups.filter(value => value.current === false)
      };
    } catch (error) {
      // console.log(error);
      return {
        user_info: this.authenticationSvc.userInfo,
        group_default: [],
        groups: []
      };
    }
  }

  private getShortcutApps(): any {
    try {
      if (this.notAppUrl.findIndex(url => url === this.router.url) > -1) {
        this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP);
      }

      const currentMenu = this.storageSvc.getLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP + '_' + getValueOfIndexArrayString(this.router.url, '/', 1));
      return this.applications.filter(value => value.uuid_aplikasi !== currentMenu.uuid_aplikasi);
    } catch (error) {
      // console.log(error);
      return this.applications;
    }
  }

  private doRequestMenu(params: any) {
    this.slimLoadingBarSvc.start();
    this.authenticationSvc.authority(params, (result, menus) => {
      this.slimLoadingBarSvc.complete();
      if (result) {
        if (params.target) {
          window.open('/' + params.url, params.target);
        } else {
          this.menus = menus;
          this.router.navigate(['/' + params.url]);
        }
      }
    });
  }

  private initSetupPageLayoutCondition() {
    this.isHomeLayout = this.homeLayoutUrl.findIndex(url => url === this.router.url) > -1 ? true : false;
    this.isFullWidthLayout = this.fullWidthUrl.findIndex(url => url === this.router.url) > -1 ? true : false;
    this.sidebarOpen = false;

    setTimeout(() => {
      if (this.isHomeLayout) {
        this.isDefaultLayout = false;
        this.isHome = true;
        this.hasSidebar = false;
        this.hasBreadcrumb = false;
        this.showBreadcrumb = false;
        this.showShortcutMenu = false;
        this.hasShortcutMenu = false;
        this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP);
        this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_MENU);
      } else if (this.isProfileLayout) {
        this.isDefaultLayout = false;
        this.isHome = false;
        this.hasSidebar = true;
        this.hasBreadcrumb = true;
        this.showBreadcrumb = true;
        this.showShortcutMenu = this.dataShortcutApps.length > 0 ? true : false;
        this.hasShortcutMenu = true;
      } else if (this.isFullWidthLayout) {
        this.isDefaultLayout = false;
        this.isHome = false;
        this.hasSidebar = false;
        this.hasBreadcrumb = true;
        this.showBreadcrumb = true;
        this.showShortcutMenu = this.dataShortcutApps.length > 0 ? true : false;
        this.hasShortcutMenu = true;
      } else {
        this.isDefaultLayout = true;
        this.isHome = false;
        this.hasSidebar = true;
        this.hasBreadcrumb = true;
        this.showBreadcrumb = true;
        this.showShortcutMenu = this.dataShortcutApps.length > 0 ? true : false;
        this.hasShortcutMenu = true;
      }
    });
  }

  private initGetNotifications() {
    this.showNotification = false;
    return this.notificationSvc.events.subscribe(notif => {
      this.dataNotifications = notif;
    });
  }

  private initGlobalErrorHandling() {
    this.errorSubcriber = this.errorSvc.events.subscribe((err: ErrorEvent) => {
      switch (err.code) {
        case 400:
          this.toastr.warning(err.message);
          break;

        case 401:
          this.slimLoadingBarSvc.complete();

          if (this.modalRef || this.router.url === '/account/login') {
            return;
          }

          this.modalRef = this.modalSvc.show(LoginDialogComponent, { ignoreBackdropClick: true, class: 'modal-login' });
          this.modalRef.content.message = (err.message) ? err.message :  'Token kadaluarsa';
          break;

        case 403:
          this.toastr.error(this.translateSvc.instant('403'));
          break;

        case 404:
          this.toastr.error(this.translateSvc.instant('404'));
          break;

        case 405:
          this.toastr.error(this.translateSvc.instant('405'));
          break;

        case 406:
          this.toastr.error(this.translateSvc.instant('406'));
          break;

        case 407:
          this.toastr.error(this.translateSvc.instant('407'));
          break;

        case 408:
          this.toastr.error(this.translateSvc.instant('408'));
          break;

        case 500:
          this.toastr.error(this.translateSvc.instant('500'));
          break;

        case 501:
          this.toastr.error(this.translateSvc.instant('501'));
          break;

        case 502:
          this.toastr.error(this.translateSvc.instant('502'));
          break;

        case 503:
          this.toastr.error(this.translateSvc.instant('503'));
          break;

        case 504:
          this.toastr.error(this.translateSvc.instant('504'));
          break;

        case 505:
          this.toastr.error(this.translateSvc.instant('505'));
          break;

        default:
          this.toastr.error(this.translateSvc.instant('000'));
          break;
      }
    });
  }

  private initPullNotifications(interval: number) {
    const params: any = {
      'limit': 5
    };

    this.notificationSvc.get(params);
    return setInterval(() => {
      this.notificationSvc.get(params);
    }, interval);
  }

  private initSetGrowlNotification() {
    this.growlSubcriber = this.coreSvc.growlEvents.subscribe(data => {

      if (data.type === NOTIFICATION_TYPE.SUCCESS) {
        if (data.timeout) {
          this.toastr.success(data.message, 'Sukses.', { timeOut: data.timeout });
        } else {
          this.toastr.success(data.message, 'Sukses.');
        }
      }

      if (data.type === NOTIFICATION_TYPE.INFO) {
        if (data.timeout) {
          this.toastr.info(data.message, 'Info.', { timeOut: data.timeout });
        } else {
          this.toastr.info(data.message, 'Info.');
        }
      }

      if (data.type === NOTIFICATION_TYPE.WARNING) {
        if (data.timeout) {
          this.toastr.warning(data.message, 'Peringatan.', { timeOut: data.timeout });
        } else {
          this.toastr.warning(data.message, 'Peringatan.');
        }
      }

      if (data.type === NOTIFICATION_TYPE.ERROR) {
        if (data.timeout) {
          this.toastr.error(data.message, 'Eror.', { timeOut: data.timeout });
        } else {
          this.toastr.error(data.message, 'Eror.');
        }
      }
    });
  }

  private initSetTitleTab() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => {
        const suffix = event['breadcrumb'] ? ' - ' + event['breadcrumb'] : '';
        this.title.setTitle('UIIGateway' + suffix);
      });
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        this.slimLoadingBarSvc.start();
        this.statusSvc.addEditMode = false;
      }

      if (event instanceof NavigationEnd) {
        this.slimLoadingBarSvc.complete();
        this.dataShortcutApps = this.getShortcutApps();

        this.initSetupPageLayoutCondition();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        this.slimLoadingBarSvc.complete();
        // Present error to user
        console.log(event.error);
      }
    });

    // Set data all you need to initiated
    this.authenticationSvc.getApplications().subscribe( apps => {
      this.applications = apps;
      setTimeout(() => {
        if (apps) {
          this.isAppsLoaded = true;
        }
      }, 1000);
    });
    this.dataShortcutApps = this.getShortcutApps();
    this.dataAccount = this.getDataAccount();

    this.initSetTitleTab();
    this.initGetNotifications();
    this.initGlobalErrorHandling();
    // this.initPullNotifications(10000);
    this.initSetGrowlNotification();
    this.initSetupPageLayoutCondition();
  }

  ngOnDestroy(): void {
    this.growlSubcriber.unsubscribe();
    this.errorSubcriber.unsubscribe();
  }

  onApplicationClick(application) {
    if (this.authenticationSvc.isAuthenticated()) {
      if (this.statusSvc.addEditMode) {
        const modal = this.modalSvc.show(ConfirmdialogComponent, { class: MODAL.ALERT.WARNING });
        (<ConfirmdialogComponent>modal.content).showConfirmationModal({
          title: this.translateSvc.instant('changeapp confirm title'),
          message: this.translateSvc.instant('changeapp confirm message')
        });

        (<ConfirmdialogComponent>modal.content).onClose.subscribe(result => {
          if (result === true) {
            // when pressed Yes
            console.log('Confirm');

            this.doChangeApplication(application);

            return this;
          } else {
            // When closing the modal without no or yes
            console.log('Not Confirm');

          }
        });
      } else {
        this.doChangeApplication(application);
      }
    } else {
      this.errorSvc.putError(401, 'Token expired');
    }
  }

  onBtnToggleClick() {
    this.sidebarOpen = true;
  }

  onBtnSidebarCloseClick() {
    this.sidebarOpen = false;
  }

  onMenuClick(menu) {
    if (this.authenticationSvc.isAuthenticated()) {
      if (menu.parent) {
        delete menu.parent;
      }
      this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_MENU);
      this.storageSvc.setLocalStorage(STORAGE_KEY.CURRENT_OPENED_MENU, menu);
      this.router.navigate([menu.url]);
    } else {
      this.errorSvc.putError(401, 'Token expired');
    }
  }

  onSidebarOverlayClick() {
    this.sidebarOpen = false;
  }

}
