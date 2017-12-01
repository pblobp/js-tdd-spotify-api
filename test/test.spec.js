import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search,
  searchAlbum,
  searchArtist,
  searchPlaylist,
  searchTrack
} from '../src/main';

// uses
chai.use(sinonChai);
sinonStubPromise(sinon);

// require to global.fetch
global.fetch = require('node-fetch');

describe('Spotify Lib', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    // search (generic)
    // searchAlbuns
    // searchTracks
    // seachPlaylists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbum method', () => {
      expect(searchAlbum).to.exist;
    });

    it('should exist the searchArtist method', () => {
      expect(searchArtist).to.exist;
    });

    it('should exist the searchTrack method', () => {
      expect(searchTrack).to.exist;
    });

    it('should exist the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist;
    });
  });

  describe('generic search', () => {
    it('should call fetch wish the correct URL', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );
      });

      context('passing more than one', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );

        search('Incubus', ['album', 'artist']);
        expect(fetchedStub).to.have.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album,artist'
        );
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      expect(search('Incubus', 'artist').resolveValue).to.be.eql({
        body: 'json'
      });
    });
  });

  describe('album search', () => {
    it('should call fetch function', () => {
      searchAlbum('Incubus');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('shoul call fetch with the correct url', () => {
      searchAlbum('Incubus');
      expect(fetchedStub).to.have.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      );
    });
  });

  describe('artist search', () => {
    it('should call fetch function', () => {
      searchArtist('Incubus');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('shoul call fetch with the correct url', () => {
      searchArtist('Incubus');
      expect(fetchedStub).to.have.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      );
    });
  });

  describe('track search', () => {
    it('should call fetch function', () => {
      searchTrack('Incubus');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('shoul call fetch with the correct url', () => {
      searchTrack('Incubus');
      expect(fetchedStub).to.have.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      );
    });
  });

  describe('playlist search', () => {
    it('should call fetch function', () => {
      searchPlaylist('Incubus');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('shoul call fetch with the correct url', () => {
      searchPlaylist('Incubus');
      expect(fetchedStub).to.have.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      );

      searchPlaylist('Metalica');
      expect(fetchedStub).to.have.calledWith(
        'https://api.spotify.com/v1/search?q=Metalica&type=playlist'
      );
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      expect(searchPlaylist('Incubus').resolveValue).to.be.eql({
        body: 'json'
      });
    });
  });
});
