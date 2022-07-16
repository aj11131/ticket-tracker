import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TicketFilterService } from 'src/app/core/ticket-filter.service';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
})
export class TicketFilterComponent implements OnInit {
  ticketFilterForm = this.fb.group({
    text: [''],
    priority: [null],
    assigned: [null],
    status: [null],
    tags: [null],
  });

  constructor(
    private fb: FormBuilder,
    private ticketFilterService: TicketFilterService
  ) {}

  ngOnInit(): void {
    this.ticketFilterForm.valueChanges.subscribe((value) => {
      this.ticketFilterService.updateTicketFilter(value);
    });
  }
}
