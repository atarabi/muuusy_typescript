import AlbumType = require('../interfaces/AlbumType');

import BaseModel = require('./BaseModel');

class AlbumModel extends BaseModel<AlbumType> {
  constructor(args?: AlbumType) {
    super(args);
    if (!args) {
      this._attributes = {
        artistId: '',
        artistName: '',
        artworkUrl400: '',
        collectionId: '',
        collectionName: '',
        collectionViewUrl: '',
        primaryGenreName: '',
        releaseDate: ''
      };
    }
  }
  set set(args: AlbumType) {
    this._attributes.artistId = args.artistId || this._attributes.artistId;
    this._attributes.artistName = args.artistName || this._attributes.artistName;
    this._attributes.artworkUrl400 = args.artworkUrl400 || this._attributes.artworkUrl400;
    this._attributes.collectionId = args.collectionId || this._attributes.collectionId;
    this._attributes.collectionName = args.collectionName || this._attributes.collectionName;
    this._attributes.collectionViewUrl = args.collectionViewUrl || this._attributes.collectionViewUrl;
    this._attributes.primaryGenreName = args.primaryGenreName || this._attributes.primaryGenreName;
    this._attributes.releaseDate = args.releaseDate || this._attributes.releaseDate;
  }
};
export = AlbumModel;
