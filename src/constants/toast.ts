import _ from 'lodash'
type SaveText = 'Accepted' | 'Added' | 'Closed' | 'Cancelled' | 'Deleted' | 'Rejected' | 'Saved' | 'Submitted'
export default {
  save: (entityType: string, type: SaveText) => `You have successfully ${_.toLower(type)} ${entityType}`,
  error: () => 'An unexpected error occurred. Please try again later.',
  loaded: (thing: string) => `${thing} has been successfully loaded`,
}

