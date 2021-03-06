
import * as AppIndex from './index'

jest.mock('./lib/report/node', () => ({}))
jest.mock('./lib/add-requests', () => ({
  checkForAddRequests: jest.fn()
}))
jest.mock('./setup-tray-icon', () => ({}))
jest.mock('./singleInstance', () => ({}))
jest.mock('./stats', () => ({}))
jest.mock('electron', () => ({
  app: {
    on: jest.fn(),
    getPath: jest.fn().mockReturnValue('~')
  },
  dialog: {
    showMessageDialog: jest.fn()
  },
  ipcMain: {
    on: jest.fn()
  }
}))

describe('index.js', () => {
  describe('clear-activities', () => {
    it('should only clear finished activities', () => {
      // arrange
      const activitiesById = [1, 2, 3]
      const activities = {
        '1': {
          uuid: 1,
          finished: false,
          foo: 'b'
        },
        '2': {
          uuid: 2,
          finished: true,
          foo: 'a'
        },
        '3': {
          uuid: 3,
          finished: true,
          foo: 'r'
        }
      }
      // act
      const result = AppIndex.filterUnfinishedActivities(activitiesById, activities)
      // assert
      expect(result.activitiesById).toEqual([1])
      expect(result.activities).toEqual({
        '1': {
          uuid: 1,
          finished: false,
          foo: 'b'
        }
      })
    })
    it('should clear interrupted activities', () => {
      // arrange
      const activitiesById = [1, 2, 3]
      const activities = {
        // Going on activity:
        '1': {
          uuid: 1,
          finished: false,
          interrupted: false,
          foo: 'b'
        },
        // Finished activity
        '2': {
          uuid: 2,
          finished: true,
          interrupted: false,
          foo: 'a'
        },
        // Interrupted activity
        '3': {
          uuid: 3,
          finished: false,
          interrupted: true,
          foo: 'r'
        }
      }
      // act
      const result = AppIndex.filterUnfinishedActivities(activitiesById, activities)
      // assert
      expect(result.activitiesById).toEqual([1])
      expect(result.activities).toEqual({
        '1': {
          uuid: 1,
          finished: false,
          interrupted: false,
          foo: 'b'
        }
      })
    })
  })
})
