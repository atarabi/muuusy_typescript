import * as $ from 'jquery';
import setMock from '../../_api/mock';
setMock();

const ajaxConf = (url: string, term: string): any => {
  let conf = {
    type: 'get',
    url: url,
    data: {},
    dataType: 'json',
    jsonpCallback: ''
  };
  if (url === 'https://itunes.apple.com/search') {
    conf.data = {
      term: term,
      country: 'US',
      lang: 'en_us',
      media: 'music',
      entity: 'album',
      limit: 100
    };
    conf.dataType = 'jsonp';
    conf.jsonpCallback = 'callback';
  }
  return conf;
};

const checkFav = (albums: any, compareAlbums: any): any => {
  albums = (albums.results) ? albums.results : albums;
  albums.forEach((album) => {
    album.isFav = false;
    compareAlbums.forEach((compareAlbum) => {
      if (album && album.collectionId.toString() === compareAlbum.collectionId.toString()) { album.isFav = true; }
    });
  });
  return albums;
};

const parseData = (albums: any): any => {
  if (albums[0].artworkUrl100) {
    albums.forEach((album) => {
      album.artworkUrl400 = album.artworkUrl100.replace('100x100bb', '400x400bb');
    });
  }
  return albums;
};

const getData = (url: string, term: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const getFavs = (albums: any): void => {
      $.ajax(ajaxConf('/api/favs', '')).then((res) => {
        const newAlbums: any = parseData(checkFav(albums, res));
        resolve(newAlbums);
      }, (err) => {
        console.error(err);
        reject(false);
      });
    };
    $.ajax(ajaxConf(url, term)).then((res) => {
      getFavs(res);
    }, (err) => {
      console.error(err);
      reject(false);
    });
  });
};

export default getData;
