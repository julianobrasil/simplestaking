import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, DebugElement} from '@angular/core';

import {StatsTableContainerComponent} from './stats-table-container.component';
import {StatsTableContainerComponentFacade} from './stats-table-container-component.facade';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';

describe('StatsTableContainerComponent', () => {
  const componentServiceStub: Partial<StatsTableContainerComponentFacade> = {
    getDataLoading$: () => of(false),
    getExchangeRateByCurrency$: (dummy: string) => of(2),
    getFilteredUser$: () => of('TEST USER'),
    getMostRecentCycle$: () => of(500),
    getTransactions$: () => of([]),
    updateSearchFilter: jasmine.createSpy('updateSearchFilter'),
  };

  let fixture: ComponentFixture<StatsTableContainerComponent>;
  let componentInstance: StatsTableContainerComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StatsTableContainerComponent],
      providers: [
        {
          provide: StatsTableContainerComponentFacade,
          useValue: componentServiceStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTableContainerComponent);
    componentInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const statsTableComponent = fixture.componentInstance;
    expect(statsTableComponent).toBeTruthy();
  });

  it('should full-fill the input with a value from the service', () => {
    const deInput: DebugElement = fixture.debugElement.query(By.css('input'));

    expect(deInput).toBeDefined('There should be an input');

    fixture.detectChanges();

    expect(deInput.nativeElement.value).toContain('TEST USER');
  });

  it('should call the method to update the filter upon a change on the input', fakeAsync(() => {
    const deInput: DebugElement = debugElement.query(By.css('input'));
    const service = TestBed.inject(StatsTableContainerComponentFacade);

    componentInstance._inputNameCtrl.setValue('USER UNDER TEST');

    fixture.detectChanges();

    tick(500);

    expect(service.updateSearchFilter).toHaveBeenCalled();

    fixture.detectChanges();

    expect(deInput.nativeElement.value).toContain('USER UNDER TEST');
  }));
});
