import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { TicketSortService } from 'src/app/core/ticket-sort.service';
import { SortByEnum, SortDirectionEnum } from 'src/app/shared/types';

enum SortDirectionDisplayEnum {
  ASCENDING = 'arrow_upward',
  DESCENDING = 'arrow_downward',
}

@Component({
  selector: 'app-ticket-sort',
  templateUrl: './ticket-sort.component.html',
  styleUrls: ['./ticket-sort.component.scss'],
})
export class TicketSortComponent implements OnInit {
  SortDirectionEnum = SortDirectionEnum;
  SortDirectionDisplayEnum = SortDirectionDisplayEnum;
  SortByEnum = SortByEnum;
  directionDisplay!: SortDirectionDisplayEnum;

  sortBy$ = this.ticketSortService.sortBy$;
  sortDirection$ = this.ticketSortService.sortDirection$.pipe(
    tap((direction: SortDirectionEnum) => {
      switch (direction) {
        case this.SortDirectionEnum.ASCENDING:
          this.directionDisplay = this.SortDirectionDisplayEnum.DESCENDING;
          break;
        case this.SortDirectionEnum.DESCENDING:
          this.directionDisplay = this.SortDirectionDisplayEnum.ASCENDING;
          break;
      }
    })
  );

  constructor(private ticketSortService: TicketSortService) {}

  ngOnInit(): void {}

  onSelectSortBy(sortBy: SortByEnum) {
    this.ticketSortService.updateSortBySubject(sortBy);
  }

  onToggleDirection(direction: SortDirectionEnum) {
    switch (direction) {
      case this.SortDirectionEnum.ASCENDING:
        this.ticketSortService.updateSortDirectionSubject(
          this.SortDirectionEnum.DESCENDING
        );
        break;
      case this.SortDirectionEnum.DESCENDING:
        this.ticketSortService.updateSortDirectionSubject(
          this.SortDirectionEnum.ASCENDING
        );
        break;
    }
  }
}
