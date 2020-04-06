import { combine } from 'effector'

import { $list } from '../../models'

// the combined store for the page
export const $store = combine({ list: $list })
