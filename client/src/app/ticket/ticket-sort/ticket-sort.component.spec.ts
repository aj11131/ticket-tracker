import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSortComponent } from './ticket-sort.component';

describe('TicketSortComponent', () => {
  let component: TicketSortComponent;
  let fixture: ComponentFixture<TicketSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
