import { Injectable } from '@angular/core';
import { Ticket } from '@tickets11131/ticket-tracker-common';
import { BehaviorSubject, combineLatest, combineLatestWith, tap } from 'rxjs';
import { SortByEnum, SortDirectionEnum } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TicketSortService {
  private sortBySubject = new BehaviorSubject<SortByEnum>(SortByEnum.TITLE);
  private sortDirectionSubject = new BehaviorSubject<SortDirectionEnum>(
    SortDirectionEnum.ASCENDING
  );

  sortBy$ = this.sortBySubject.asObservable();
  sortDirection$ = this.sortDirectionSubject.asObservable();

  ticketSort$ = combineLatest([this.sortDirection$, this.sortBy$]);

  constructor() {}

  sortTickets(
    tickets: Ticket[],
    sortParameters: [SortDirectionEnum, SortByEnum]
  ) {
    const [sortDirection, sortBy] = sortParameters;

    return tickets.sort(compareFunctions[sortBy][sortDirection]);
  }

  updateSortBySubject(sortBy: SortByEnum) {
    this.sortBySubject.next(sortBy);
  }

  updateSortDirectionSubject(direction: SortDirectionEnum) {
    this.sortDirectionSubject.next(direction);
  }
}

const compareFunctions: {
  [index: string]: {
    [index: string]: any;
  };
} = {
  [SortByEnum.TITLE]: {
    [SortDirectionEnum.ASCENDING]: (a: Ticket, b: Ticket) => {
      return a.title.localeCompare(b.title);
    },
    [SortDirectionEnum.DESCENDING]: (a: Ticket, b: Ticket) => {
      return b.title.localeCompare(a.title);
    },
  },
  [SortByEnum.CREATED]: {
    [SortDirectionEnum.ASCENDING]: (a: Ticket, b: Ticket) => {
      return a.creationDate.getTime() - b.creationDate.getTime();
    },
    [SortDirectionEnum.DESCENDING]: (a: Ticket, b: Ticket) => {
      return b.creationDate.getTime() - a.creationDate.getTime();
    },
  },
};
