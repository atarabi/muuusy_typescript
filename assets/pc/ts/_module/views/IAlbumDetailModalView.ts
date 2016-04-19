import IAlbum = require('../models/IAlbum');

import IBaseView = require('../views/IBaseView');

interface IAlbumDetailModalView extends IBaseView<IAlbum> {};

export = IAlbumDetailModalView;
