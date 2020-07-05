import {TestBed, async} from '@angular/core/testing';
import {ChipComponent} from './chip.component';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ChipComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipComponent, TestHostComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ChipComponent);
    const chipComponent = fixture.componentInstance;
    expect(chipComponent).toBeTruthy();
  });

  it('should have value undefined', () => {
    const fixture = TestBed.createComponent(ChipComponent);
    const app = fixture.componentInstance;
    expect(app.value).not.toBeDefined();
  });

  it('should present the input value inside the spans', () => {
    const fixture = TestBed.createComponent(TestHostComponent);

    fixture.detectChanges();

    const de: DebugElement = fixture.debugElement.query(By.css('.chip'));

    expect(de.nativeElement.textContent).toContain('JUST A TEST');
  });
});

@Component({
  selector: 'app-test',
  template: ` <app-chip [value]="_testValue"></app-chip> `,
})
export class TestHostComponent {
  _testValue = 'JUST A TEST';
}
