import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotesArray } from './public/quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }


  @Get('quotes')
  @Render('quotes')
  getQuotes() {
    return {
      quotes: quotesArray
    };
  }

  @Get('randomQuote')
  @Render('randomQuote')
  getRandomQuote() {
    let random = Math.floor(Math.random() * quotesArray.quotes.length);
    return {
      randomquote : quotesArray.quotes[random]
    }
  }

  @Get('topauthors')
  @Render('topAuthors')
  getTopAuthors() {
    let map = new Map<string, number>()
    quotesArray.quotes.forEach(element => {
      if (map.has(element.author)) {
        map.set(element.author, (map.get(element.author))+1);
      } else {
        map.set(element.author, 1);
      }
    });
    return {
      map 
    }
  }

  @Get('quotes/:id')
  @Render('sinlgeQuote')
  oneQuote(@Param('id') id: string) {
    return {
      quote: quotesArray.quotes[id]
    }
  }

  @Get('deleteQuote/:id')
  deleteQuote(@Param('id') id: string) {
    if (!quotesArray.quotes[id]) {
      return { message: 'nem sikerült'}
    }
    delete quotesArray.quotes[id]
    return {
      message: 'sikerült'
    };
  }

@Get('search')
@Render('idezetKereses')
getQuoteBySearch(@Query('reszlet') reszlet : string) {
  let searchedQuotes :string[]  = []
  quotesArray.quotes.forEach(element => {
    if (element.quote.includes(reszlet)) {
      searchedQuotes.push(element.quote)
    }
  });
  return {
    searchedQuotes
  }
}

@Get('authorRandomForm')
@Render('authorRandomForm')
getAuthor() {

}

@Get('randomAuthor')
@Render('randomAuthor')
getRandomAuthor(@Query('randomSzerzo') randomAuthor : string) {
  let authorQuotes : string[]=[]
  quotesArray.quotes.forEach(element => {
      if(element.author == randomAuthor) {
        authorQuotes.push(element.quote)
      }
  });

  let random = Math.floor(Math.random() * authorQuotes.length);
    return {
      randomquote : authorQuotes[random]
    }
}


@Get('highlight/:id')
@Render('highlightDetail')
getQuoteWithHighlight(@Param('id') id : string, @Query('szovegreszlet') szovegreszlet : string) {

  let quote = quotesArray.quotes[id].quote
  let quotewithhighlight = quote.replace(szovegreszlet, "<b>" + szovegreszlet + "</b>")
  return { quotewithhighlight}
}
}
