import * as daemon from './daemon'
import Settings from 'electron-settings'

jest.mock('electron-settings', () => {
  const getSyncMock = jest.fn()
    .mockReturnValueOnce(null)
    .mockReturnValueOnce('/custom/path/to/ipfs')

  return {
    getSync: getSyncMock
  }
})
jest.mock('app-root-dir', () => {
  const getAppRootMock = jest.fn().mockReturnValue('root-dir')

  return {
    get: getAppRootMock
  }
})

describe('daemon.js', () => {
  describe('getPathIPFSBinary', () => {
    it('should return the default value when the setting is not defined', () => {
      // arrange
      // act
      const path = daemon.getPathIPFSBinary()
      // assert
      expect(Settings.getSync).toHaveBeenCalledWith('daemon.pathIPFSBinary')
      expect(path).toBe('root-dir/go-ipfs/ipfs')
    })

    it('should return the setting when it is defined', () => {
      // act
      const path = daemon.getPathIPFSBinary()
      // assert
      expect(Settings.getSync).toHaveBeenCalledWith('daemon.pathIPFSBinary')
      expect(path).toBe('/custom/path/to/ipfs')
    })
  })

  describe('getSiderusPeers', () => {
    it('should download list of peers, not empty', () => {
      const prom = daemon.getSiderusPeers()

      expect(prom).resolves.not.toContain('')// removes empty lines
    })
  })
})