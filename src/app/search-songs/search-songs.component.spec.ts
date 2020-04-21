import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongsComponent } from './search-songs.component';

describe('SearchSongsComponent', () => {
  let component: SearchSongsComponent;
  let fixture: ComponentFixture<SearchSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
