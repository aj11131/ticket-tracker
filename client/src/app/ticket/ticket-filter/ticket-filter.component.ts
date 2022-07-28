import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TicketFilterService } from 'src/app/core/ticket-filter.service';
import {
  TicketPriorityEnum,
  TicketStatusEnum,
} from '@tickets11131/ticket-tracker-common';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
})
export class TicketFilterComponent implements OnInit {
  TicketStatusEnum = TicketStatusEnum;
  TicketPriorityEnum = TicketPriorityEnum;

  ticketFilterForm = this.fb.group({
    text: [null],
    priority: [null],
    assigned: [null],
    status: [null],
    tags: [null],
    createdAfter: [null],
    createdBefore: [null],
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

  onClear() {
    this.ticketFilterForm.reset();
  }
}
