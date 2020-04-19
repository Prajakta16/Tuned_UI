import { Component, OnInit } from '@angular/core';
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
declare var $;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  categories = [
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1",
          id : 1,
          music : "test"
        },
        {
          name : "Song1",
          artist : "Artist1",
          id : 2,
          music : "test"
        },
        {
          name : "Song1",
          artist : "Artist1",
          id : 3,
          music : "test"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1"
        },
        {
          name : "Song1",
          artist : "Artist1",
          id : 1
        }
      ]
    },
    {
      name : "Category 1",
      image : "image1",
      songs : [
        {
          name : "Song1",
          artist : "Artist1",
          id : 1
        },
        {
          name : "Song1",
          artist : "Artist1",
          id : 1
        },
        {
          name : "Song1",
          artist : "Artist1",
          id : 1
        }
      ]
    }
  ]
  constructor() { 
    $('collapse').collapse({
      toggle: false
    })

  }

  ngOnInit(): void {

    for(let i = 0; i < this.categories.length; i++){
      this.categories[i]["arrow"] = "Open"; 
    }
  }

  openDetails(category){
    if(category.arrow === "Open"){
      category.arrow = "Close"
    }else{
      category.arrow = "Open"
    }
  }

}
