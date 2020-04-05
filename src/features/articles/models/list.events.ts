import { createEvent } from 'effector'

export const getItems = createEvent()
export const updateQuery = createEvent<string>()
export const toggleSort = createEvent()
