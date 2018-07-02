import { observable } from 'mobx'
import { remote } from 'electron'

import { getObjectStat, getPeersWithObjectbyHash } from '../../../api'

/**
 * StatStorage will contain the status and few information about the Object.
 * It has the following values:
 *  - hash: the hash of the object/file to obtain
 *  - peersAmount: the amount of peers that have this hash
 *  - stats: information about this Object/File
 *  - isValid: boolean to check if it was validated (Stats ready)
 *  - isLoading: boolean to check if it is loading
 *  - wasLoadingStats: boolean to check if stats started in past
 *
 * This is used by the API and React
 */
export class StatStorage {
  @observable hash = ''
  @observable peersAmount = 0
  @observable stats = {}

  @observable isValid = false
  @observable isLoading = false
  @observable wasLoading = false
  @observable importing = false

  reset () {
    this.hash = ''
    this.peersAmount = 0
    this.stats = {}

    this.isValid = false
    this.isLoading = false
    this.wasLoading = false
    this.importing = false
    this.wasLoadingStats = false
  }

  check () {
    this.isLoading = true
    this.wasLoadingStats = true

    return Promise.all([
      getPeersWithObjectbyHash(this.hash),
      getObjectStat(this.hash)
    ])
      .then(values => {
        this.peersAmount = values[0].length
        this.stats = values[1]
        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        remote.dialog.showErrorBox('Gurl, an error occurred', `${err}`)
      })
  }
}

export default new StatStorage()
