import { Controller, Get, Param, Render } from '@nestjs/common';
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

}
