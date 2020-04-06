import { createEvent } from 'effector'

// load more data for list
export const getItems = createEvent()
// update search query string
export const updateQuery = createEvent<string>()
// toggle sorting
export const toggleSort = createEvent()
