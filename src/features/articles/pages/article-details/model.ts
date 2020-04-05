import { combine } from 'effector'

import { $list } from '../../models'

export const $store = combine({ list: $list })
